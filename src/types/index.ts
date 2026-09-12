export type AttributeType = 'CRAFT' | 'FOCUS' | 'VIGOR' | 'WILL';

export interface Attributes {
  craft: number;
  focus: number;
  vigor: number;
  will: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  xpMax: number;
  embers: number;
  combo: number;
  avatar: string;
  title: string;
  joinedDate: string;
}

export type QuestCategory = 'ALL' | 'DAILY' | 'MAIN' | 'SIDE' | 'EPIC';
export type QuestDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Legendary';

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'DAILY' | 'MAIN' | 'SIDE' | 'EPIC';
  attribute: AttributeType;
  difficulty: QuestDifficulty;
  xp: number;
  embers: number;
  completed: boolean;
  completedAt?: string;
  isCustom?: boolean;
}

export type ItemRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type EquipmentSlot = 'relic' | 'weapon' | 'armor' | 'talisman' | 'ring' | 'cloak' | 'boots' | 'aura';

export interface Item {
  id: string;
  name: string;
  rarity: ItemRarity;
  price: number;
  description: string;
  lore: string;
  effect: string;
  slot: EquipmentSlot;
  icon: string;
  owned: boolean;
  equipped: boolean;
  locked: boolean;
  requiredLevel?: number;
  buff: {
    stat: 'craft' | 'focus' | 'vigor' | 'will' | 'all' | 'xp' | 'combo';
    value: number;
  };
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  level: number;
  archetype: string;
  dominantAttribute: AttributeType;
  attributes: Attributes;
  status: string;
  partyCompatible?: boolean;
}

export interface Realm {
  id: string;
  name: string;
  title: string;
  attribute: AttributeType | 'ALL';
  levelReq: number;
  unlocked: boolean;
  progress: number;
  description: string;
  lore: string;
  image: string;
  availableQuests: string[];
  rewards: string;
  coordinates: { x: number; y: number };
}

export interface SharedQuest {
  id: string;
  title: string;
  description: string;
  objective: string;
  players: { name: string; avatar: string; level: number; archetype: string; contribution: number }[];
  progressPercent: number;
  targetDays: number;
  currentDay: number;
  rewards: {
    xp: number;
    embers: number;
  };
  isJoined: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rewardEmbers: number;
  category: 'Progression' | 'Consistency' | 'Attributes' | 'Mastery';
}

export interface ActivityLogItem {
  id: string;
  dateLabel: 'TODAY' | 'YESTERDAY' | 'THIS WEEK' | 'LAST WEEK';
  title: string;
  category: string;
  xp: number;
  embers: number;
  attributeChange?: {
    attribute: AttributeType;
    value: number;
  };
  isMilestone?: boolean;
  milestoneTitle?: string;
  timestamp: string;
}

export interface ArchetypeInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  dominantStat: AttributeType | 'BALANCED';
  color: string;
  quote: string;
}
