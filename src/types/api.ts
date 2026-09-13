// API response types matching the FastAPI backend schemas

export interface ApiError {
  error: string;
  message: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  username: string;
}

export interface MeResponse {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

// ─── Player ───────────────────────────────────────────────────────────────────

export interface ArchetypeInfo {
  name: string;
  color: string;
  description: string;
  next_archetype: string;
  next_archetype_tip: string;
}

export interface PlayerProfileResponse {
  id: string;
  user_id: string;
  level: number;
  current_xp: number;
  xp_max: number;
  total_xp: number;
  embers: number;
  combo: number;
  current_streak: number;
  longest_streak: number;
  craft: number;
  focus: number;
  vigor: number;
  will: number;
  archetype: string;
  archetype_info: ArchetypeInfo;
  sound_enabled: boolean;
  reduced_motion: boolean;
  avatar: string;
  username: string;
  email: string;
  joined_date: string;
  title: string;
}

export interface DashboardResponse {
  player: PlayerProfileResponse;
  active_quests: QuestResponse[];
  realms: RealmResponse[];
}

export interface ProgressionResponse {
  strongest_attribute: string;
  strongest_gain: number;
  current_archetype: string;
  next_archetype: string;
  next_archetype_tip: string;
  craft: number;
  focus: number;
  vigor: number;
  will: number;
  craft_last_week: number;
  focus_last_week: number;
  vigor_last_week: number;
  will_last_week: number;
  quests_this_week: number;
  xp_this_week: number;
  embers_this_week: number;
  streak: number;
}

// ─── Quests ───────────────────────────────────────────────────────────────────

export interface QuestResponse {
  id: string;
  title: string;
  description: string | null;
  category: string;
  quest_type: string;
  difficulty: string;
  xp_reward: number;
  ember_reward: number;
  attribute: string;
  attribute_gain: number;
  status: string;
  completed_at: string | null;
  created_at: string;
  is_template: boolean;
}

export interface RewardsResult {
  xp: number;
  embers: number;
}

export interface AttributeChange {
  [attr: string]: number;
}

export interface CompleteQuestPlayer {
  level: number;
  current_xp: number;
  xp_max: number;
  total_xp: number;
  embers: number;
  combo: number;
  current_streak: number;
  longest_streak: number;
  craft: number;
  focus: number;
  vigor: number;
  will: number;
  archetype: string;
  archetype_info: ArchetypeInfo;
}

export interface UnlockedAchievement {
  id: string;
  title: string;
  description: string;
  ember_reward: number;
}

export interface CompleteQuestResponse {
  quest: QuestResponse;
  rewards: RewardsResult;
  attribute_change: AttributeChange;
  player: CompleteQuestPlayer;
  level_up: boolean;
  levels_gained: number;
  unlocked_realms: string[];
  achievements_unlocked: UnlockedAchievement[];
}

// ─── Items ────────────────────────────────────────────────────────────────────

export interface ItemResponse {
  id: string;
  name: string;
  description: string;
  lore: string;
  effect: string;
  category: string;
  slot: string;
  price: number;
  rarity: string;
  stat: string;
  stat_value: number;
  level_requirement: number;
  icon: string | null;
  owned: boolean;
  equipped: boolean;
  locked: boolean;
}

export interface PurchaseResponse {
  item: ItemResponse;
  new_embers: number;
  message: string;
}

// ─── Inventory ────────────────────────────────────────────────────────────────

export interface InventoryItemResponse {
  inventory_id: string;
  item: ItemResponse;
  equipped: boolean;
  acquired_at: string;
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export interface AchievementResponse {
  id: string;
  title: string;
  description: string;
  category: string;
  requirement_type: string;
  requirement_value: number;
  ember_reward: number;
  max_progress: number;
  // User progress fields
  progress: number;
  unlocked: boolean;
  claimed: boolean;
  unlocked_at: string | null;
}

export interface ClaimResponse {
  achievement: AchievementResponse;
  embers_awarded: number;
  new_embers: number;
}

// ─── World ────────────────────────────────────────────────────────────────────

export interface RealmResponse {
  id: string;
  name: string;
  title: string;
  description: string;
  lore: string;
  attribute: string;
  level_requirement: number;
  coordinates_x: number;
  coordinates_y: number;
  image: string | null;
  order_index: number;
  unlocked: boolean;
}

// ─── Network ──────────────────────────────────────────────────────────────────

export interface NetworkProfileResponse {
  id: string;
  name: string;
  level: number;
  archetype: string;
  status: string;
  avatar: string;
  attributes: {
    craft: number;
    focus: number;
    vigor: number;
    will: number;
  };
}

export interface SharedQuestParticipantResponse {
  id: string;
  name: string;
  level: number;
  archetype: string;
  avatar: string;
  contribution: number;
}

export interface SharedQuestResponse {
  id: string;
  title: string;
  description: string;
  objective: string;
  target_days: number;
  current_day: number;
  progress_percent: number;
  status: string;
  reward_xp: number;
  reward_embers: number;
  players: SharedQuestParticipantResponse[];
}

export interface NetworkResponse {
  players: NetworkProfileResponse[];
  shared_quest: SharedQuestResponse | null;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface SettingsResponse {
  sound_enabled: boolean;
  reduced_motion: boolean;
}

// ─── Quest Log ────────────────────────────────────────────────────────────────

export interface QuestLogEntry {
  id: string;
  title: string;
  category: string;
  completed_at: string;
  xp_awarded: number;
  embers_awarded: number;
  attribute_awarded: string;
  attribute_gain: number;
  level_before: number;
  level_after: number;
  is_milestone: boolean;
  milestone_title?: string;
  date_label: string;
  timestamp: string;
}
