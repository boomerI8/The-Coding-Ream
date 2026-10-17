export type QuestFormat = 
  | 'write_code' 
  | 'fix_bug' 
  | 'fill_blank' 
  | 'predict_output' 
  | 'speed_round';

export type CodingLanguage = 'html' | 'css' | 'javascript' | 'typescript' | 'python' | 'sql';

export interface TestCase {
  id: string;
  description: string;
  validator: string; // JavaScript expression or regex evaluated against code / DOM
  isOptional?: boolean;
}

export interface HintLevel {
  level: 1 | 2 | 3;
  title: string;
  content: string;
  xpCost: number;
}

export interface FillBlankItem {
  id: string;
  label: string;
  options: string[];
  correctAnswer: string;
}

export interface PredictOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Quest {
  id: string;
  regionId: string;
  order: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  xpReward: number;
  format: QuestFormat;
  language: CodingLanguage;
  storyBlocks: string[]; // Strict anti-boredom: max 3 short text blocks
  mascotQuip: string;
  taskPrompt: string;
  starterCode: string;
  solutionCode: string;
  hints: HintLevel[];
  testCases: TestCase[];
  fillBlanks?: FillBlankItem[];
  predictOptions?: PredictOption[];
  tags: string[];
}

export interface BossPhase {
  id: string;
  phaseNumber: number;
  title: string;
  instruction: string;
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
}

export interface BossFight {
  id: string;
  regionId: string;
  bossName: string;
  title: string;
  subtitle: string;
  lore: string;
  avatarIcon: string;
  color: string;
  totalHp: number;
  timeLimitSeconds: number;
  xpReward: number;
  rewardBadge: {
    id: string;
    name: string;
    icon: string;
    description: string;
  };
  portfolioProject: {
    title: string;
    description: string;
    fileName: string;
  };
  phases: BossPhase[];
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  biome: string;
  icon: string;
  accentColor: string;
  bgGradient: string;
  levelPrereq: number;
  prereqRegionId?: string;
  estimatedHours: string;
  quests: Quest[];
  boss: BossFight;
}

export type HeroRank = 'Newbie' | 'Apprentice' | 'Dev' | 'Architect' | 'Legend';

export interface InventoryItem {
  id: string;
  name: string;
  type: 'potion' | 'badge' | 'gear';
  icon: string;
  description: string;
  count: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description?: string;
  regionName: string;
  date: string;
  code: string;
  language: string;
}

export interface HeroState {
  name: string;
  level: number;
  xp: number;
  rank: HeroRank;
  streak: number;
  lastActiveDate: string;
  hearts: number;
  maxHearts: number;
  completedQuests: string[];
  completedBosses: string[];
  unlockedRegions: string[];
  usedHints: Record<string, number>; // questId -> highest hint level used
  inventory: InventoryItem[];
  portfolio: PortfolioItem[];
  soundEnabled: boolean;
  selectedTrack: 'fullstack' | 'frontend' | 'backend';
}
