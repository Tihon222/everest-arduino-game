// src/services/progress.ts
import { supabase } from '../supabase';

export interface UserProgress {
  id: string;
  email: string;
  nickname?: string;
  avatar?: string;
  level: number;
  total_score: number;
  attempts: Record<number, number>;
  achievements?: string[];
  rest_until?: string | null;
  is_falling?: boolean;
}

const MAX_LEVEL = 30;

export const getProgress = async (uid: string): Promise<UserProgress | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', uid)
    .single();
  if (error) return null;
  return data as UserProgress;
};

export const saveProgress = async (uid: string, data: Partial<UserProgress>) => {
  if (typeof data.level === 'number') {
    data.level = Math.min(data.level, MAX_LEVEL);
  }

  const { error } = await supabase
    .from('users')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', uid);
  if (error) console.error('saveProgress error:', error);
};

export const addScore = async (uid: string, points: number) => {
  const { data } = await supabase
    .from('users')
    .select('total_score')
    .eq('id', uid)
    .single();
  const current = data?.total_score || 0;
  await supabase
    .from('users')
    .update({ total_score: current + points, updated_at: new Date().toISOString() })
    .eq('id', uid);
};

export const getLeaderboard = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('total_score', { ascending: false })
    .limit(15);
  if (error) return [];
  return data || [];
};

export const startRest = async (uid: string, seconds: number = 10) => {
  const restUntil = new Date(Date.now() + seconds * 1000).toISOString();
  await supabase
    .from('users')
    .update({
      rest_until: restUntil,
      is_falling: true,
      level: 10,
      updated_at: new Date().toISOString(),
    })
    .eq('id', uid);
};

export const endRest = async (uid: string) => {
  await supabase
    .from('users')
    .update({
      rest_until: null,
      is_falling: false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', uid);
};

// Экспорт прогресса в JSON
export const exportProgress = async (uid: string) => {
  const progress = await getProgress(uid);
  if (!progress) return null;

  const data = {
    exportedAt: new Date().toISOString(),
    version: '1.0',
    progress: {
      level: progress.level,
      total_score: progress.total_score,
      attempts: progress.attempts,
      nickname: progress.nickname,
      avatar: progress.avatar,
      achievements: progress.achievements || [],
    },
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `arduino-games-progress-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return data;
};

// ─────────── Достижения ───────────
export const ACHIEVEMENTS = {
  first_step: { icon: '🚀', title: 'Первый шаг', desc: 'Пройди 1-й уровень' },
  speedster: { icon: '⚡', title: 'Скоростной', desc: 'Пройди уровень с первой попытки' },
  sniper: { icon: '🎯', title: 'Точный', desc: 'Пройди 5 уровней подряд без ошибок' },
  master: { icon: '🏆', title: 'Мастер', desc: 'Пройди 30-й уровень' },
  resilient: { icon: '🔥', title: 'Несгибаемый', desc: 'Пройди уровень после падения' },
};

export const unlockAchievement = async (uid: string, achievementKey: string) => {
  const progress = await getProgress(uid);
  if (!progress) return;

  const current = progress.achievements || [];
  if (current.includes(achievementKey)) return;

  const updated = [...current, achievementKey];
  await saveProgress(uid, { achievements: updated });
};

export const getUserAchievements = async (uid: string) => {
  const progress = await getProgress(uid);
  return progress?.achievements || [];
};