// src/services/progress.ts
import { doc, setDoc, getDoc, updateDoc, increment, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export interface UserProgress {
  level: number;         // текущий уровень
  totalScore: number;    // общий балл
  attempts: Record<number, number>; // попытки на каждом уровне: { 1: 2, 5: 1 }
  completedAt: Record<number, number>; // время на fix-уровнях (сек)
  updatedAt?: number;
}

// Получить прогресс текущего пользователя
export const getProgress = async (uid: string): Promise<UserProgress | null> => {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProgress;
};

// Сохранить/обновить прогресс
export const saveProgress = async (uid: string, data: Partial<UserProgress>) => {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    await updateDoc(userRef, { ...data, updatedAt: Date.now() });
  } else {
    await setDoc(userRef, {
      level: 1,
      totalScore: 0,
      attempts: {},
      completedAt: {},
      updatedAt: Date.now(),
      ...data,
    });
  }
};

// Начислить баллы за уровень
export const addScore = async (uid: string, points: number) => {
  await updateDoc(doc(db, 'users', uid), {
    totalScore: increment(points),
    updatedAt: Date.now(),
  });
};

// Получить топ-15 игроков (для рейтинга)
export const getLeaderboard = async () => {
  const q = query(
    collection(db, 'users'),
    orderBy('totalScore', 'desc'),
    limit(15)
  );
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};