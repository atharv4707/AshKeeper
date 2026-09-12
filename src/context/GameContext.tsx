import React, { createContext, useContext, useState, useEffect } from 'react';
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
import {
  INITIAL_USER,
  INITIAL_ATTRIBUTES,
  INITIAL_QUESTS,
  INITIAL_ITEMS,
  REALMS,
  SHARED_QUEST_DATA,
  ACHIEVEMENTS_DATA,
  ACTIVITY_LOGS,
  getArchetypeFromStats
} from '../data/mockData';
import { sound } from '../utils/sound';

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
  completeQuest: (questId: string) => void;
  createQuest: (quest: Omit<Quest, 'id' | 'completed'>) => void;
  purchaseItem: (itemId: string) => { success: boolean; message: string };
  equipItem: (itemId: string) => void;
  joinSharedQuest: () => void;
  contributeSharedQuest: () => void;
  closeLevelUpModal: () => void;
  toggleSound: () => void;
  toggleReducedMotion: () => void;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [attributes, setAttributes] = useState<Attributes>(INITIAL_ATTRIBUTES);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [realms, setRealms] = useState<Realm[]>(REALMS);
  const [sharedQuest, setSharedQuest] = useState<SharedQuest>(SHARED_QUEST_DATA);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS_DATA);
  const [logs, setLogs] = useState<ActivityLogItem[]>(ACTIVITY_LOGS);
  const [levelUpInfo, setLevelUpInfo] = useState<LevelUpInfo | null>(null);
  const [completingFeedback, setCompletingFeedback] = useState<QuestCompleteFeedback | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Derive Archetype dynamically from current stats
  const archetype = getArchetypeFromStats(attributes);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
  };

  const completeQuest = (questId: string) => {
    const targetQuest = quests.find(q => q.id === questId);
    if (!targetQuest || targetQuest.completed) return;

    sound.playQuestComplete();

    // Trigger feedback particle / floating numbers
    setCompletingFeedback({
      questId,
      xpGain: targetQuest.xp,
      emberGain: targetQuest.embers,
      attribute: targetQuest.attribute
    });

    setTimeout(() => {
      setCompletingFeedback(null);
    }, 2000);

    // Update quest status
    setQuests(prev =>
      prev.map(q => (q.id === questId ? { ...q, completed: true, completedAt: 'Just now' } : q))
    );

    // Increment corresponding attribute
    const attrKey = targetQuest.attribute.toLowerCase() as keyof Attributes;
    setAttributes(prev => ({
      ...prev,
      [attrKey]: prev[attrKey] + 2
    }));

    // Update log
    const newLogItem: ActivityLogItem = {
      id: `log-${Date.now()}`,
      dateLabel: 'TODAY',
      title: targetQuest.title,
      category: targetQuest.attribute,
      xp: targetQuest.xp,
      embers: targetQuest.embers,
      attributeChange: { attribute: targetQuest.attribute, value: 2 },
      timestamp: 'Just now'
    };
    setLogs(prev => [newLogItem, ...prev]);

    // Check user XP & potential Level Up
    setUser(prevUser => {
      const nextXp = prevUser.xp + targetQuest.xp;
      const nextEmbers = prevUser.embers + targetQuest.embers;

      if (nextXp >= prevUser.xpMax) {
        const newLevel = prevUser.level + 1;
        const remainderXp = nextXp - prevUser.xpMax;
        const newXpMax = Math.round(prevUser.xpMax * 1.25);

        // Check unlocked realms
        let newlyUnlocked: string | undefined = undefined;
        setRealms(prevRealms =>
          prevRealms.map(r => {
            if (!r.unlocked && newLevel >= r.levelReq) {
              newlyUnlocked = r.name;
              return { ...r, unlocked: true };
            }
            return r;
          })
        );

        // Play level up effects
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
            oldLevel: prevUser.level,
            newLevel,
            unlockedRealmName: newlyUnlocked || (newLevel === 8 ? 'THE TEMPLE' : undefined)
          });
        }, 500);

        return {
          ...prevUser,
          level: newLevel,
          xp: remainderXp,
          xpMax: newXpMax,
          embers: nextEmbers,
          combo: prevUser.combo + 1
        };
      }

      return {
        ...prevUser,
        xp: nextXp,
        embers: nextEmbers
      };
    });
  };

  const createQuest = (newQuestData: Omit<Quest, 'id' | 'completed'>) => {
    sound.playClick();
    const newQuest: Quest = {
      ...newQuestData,
      id: `custom-quest-${Date.now()}`,
      completed: false,
      isCustom: true
    };
    setQuests(prev => [newQuest, ...prev]);
  };

  const purchaseItem = (itemId: string): { success: boolean; message: string } => {
    const targetItem = items.find(i => i.id === itemId);
    if (!targetItem) return { success: false, message: 'Item not found' };
    if (targetItem.owned) return { success: false, message: 'Item already owned' };

    if (user.embers < targetItem.price) {
      return { success: false, message: 'NOT ENOUGH EMBERS. Complete more real-life quests.' };
    }

    sound.playPurchase();

    // Deduct embers
    setUser(prev => ({ ...prev, embers: prev.embers - targetItem.price }));

    // Set owned
    setItems(prev =>
      prev.map(item => (item.id === itemId ? { ...item, owned: true } : item))
    );

    // Add to log
    setLogs(prev => [
      {
        id: `log-buy-${Date.now()}`,
        dateLabel: 'TODAY',
        title: `Acquired ${targetItem.name}`,
        category: 'Cache',
        xp: 20,
        embers: -targetItem.price,
        isMilestone: true,
        milestoneTitle: `RELIC ACQUIRED: ${targetItem.name.toUpperCase()}`,
        timestamp: 'Just now'
      },
      ...prev
    ]);

    return { success: true, message: `Acquired ${targetItem.name}` };
  };

  const equipItem = (itemId: string) => {
    const target = items.find(i => i.id === itemId);
    if (!target || !target.owned) return;

    sound.playEquip();

    setItems(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const nextEquipped = !item.equipped;
          // Apply/remove stat buff
          if (target.buff.stat in attributes) {
            const statKey = target.buff.stat as keyof Attributes;
            setAttributes(a => ({
              ...a,
              [statKey]: nextEquipped ? a[statKey] + target.buff.value : Math.max(10, a[statKey] - target.buff.value)
            }));
          }
          return { ...item, equipped: nextEquipped };
        }
        // If same slot and we are equipping, unequip others in same slot
        if (item.slot === target.slot && item.id !== itemId && !target.equipped) {
          return { ...item, equipped: false };
        }
        return item;
      })
    );
  };

  const joinSharedQuest = () => {
    sound.playClick();
    setSharedQuest(prev => ({ ...prev, isJoined: true }));
  };

  const contributeSharedQuest = () => {
    sound.playQuestComplete();
    setSharedQuest(prev => ({
      ...prev,
      progressPercent: Math.min(100, prev.progressPercent + 8),
      players: prev.players.map((p, idx) => (idx === 0 ? { ...p, contribution: p.contribution + 6 } : p))
    }));
    setUser(prev => ({
      ...prev,
      xp: prev.xp + 40,
      embers: prev.embers + 15
    }));
  };

  const closeLevelUpModal = () => {
    sound.playClick();
    setLevelUpInfo(null);
  };

  const resetProgress = () => {
    setUser(INITIAL_USER);
    setAttributes(INITIAL_ATTRIBUTES);
    setQuests(INITIAL_QUESTS);
    setItems(INITIAL_ITEMS);
    setRealms(REALMS);
    setSharedQuest(SHARED_QUEST_DATA);
    setLogs(ACTIVITY_LOGS);
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
