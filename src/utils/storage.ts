import { HeroState, HeroRank } from '../types';

const STORAGE_KEY = 'codequest_hero_profile_v1';

export function calculateLevel(xp: number): { level: number; rank: HeroRank; xpInCurrentLevel: number; xpForNextLevel: number; progressPercent: number } {
  // Each level takes level * 100 XP
  let currentLevel = 1;
  let remainingXp = xp;
  let costForNext = 150;

  while (remainingXp >= costForNext) {
    remainingXp -= costForNext;
    currentLevel += 1;
    costForNext = currentLevel * 150;
  }

  let rank: HeroRank = 'Newbie';
  if (xp >= 3500) rank = 'Legend';
  else if (xp >= 1500) rank = 'Architect';
  else if (xp >= 600) rank = 'Dev';
  else if (xp >= 200) rank = 'Apprentice';

  const progressPercent = Math.min(100, Math.round((remainingXp / costForNext) * 100));

  return {
    level: currentLevel,
    rank,
    xpInCurrentLevel: remainingXp,
    xpForNextLevel: costForNext,
    progressPercent,
  };
}

export const INITIAL_HERO_STATE: HeroState = {
  name: 'Code Novice',
  level: 1,
  xp: 50, // Starter bonus so learner sees progress bar active
  rank: 'Newbie',
  streak: 3, // Motivational starting streak
  lastActiveDate: new Date().toISOString().split('T')[0],
  hearts: 3,
  maxHearts: 3,
  completedQuests: [],
  completedBosses: [],
  unlockedRegions: ['html-village'],
  usedHints: {},
  inventory: [
    {
      id: 'potion-review-1',
      name: 'Memory Elixir',
      type: 'potion',
      icon: '🧪',
      description: 'Resurfaces 3 previous coding concepts in a speed challenge to earn +50 bonus XP.',
      count: 2,
    },
    {
      id: 'badge-starter',
      name: 'Wayfarer Sigil',
      type: 'badge',
      icon: '🛡️',
      description: 'Given to every adventurer who dares to venture into the world of code.',
      count: 1,
    },
    {
      id: 'gear-quill',
      name: 'Syntax Blade',
      type: 'gear',
      icon: '🗡️',
      description: 'A glowing blade etched with semantic HTML runes and clean CSS brackets.',
      count: 1,
    },
  ],
  portfolio: [],
  soundEnabled: true,
  selectedTrack: 'fullstack',
};

export function loadHeroState(): HeroState {
  if (typeof window === 'undefined') return INITIAL_HERO_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_HERO_STATE;
    const parsed = JSON.parse(raw);
    
    // Ensure all required fields exist
    return {
      ...INITIAL_HERO_STATE,
      ...parsed,
      inventory: parsed.inventory || INITIAL_HERO_STATE.inventory,
      portfolio: parsed.portfolio || [],
      unlockedRegions: parsed.unlockedRegions || ['html-village'],
    };
  } catch {
    return INITIAL_HERO_STATE;
  }
}

export function saveHeroState(state: HeroState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save CodeQuest state to localStorage', err);
  }
}
