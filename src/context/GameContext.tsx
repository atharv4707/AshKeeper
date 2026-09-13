import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  Attributes,
  Quest,
  Item,
  Realm,
  SharedQuest,
  Achievement,
  ActivityLogItem,
  ArchetypeInfo,
  AttributeType
} from '../types';
import { sound } from '../utils/sound';
import { useAuth } from './AuthContext';
import { achievementApi, cacheApi, inventoryApi, networkApi, playerApi, questApi, questLogApi, settingsApi, worldApi } from '../lib/api';
import type {
  AchievementResponse,
  ItemResponse,
  NetworkResponse,
  PlayerProfileResponse,
  ProgressionResponse,
  QuestLogEntry,
  QuestResponse,
  RealmResponse,
} from '../types/api';

interface LevelUpInfo {
  oldLevel: number;
  newLevel: number;
  unlockedRealmName?: string;
}

interface QuestCompleteFeedback {
  questId: string;
  xpGain: number;
  emberGain: number;
  attribute: AttributeType;
}

interface GameContextType {
  user: User;
  attributes: Attributes;
  quests: Quest[];
  items: Item[];
  realms: Realm[];
  sharedQuest: SharedQuest;
  achievements: Achievement[];
  logs: ActivityLogItem[];
  archetype: ArchetypeInfo;
  levelUpInfo: LevelUpInfo | null;
  completingFeedback: QuestCompleteFeedback | null;
  soundEnabled: boolean;
  reducedMotion: boolean;
  isPlayerLoading: boolean;
  playerError: string | null;
  isQuestsLoading: boolean;
  questsError: string | null;
  refreshPlayerState: () => Promise<void>;
  completeQuest: (questId: string) => Promise<void>;
  createQuest: (quest: Omit<Quest, 'id' | 'completed'>) => Promise<void>;
  purchaseItem: (itemId: string) => Promise<{ success: boolean; message: string }>;
  equipItem: (itemId: string) => void;
  joinSharedQuest: () => void;
  contributeSharedQuest: () => void;
  closeLevelUpModal: () => void;
  toggleSound: () => void;
  toggleReducedMotion: () => void;
  resetProgress: () => void;
}

const DEFAULT_ARCHETYPE: ArchetypeInfo = {
  name: 'THE BALANCED',
  title: 'The Harmonious Avatar',
  subtitle: 'Harmonious equilibrium across all pillars.',
  description: 'Your structure is settling into alignment.',
  dominantStat: 'BALANCED',
  color: '#FBBF24',
  quote: 'True power is symmetry.'
};

const mapRegionToRealm = (realm: RealmResponse): Realm => ({
  id: realm.id,
  name: realm.name,
  title: realm.title,
  attribute: (realm.attribute as Realm['attribute']) || 'ALL',
  levelReq: realm.level_requirement,
  unlocked: realm.unlocked,
  progress: 0,
  description: realm.description,
  lore: realm.lore,
  image: realm.image || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
  availableQuests: [],
  rewards: realm.title,
  coordinates: { x: realm.coordinates_x, y: realm.coordinates_y },
});

const mapAchievementResponseToAchievement = (achievement: AchievementResponse): Achievement => ({
  id: achievement.id,
  title: achievement.title,
  description: achievement.description,
  icon: achievement.category === 'Progression' ? 'Trophy' : achievement.category === 'Consistency' ? 'Flame' : achievement.category === 'Attributes' ? 'Sparkles' : 'Cpu',
  progress: achievement.progress,
  maxProgress: achievement.max_progress,
  unlocked: achievement.unlocked,
  rewardEmbers: achievement.ember_reward,
  category: (achievement.category as Achievement['category']) || 'Progression',
});

const mapNetworkSharedQuest = (data: NetworkResponse | null): SharedQuest => ({
  id: data?.shared_quest?.id ?? 'shared-quest-0',
  title: data?.shared_quest?.title ?? 'THE BUILDERS\' RUN',
  description: data?.shared_quest?.description ?? 'A cooperative multi-day expedition to manifest a shared prototype.',
  objective: data?.shared_quest?.objective ?? 'Build something deliberate for five consecutive days.',
  players: (data?.shared_quest?.players ?? []).map((player) => ({
    name: player.name,
    avatar: player.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    level: player.level,
    archetype: player.archetype,
    contribution: player.contribution,
  })),
  progressPercent: data?.shared_quest?.progress_percent ?? 0,
  targetDays: data?.shared_quest?.target_days ?? 5,
  currentDay: data?.shared_quest?.current_day ?? 1,
  rewards: {
    xp: data?.shared_quest?.reward_xp ?? 500,
    embers: data?.shared_quest?.reward_embers ?? 200,
  },
  isJoined: (data?.shared_quest?.players ?? []).some((player) => player.name.toLowerCase().includes('ash') || player.name.toLowerCase().includes('keeper')),
});

const mapQuestLogEntryToLog = (entry: QuestLogEntry): ActivityLogItem => ({
  id: entry.id,
  dateLabel: (entry.date_label as ActivityLogItem['dateLabel']) || 'TODAY',
  title: entry.title,
  category: entry.category,
  xp: entry.xp_awarded,
  embers: entry.embers_awarded,
  attributeChange: {
    attribute: (entry.attribute_awarded as AttributeType) || 'CRAFT',
    value: entry.attribute_gain,
  },
  isMilestone: entry.is_milestone,
  milestoneTitle: entry.is_milestone ? `${entry.title} // MILESTONE` : undefined,
  timestamp: entry.timestamp || entry.completed_at,
});

const mapProfileToUser = (profile: PlayerProfileResponse): User => ({
  id: profile.user_id,
  name: profile.username,
  email: profile.email,
  level: profile.level,
  xp: profile.current_xp,
  xpMax: profile.xp_max,
  embers: profile.embers,
  combo: profile.combo,
  avatar: profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  title: profile.title || profile.archetype,
  joinedDate: profile.joined_date
});

const mapProfileToAttributes = (profile: PlayerProfileResponse): Attributes => ({
  craft: profile.craft,
  focus: profile.focus,
  vigor: profile.vigor,
  will: profile.will
});

const mapProfileToArchetype = (profile: PlayerProfileResponse): ArchetypeInfo => {
  const info = profile.archetype_info;
  const dominantStat = profile.archetype === 'THE BUILDER'
    ? 'CRAFT'
    : profile.archetype === 'THE SCHOLAR'
      ? 'FOCUS'
      : profile.archetype === 'THE WARRIOR'
        ? 'VIGOR'
        : profile.archetype === 'THE KEEPER'
          ? 'WILL'
          : 'BALANCED';

  return {
    name: info?.name ?? profile.archetype,
    title: info?.next_archetype ?? profile.archetype,
    subtitle: info?.description ?? 'Your current path is consolidating.',
    description: info?.description ?? 'Your current path is consolidating.',
    dominantStat,
    color: info?.color ?? '#FF9E40',
    quote: info?.next_archetype_tip ?? 'Quiet consistency compounds.'
  };
};

const mapQuestResponseToQuest = (quest: QuestResponse): Quest => ({
  id: quest.id,
  title: quest.title,
  description: quest.description ?? '',
  category: quest.category as 'DAILY' | 'MAIN' | 'SIDE' | 'EPIC',
  attribute: quest.attribute as AttributeType,
  difficulty: quest.difficulty as 'Easy' | 'Medium' | 'Hard' | 'Legendary',
  xp: quest.xp_reward,
  embers: quest.ember_reward,
  completed: quest.status === 'COMPLETED',
  completedAt: quest.completed_at ?? undefined,
  isCustom: quest.quest_type === 'CUSTOM'
});

const mapItemResponseToItem = (item: ItemResponse): Item => ({
  id: item.id,
  name: item.name,
  rarity: item.rarity as Item['rarity'],
  price: item.price,
  description: item.description,
  lore: item.lore,
  effect: item.effect,
  slot: item.slot as Item['slot'],
  icon: item.icon ?? 'Sparkles',
  owned: item.owned,
  equipped: item.equipped,
  locked: item.locked,
  requiredLevel: item.level_requirement > 1 ? item.level_requirement : undefined,
  buff: {
    stat: item.stat === 'craft' ? 'craft' : item.stat === 'focus' ? 'focus' : item.stat === 'vigor' ? 'vigor' : item.stat === 'will' ? 'will' : item.stat === 'xp' ? 'xp' : item.stat === 'combo' ? 'combo' : 'all',
    value: item.stat_value
  }
});

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [user, setUser] = useState<User>({
    id: '', name: '', email: '', level: 1, xp: 0, xpMax: 100, embers: 0, combo: 0, avatar: '', title: 'THE BALANCED', joinedDate: ''
  });
  const [baseAttributes, setBaseAttributes] = useState<Attributes>({ craft: 10, focus: 10, vigor: 10, will: 10 });
  const [attributes, setAttributes] = useState<Attributes>({ craft: 10, focus: 10, vigor: 10, will: 10 });
  const [quests, setQuests] = useState<Quest[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [realms, setRealms] = useState<Realm[]>([]);
  const [sharedQuest, setSharedQuest] = useState<SharedQuest>({
    id: 'shared-quest-0', title: 'THE BUILDERS\' RUN', description: 'A cooperative multi-day expedition to manifest a shared prototype.', objective: 'Build something deliberate for five consecutive days.', players: [], progressPercent: 0, targetDays: 5, currentDay: 1, rewards: { xp: 500, embers: 200 }, isJoined: false,
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const [levelUpInfo, setLevelUpInfo] = useState<LevelUpInfo | null>(null);
  const [completingFeedback, setCompletingFeedback] = useState<QuestCompleteFeedback | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isPlayerLoading, setIsPlayerLoading] = useState(true);
  const [playerError, setPlayerError] = useState<string | null>(null);
  const [isQuestsLoading, setIsQuestsLoading] = useState(false);
  const [questsError, setQuestsError] = useState<string | null>(null);
  const [archetype, setArchetype] = useState<ArchetypeInfo>(DEFAULT_ARCHETYPE);

  const calculateDisplayedAttributes = useCallback((sourceItems: Item[], sourceBase: Attributes) => {
    const display: Attributes = { ...sourceBase };

    sourceItems.forEach(item => {
      if (!item.equipped || !item.buff) return;
      if (item.buff.stat === 'craft') display.craft += item.buff.value;
      if (item.buff.stat === 'focus') display.focus += item.buff.value;
      if (item.buff.stat === 'vigor') display.vigor += item.buff.value;
      if (item.buff.stat === 'will') display.will += item.buff.value;
    });

    return display;
  }, []);

  const refreshPlayerState = useCallback(async () => {
    if (!token) {
      setIsPlayerLoading(false);
      setPlayerError(null);
      return;
    }

    setIsPlayerLoading(true);
    setPlayerError(null);

    try {
      const [profile, cacheItems, worldItems, achievementItems, networkData, logItems] = await Promise.all([
        playerApi.profile(token),
        cacheApi.items(token),
        worldApi.list(token),
        achievementApi.list(token),
        networkApi.list(token),
        questLogApi.list(token),
      ]);

      const nextBaseAttributes = mapProfileToAttributes(profile);
      const nextItems = cacheItems.map(mapItemResponseToItem);
      const nextUser = mapProfileToUser(profile);
      const nextRealms = worldItems.map(mapRegionToRealm);

      setUser(nextUser);
      setBaseAttributes(nextBaseAttributes);
      setAttributes(calculateDisplayedAttributes(nextItems, nextBaseAttributes));
      setArchetype(mapProfileToArchetype(profile));
      setItems(nextItems);
      setRealms(nextRealms);
      setAchievements(achievementItems.map(mapAchievementResponseToAchievement));
      setSharedQuest(mapNetworkSharedQuest(networkData));
      setLogs(logItems.map(mapQuestLogEntryToLog));
    } catch (error) {
      console.error('Failed to load player profile:', error);
      setPlayerError('Unable to load your player state. Please retry.');
    } finally {
      setIsPlayerLoading(false);
    }
  }, [calculateDisplayedAttributes, token]);

  const refreshQuestState = useCallback(async () => {
    if (!token) {
      setQuests([]);
      setQuestsError(null);
      return;
    }

    setIsQuestsLoading(true);
    setQuestsError(null);

    try {
      const questList = await questApi.list(token);
      setQuests(questList.map(mapQuestResponseToQuest));
    } catch (error) {
      console.error('Failed to load quests:', error);
      setQuests([]);
      const message = error instanceof Error ? error.message : 'Unable to load your quests.';
      setQuestsError(message);
    } finally {
      setIsQuestsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthLoading) return;

    if (!isAuthenticated || !token) {
      setPlayerError(null);
      setIsPlayerLoading(false);
      setQuests([]);
      return;
    }

    void refreshPlayerState();
    void refreshQuestState();
  }, [isAuthLoading, isAuthenticated, token, refreshPlayerState, refreshQuestState]);


  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
  };

  const completeQuest = async (questId: string) => {
    if (!token) return;

    const targetQuest = quests.find(q => q.id === questId);
    if (!targetQuest || targetQuest.completed) return;

    try {
      const result = await questApi.complete(questId, token);
      sound.playQuestComplete();

      setCompletingFeedback({
        questId,
        xpGain: result.rewards.xp,
        emberGain: result.rewards.embers,
        attribute: Object.keys(result.attribute_change)[0]?.toUpperCase() as AttributeType || targetQuest.attribute
      });

      setTimeout(() => {
        setCompletingFeedback(null);
      }, 2000);

      setQuests(prev => prev.map(q => (q.id === questId ? mapQuestResponseToQuest(result.quest) : q)));

      const attributeKey = Object.keys(result.attribute_change)[0]?.toLowerCase() as keyof Attributes | undefined;
      if (attributeKey) {
        const nextBase = {
          ...baseAttributes,
          [attributeKey]: baseAttributes[attributeKey] + Number(result.attribute_change[attributeKey] ?? 0)
        } as Attributes;
        setBaseAttributes(nextBase);
        setAttributes(calculateDisplayedAttributes(items, nextBase));
      }

      setUser(prev => ({
        ...prev,
        level: result.player.level,
        xp: result.player.current_xp,
        xpMax: result.player.xp_max,
        embers: result.player.embers,
        combo: result.player.combo,
        title: result.player.archetype,
      }));

      setArchetype({
        name: result.player.archetype_info.name,
        title: result.player.archetype_info.next_archetype,
        subtitle: result.player.archetype_info.description,
        description: result.player.archetype_info.description,
        dominantStat: result.player.archetype === 'THE BUILDER' ? 'CRAFT' : result.player.archetype === 'THE SCHOLAR' ? 'FOCUS' : result.player.archetype === 'THE WARRIOR' ? 'VIGOR' : result.player.archetype === 'THE KEEPER' ? 'WILL' : 'BALANCED',
        color: result.player.archetype_info.color,
        quote: result.player.archetype_info.next_archetype_tip
      });

      if (result.level_up) {
        setTimeout(() => {
          sound.playLevelUp();
          if (!reducedMotion) {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#FF6B2B', '#FF9E40', '#38BDF8', '#C084FC']
            });
          }
          setLevelUpInfo({
            oldLevel: result.player.level - result.levels_gained,
            newLevel: result.player.level,
            unlockedRealmName: result.unlocked_realms[0]
          });
        }, 500);
      }

      const newLogItem: ActivityLogItem = {
        id: `log-${Date.now()}`,
        dateLabel: 'TODAY',
        title: targetQuest.title,
        category: targetQuest.attribute,
        xp: result.rewards.xp,
        embers: result.rewards.embers,
        attributeChange: { attribute: targetQuest.attribute, value: Number(Object.values(result.attribute_change)[0] ?? 0) },
        timestamp: 'Just now'
      };
      setLogs(prev => [newLogItem, ...prev]);

      await refreshPlayerState();
      await refreshQuestState();
    } catch (error) {
      console.error('Failed to complete quest:', error);
    }
  };

  const createQuest = async (newQuestData: Omit<Quest, 'id' | 'completed'>) => {
    if (!token) return;

    sound.playClick();

    try {
      const createdQuest = await questApi.create({
        title: newQuestData.title,
        description: newQuestData.description,
        category: newQuestData.category,
        attribute: newQuestData.attribute,
        difficulty: newQuestData.difficulty,
      }, token);

      setQuests(prev => [mapQuestResponseToQuest(createdQuest), ...prev]);
      await refreshQuestState();
    } catch (error) {
      console.error('Failed to create quest:', error);
      const message = error instanceof Error ? error.message : 'Unable to create your quest.';
      throw new Error(message);
    }
  };

  const purchaseItem = async (itemId: string): Promise<{ success: boolean; message: string }> => {
    if (!token) {
      return { success: false, message: 'Please log in to acquire this relic.' };
    }

    const targetItem = items.find(i => i.id === itemId);
    if (!targetItem) return { success: false, message: 'Item not found' };
    if (targetItem.owned) return { success: false, message: 'Item already owned' };

    try {
      const result = await cacheApi.purchase(itemId, token);
      sound.playPurchase();

      setUser(prev => ({ ...prev, embers: result.new_embers }));
      setItems(prev => prev.map(item => (item.id === itemId ? mapItemResponseToItem(result.item) : item)));
      setLogs(prev => [
        {
          id: `log-buy-${Date.now()}`,
          dateLabel: 'TODAY',
          title: `Acquired ${result.item.name}`,
          category: 'Cache',
          xp: 0,
          embers: -result.item.price,
          isMilestone: true,
          milestoneTitle: `RELIC ACQUIRED: ${result.item.name.toUpperCase()}`,
          timestamp: 'Just now'
        },
        ...prev
      ]);

      return { success: true, message: result.message };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to complete this purchase.';
      return { success: false, message };
    }
  };

  const equipItem = async (itemId: string) => {
    const target = items.find(i => i.id === itemId);
    if (!target || !target.owned) return;

    try {
      const response = target.equipped
        ? await inventoryApi.unequip(itemId, token)
        : await inventoryApi.equip(itemId, token);

      sound.playEquip();

      setItems(prev => {
        const nextItems = prev.map(item => {
          if (item.id === itemId) {
            return { ...item, equipped: response.equipped };
          }
          if (item.slot === target.slot && response.equipped && item.id !== itemId) {
            return { ...item, equipped: false };
          }
          return item;
        });
        setAttributes(calculateDisplayedAttributes(nextItems, baseAttributes));
        return nextItems;
      });
    } catch (error) {
      console.error('Failed to update equipment state:', error);
      const message = error instanceof Error ? error.message : 'Unable to update equipment.';
      window.alert(message);
    }
  };

  const joinSharedQuest = async () => {
    if (!token || !sharedQuest.id || sharedQuest.id === 'shared-quest-0') return;
    sound.playClick();
    try {
      await networkApi.joinSharedQuest(sharedQuest.id, token);
      await refreshPlayerState();
    } catch (error) {
      console.error('Failed to join shared quest:', error);
    }
  };

  const contributeSharedQuest = async () => {
    if (!token || !sharedQuest.id || sharedQuest.id === 'shared-quest-0') return;
    sound.playQuestComplete();
    try {
      await networkApi.contributeSharedQuest(sharedQuest.id, token);
      await refreshPlayerState();
    } catch (error) {
      console.error('Failed to contribute to shared quest:', error);
    }
  };

  const closeLevelUpModal = () => {
    sound.playClick();
    setLevelUpInfo(null);
  };

  const resetProgress = () => {
    setUser({
      id: '', name: '', email: '', level: 1, xp: 0, xpMax: 100, embers: 0, combo: 0, avatar: '', title: 'THE BALANCED', joinedDate: ''
    });
    setBaseAttributes({ craft: 10, focus: 10, vigor: 10, will: 10 });
    setAttributes({ craft: 10, focus: 10, vigor: 10, will: 10 });
    setQuests([]);
    setItems([]);
    setRealms([]);
    setSharedQuest({
      id: 'shared-quest-0', title: 'THE BUILDERS\' RUN', description: 'A cooperative multi-day expedition to manifest a shared prototype.', objective: 'Build something deliberate for five consecutive days.', players: [], progressPercent: 0, targetDays: 5, currentDay: 1, rewards: { xp: 500, embers: 200 }, isJoined: false,
    });
    setLogs([]);
    sound.playClick();
  };

  return (
    <GameContext.Provider
      value={{
        user,
        attributes,
        quests,
        items,
        realms,
        sharedQuest,
        achievements,
        logs,
        archetype,
        levelUpInfo,
        completingFeedback,
        soundEnabled,
        reducedMotion,
        isPlayerLoading,
        playerError,
        isQuestsLoading,
        questsError,
        refreshPlayerState,
        completeQuest,
        createQuest,
        purchaseItem,
        equipItem,
        joinSharedQuest,
        contributeSharedQuest,
        closeLevelUpModal,
        toggleSound,
        toggleReducedMotion,
        resetProgress
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
