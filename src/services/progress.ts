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
  // Защита от уровня > 30
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
      // Уровень сбрасываем только если он выше 10
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