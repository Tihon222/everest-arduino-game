// src/data/players.ts
export interface FakePlayer {
  id: number;
  name: string;
  avatar: string;
  level: number;
  score: number;
}

const NAMES = [
  'LUX', 'CHARLIE', 'RAQUEL', 'ZOE', 'SAMIR',
  'CONSTANCE', 'OSCAR', 'LOLO', 'MARIE', 'LUCIE',
  'PIERRICK', 'BLAISE', 'MARTIN', 'RUDY', 'MAXIME',
];

const AVATARS = ['🕵️', '🧙', '👨‍💻', '👩‍💻', '🦊', '🐺', '🦉', '🐧', '🐸', '🐙', '🦁', '🐯', '🐻', '🐼', '🐨'];

export function generateFakePlayers(count: number, maxLevel: number): FakePlayer[] {
  return Array.from({ length: count }, (_, i) => {
    const idx = i % NAMES.length;
    return {
      id: i,
      name: NAMES[idx],
      avatar: AVATARS[idx],
      level: Math.floor(Math.random() * maxLevel) + 1,
      score: Math.floor(Math.random() * 9000) + 1000,
    };
  });
}