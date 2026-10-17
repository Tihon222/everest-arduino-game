// src/services/progress.ts
import { supabase } from '../supabase';

export interface UserProgress {
  id: string;
  email: string;
  level: number;
  total_score: number;
  attempts: Record<number, number>;
  updated_at: string;
}

// Получить прогресс текущего пользователя
export const getProgress = async (uid: string): Promise<UserProgress | null> => {
  const { data, error } = await supabase.from('users').select('*').eq('id', uid).single();
  if (error) {
    if (error.code === 'PGRST116') return null; // нет записи
    console.error('getProgress error:', error);
    return null;
  }
  return data as UserProgress;
};

// Сохранить / обновить прогресс
export const saveProgress = async (uid: string, data: Partial<UserProgress>) => {
  const { error } = await supabase
    .from('users')
    .upsert({
      id: uid,
      ...data,
      updated_at: new Date().toISOString(),
    });
  if (error) console.error('saveProgress error:', error);
};

// Прибавить баллы
export const addScore = async (uid: string, points: number) => {
  const existing = await getProgress(uid);
  const newScore = (existing?.total_score || 0) + points;
  await saveProgress(uid, { total_score: newScore });
};

// Получить топ игроков
export const getLeaderboard = async (): Promise<UserProgress[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('total_score', { ascending: false })
    .limit(15);
  if (error) {
    console.error('getLeaderboard error:', error);
    return [];
  }
  return data as UserProgress[];
};