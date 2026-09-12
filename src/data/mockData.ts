import { User, Attributes, Quest, Item, Realm, Player, SharedQuest, Achievement, ActivityLogItem, ArchetypeInfo, AttributeType } from '../types';

export const INITIAL_USER: User = {
  id: 'user-01',
  name: 'Atharv',
  email: 'atharv4707@gmail.com',
  level: 7,
  xp: 820,
  xpMax: 1000,
  embers: 420,
  combo: 7,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  title: 'The Builder',
  joinedDate: 'August 2025'
};

export const INITIAL_ATTRIBUTES: Attributes = {
  craft: 78,
  focus: 61,
  will: 42,
  vigor: 37,
};

export const ARCHETYPES: Record<string, ArchetypeInfo> = {
  BUILDER: {
    name: 'THE BUILDER',
    title: 'The Architect of Reality',
    subtitle: 'Your strongest path is Craft.',
    description: 'You shape the world through creation, programming, and architecture. Every line of code and tangible project manifests internal mastery.',
    dominantStat: 'CRAFT',
    color: '#FF9E40',
    quote: 'Ideas are smoke until welded into reality.'
  },
  SCHOLAR: {
    name: 'THE SCHOLAR',
    title: 'The Seeker of Truth',
    subtitle: 'Your strongest path is Focus.',
    description: 'You conquer ignorance with deep analytical immersion, extensive reading, and rigorous intellectual discipline.',
    dominantStat: 'FOCUS',
    color: '#60A5FA',
    quote: 'Knowledge is the fuel that keeps the flame eternal.'
  },
  WARRIOR: {
    name: 'THE WARRIOR',
    title: 'The Kinetic Vanguard',
    subtitle: 'Your strongest path is Vigor.',
    description: 'You forge your vessel through physical exertion, heavy endurance, and relentless physical resilience.',
    dominantStat: 'VIGOR',
    color: '#34D399',
    quote: 'A sovereign mind requires an unyielding temple.'
  },
  KEEPER: {
    name: 'THE KEEPER',
    title: 'The Bastion of Will',
    subtitle: 'Your strongest path is Will.',
    description: 'You command yourself before attempting to command the world. Your habits are an unbroken ring of iron resolve.',
    dominantStat: 'WILL',
    color: '#C084FC',
    quote: 'Discipline is remembering what you truly want.'
  },
  BALANCED: {
    name: 'THE BALANCED',
    title: 'The Harmonious Avatar',
    subtitle: 'Harmonious equilibrium across all pillars.',
    description: 'You refuse specialization in favor of complete multidimensional mastery. Mind, body, craft, and will resonate in unison.',
    dominantStat: 'BALANCED',
    color: '#FBBF24',
    quote: 'True power is symmetry.'
  }
};

export function getArchetypeFromStats(attrs: Attributes): ArchetypeInfo {
  const { craft, focus, vigor, will } = attrs;
  const values = [craft, focus, vigor, will];
  const max = Math.max(...values);
  const min = Math.min(...values);

  // If variance is tight, balanced archetype emerges
  if (max - min <= 14) {
    return ARCHETYPES.BALANCED;
  }

  if (craft === max) return ARCHETYPES.BUILDER;
  if (focus === max) return ARCHETYPES.SCHOLAR;
  if (vigor === max) return ARCHETYPES.WARRIOR;
  return ARCHETYPES.KEEPER;
}

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q-1',
    title: 'Complete React feature',
    description: 'Finish the state hydration and animation triggers for the core game loop.',
    category: 'MAIN',
    attribute: 'CRAFT',
    difficulty: 'Medium',
    xp: 60,
    embers: 20,
    completed: false
  },
  {
    id: 'q-2',
    title: 'Gym 45 minutes',
    description: 'Target compound movement circuits and mobility recovery.',
    category: 'DAILY',
    attribute: 'VIGOR',
    difficulty: 'Medium',
    xp: 40,
    embers: 15,
    completed: false
  },
  {
    id: 'q-3',
    title: 'Study Operating Systems',
    description: 'Read Chapter 4 on virtual memory paging and cache coherency.',
    category: 'MAIN',
    attribute: 'FOCUS',
    difficulty: 'Medium',
    xp: 50,
    embers: 20,
    completed: false
  },
  {
    id: 'q-4',
    title: 'Read 20 pages',
    description: 'Deep non-fiction book immersion with handwritten margin insights.',
    category: 'DAILY',
    attribute: 'FOCUS',
    difficulty: 'Easy',
    xp: 30,
    embers: 10,
    completed: false
  },
  {
    id: 'q-5',
    title: 'Meditate 10 minutes',
    description: 'Stillness, breath control, and sensory recalibration at dawn.',
    category: 'DAILY',
    attribute: 'WILL',
    difficulty: 'Easy',
    xp: 20,
    embers: 10,
    completed: false
  },
  {
    id: 'q-6',
    title: 'Architect Distributed API',
    description: 'Model resilient microservices with idempotent endpoints and latency bounds.',
    category: 'EPIC',
    attribute: 'CRAFT',
    difficulty: 'Legendary',
    xp: 150,
    embers: 60,
    completed: false
  },
  {
    id: 'q-7',
    title: 'Sprint 5 Kilometers',
    description: 'High-cadence interval pacing outdoors in crisp morning air.',
    category: 'SIDE',
    attribute: 'VIGOR',
    difficulty: 'Hard',
    xp: 75,
    embers: 25,
    completed: false
  },
  {
    id: 'q-8',
    title: 'Zero Sugar & Cold Plunge',
    description: 'Enforce unyielding dopamine reset and physiological resilience.',
    category: 'DAILY',
    attribute: 'WILL',
    difficulty: 'Medium',
    xp: 45,
    embers: 15,
    completed: true,
    completedAt: 'Today, 07:15 AM'
  }
];

export const INITIAL_ITEMS: Item[] = [
  {
    id: 'item-1',
    name: 'Ashen Sigil',
    rarity: 'Rare',
    price: 120,
    description: 'A glowing metallic talisman etched with the crest of the Ashkeeper.',
    lore: 'Warm to the touch, it hums whenever you begin deliberate deep work.',
    effect: '+5% XP across all actions',
    slot: 'relic',
    icon: 'Sparkles',
    owned: false,
    equipped: false,
    locked: false,
    buff: { stat: 'xp', value: 5 }
  },
  {
    id: 'item-2',
    name: 'Iron Will',
    rarity: 'Epic',
    price: 200,
    description: 'A carved tungsten core that stabilizes impulsive thoughts.',
    lore: 'Forged under extreme gravitational pressure in the deep Sanctum void.',
    effect: '+10 WILL permanent attribute boost',
    slot: 'talisman',
    icon: 'Shield',
    owned: false,
    equipped: false,
    locked: false,
    buff: { stat: 'will', value: 10 }
  },
  {
    id: 'item-3',
    name: 'Night Watch',
    rarity: 'Epic',
    price: 350,
    description: 'An obsidian chronograph preserving streak continuity.',
    lore: 'Shields your active streak flame if an emergency disrupts your daily quota.',
    effect: 'Combo Protection (1 missed day forgiven)',
    slot: 'ring',
    icon: 'Flame',
    owned: false,
    equipped: false,
    locked: false,
    buff: { stat: 'combo', value: 1 }
  },
  {
    id: 'item-4',
    name: 'Golden Flame',
    rarity: 'Legendary',
    price: 500,
    description: 'An ethereal halo of primordial combustion.',
    lore: 'Bestowed only upon keepers who harmonize all four cardinal disciplines.',
    effect: '+15 ALL STATS attribute resonance',
    slot: 'aura',
    icon: 'Sun',
    owned: false,
    equipped: false,
    locked: false,
    buff: { stat: 'all', value: 15 }
  },
  {
    id: 'item-5',
    name: 'Shadow Cloak',
    rarity: 'Epic',
    price: 800,
    description: 'Woven from silent dusk fibers and dark matter weave.',
    lore: 'Worn by wanderers who execute monumental feats in complete quiet.',
    effect: 'Exclusive visual skin & +8 Vigor',
    slot: 'cloak',
    icon: 'Feather',
    owned: true,
    equipped: true,
    locked: false,
    buff: { stat: 'vigor', value: 8 }
  },
  {
    id: 'item-6',
    name: 'Phoenix Heart',
    rarity: 'Legendary',
    price: 1500,
    description: 'The pulsing nucleus of a revitalized mythic titan.',
    lore: 'Turns severe fatigue into catalytic drive. Complete unlock of latent DNA strands.',
    effect: '+25% XP, +10 All Stats, Permanent Golden Flare',
    slot: 'relic',
    icon: 'Heart',
    owned: false,
    equipped: false,
    locked: false,
    buff: { stat: 'all', value: 10 }
  },
  {
    id: 'item-7',
    name: 'Obsidian Stylus',
    rarity: 'Rare',
    price: 240,
    description: 'A precision chisel designed for digital architecture.',
    lore: 'Cuts through cognitive fog, allowing clean system synthesis.',
    effect: '+8 Craft & +5 Focus',
    slot: 'weapon',
    icon: 'Code',
    owned: true,
    equipped: true,
    locked: false,
    buff: { stat: 'craft', value: 8 }
  },
  {
    id: 'item-8',
    name: 'Titan Crest Cuirass',
    rarity: 'Rare',
    price: 320,
    description: 'Reinforced ceramic plates aligned with biomechanical posture.',
    lore: 'Reminds the spine to remain upright and focused under duress.',
    effect: '+12 Vigor resilience',
    slot: 'armor',
    icon: 'Layers',
    owned: true,
    equipped: true,
    locked: false,
    buff: { stat: 'vigor', value: 12 }
  },
  {
    id: 'item-9',
    name: 'Astral Crown',
    rarity: 'Legendary',
    price: 2200,
    description: 'A crown of hovering starlight filaments.',
    lore: 'Requires Level 10 Ascension. Worn by realm wardens.',
    effect: '+30 Focus & Ascended HUD',
    slot: 'aura',
    icon: 'Crown',
    owned: false,
    equipped: false,
    locked: true,
    requiredLevel: 10,
    buff: { stat: 'focus', value: 30 }
  }
];

export const REALMS: Realm[] = [
  {
    id: 'the-keep',
    name: 'THE KEEP',
    title: 'The Primordial Bastion',
    attribute: 'ALL',
    levelReq: 1,
    unlocked: true,
    progress: 100,
    description: 'The central citadel where all keepers assemble. Its golden flame tower acts as a navigational beacon across the dimensional mist.',
    lore: 'Constructed in the First Era by travelers who discovered that intention could bend physical laws.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&auto=format&fit=crop&q=80',
    availableQuests: ['Morning Alignment', 'Review Daily Objectives', 'Ignite Central Hearth'],
    rewards: 'Access to the Central Telemetry Nexus',
    coordinates: { x: 50, y: 52 }
  },
  {
    id: 'the-forge',
    name: 'THE FORGE',
    title: 'The Foundry of Creation',
    attribute: 'CRAFT',
    levelReq: 3,
    unlocked: true,
    progress: 68,
    description: 'Volcanic magma furnaces and quantum assembly docks where software, machines, and tangible creations are hammered into existence.',
    lore: 'The air here smells of ozone and molten iron. Only builders who turn abstract thoughts into code survive the thermal pressure.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=900&auto=format&fit=crop&q=80',
    availableQuests: ['Deploy High-Throughput Service', 'Draft Technical Spec', 'Debug Kernel Trace'],
    rewards: 'Rare blueprints & +15 Craft capacity',
    coordinates: { x: 26, y: 74 }
  },
  {
    id: 'the-archive',
    name: 'THE ARCHIVE',
    title: 'The Crystalline Spire',
    attribute: 'FOCUS',
    levelReq: 5,
    unlocked: true,
    progress: 44,
    description: 'Towering shelves of crystalline data substrates floating in silent zero-gravity. The sanctuary of undivided analytical absorption.',
    lore: 'No whispers are permitted. The crystals amplify cognitive speed and banish distraction from the mortal realm.',
    image: 'https://images.unsplash.com/photo-1507842229451-764367c30985?w=900&auto=format&fit=crop&q=80',
    availableQuests: ['Continuous 90m Deep Work Block', 'Synthesize Dense Academic Paper', 'Algorithm Analysis'],
    rewards: 'Ancient codex relics & +12 Focus capacity',
    coordinates: { x: 22, y: 26 }
  },
  {
    id: 'the-temple',
    name: 'THE TEMPLE',
    title: 'The Summit of Physicality',
    attribute: 'VIGOR',
    levelReq: 8,
    unlocked: false,
    progress: 0,
    description: 'A windswept mountain sanctuary carved directly into jagged granite cliffs. Home to warriors who test the outer limits of cardiovascular endurance.',
    lore: 'Gravity is 20% stronger on the Temple steps. Those who climb them without pause gain unbreakable biological grit.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&auto=format&fit=crop&q=80',
    availableQuests: ['Complete 10k Mountain Trail', 'Heavy Squat Protocol', 'VO2 Max Circuit'],
    rewards: 'Titan armor & Vigor resonance amplification',
    coordinates: { x: 78, y: 22 }
  },
  {
    id: 'the-sanctum',
    name: 'THE SANCTUM',
    title: 'The Astral Void',
    attribute: 'WILL',
    levelReq: 10,
    unlocked: false,
    progress: 0,
    description: 'An ethereal floating temple surrounded by violet aurora rings. Where only the absolute masters of stoic discipline and dawn habits can tread.',
    lore: 'Time behaves strangely here. Desires fade; only the quiet sovereign observer remains.',
    image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=900&auto=format&fit=crop&q=80',
    availableQuests: ['30-Day Unbroken Habit Ring', 'Dawn Awakening at 05:00', 'Digital Fasting Protocol'],
    rewards: 'Phoenix Relic Core & Transcendence Crest',
    coordinates: { x: 80, y: 72 }
  }
];

export const PLAYERS_NEARBY: Player[] = [
  {
    id: 'p-1',
    name: 'Riya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    level: 6,
    archetype: 'THE SCHOLAR',
    dominantAttribute: 'FOCUS',
    attributes: { craft: 48, focus: 86, vigor: 39, will: 55 },
    status: 'Deep in OS Kernel study',
    partyCompatible: true
  },
  {
    id: 'p-2',
    name: 'Kabir',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    level: 8,
    archetype: 'THE WARRIOR',
    dominantAttribute: 'VIGOR',
    attributes: { craft: 52, focus: 44, vigor: 82, will: 63 },
    status: 'Finishing 500m rowing split',
    partyCompatible: true
  },
  {
    id: 'p-3',
    name: 'Aarav',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    level: 7,
    archetype: 'THE BALANCED',
    dominantAttribute: 'CRAFT',
    attributes: { craft: 71, focus: 68, vigor: 70, will: 69 },
    status: 'Aligning weekly pillars',
    partyCompatible: true
  },
  {
    id: 'p-4',
    name: 'Neha',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    level: 5,
    archetype: 'THE KEEPER',
    dominantAttribute: 'WILL',
    attributes: { craft: 35, focus: 52, vigor: 40, will: 68 },
    status: '14-day cold shower streak',
    partyCompatible: false
  }
];

export const SHARED_QUEST_DATA: SharedQuest = {
  id: 'sq-1',
  title: "THE BUILDERS' RUN",
  description: 'Cooperative multi-day expedition. Each member commits daily building sprints to manifest a unified prototype.',
  objective: 'Build something deliberate for 5 consecutive days.',
  progressPercent: 78,
  targetDays: 5,
  currentDay: 4,
  players: [
    {
      name: 'Atharv (You)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      level: 7,
      archetype: 'THE BUILDER',
      contribution: 82
    },
    {
      name: 'Riya',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      level: 6,
      archetype: 'THE SCHOLAR',
      contribution: 76
    },
    {
      name: 'Kabir',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      level: 8,
      archetype: 'THE WARRIOR',
      contribution: 75
    }
  ],
  rewards: {
    xp: 500,
    embers: 200
  },
  isJoined: true
};

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach-1',
    title: 'FIRST SPARK',
    description: 'Complete your inaugural real-life quest.',
    icon: 'Sparkle',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    rewardEmbers: 50,
    category: 'Progression'
  },
  {
    id: 'ach-2',
    title: 'UNBROKEN',
    description: 'Reach and sustain a 7-day Combo flame.',
    icon: 'Flame',
    progress: 7,
    maxProgress: 7,
    unlocked: true,
    rewardEmbers: 150,
    category: 'Consistency'
  },
  {
    id: 'ach-3',
    title: 'THE GRINDER',
    description: 'Complete 25 verified real-world missions.',
    icon: 'CheckCircle2',
    progress: 19,
    maxProgress: 25,
    unlocked: false,
    rewardEmbers: 250,
    category: 'Progression'
  },
  {
    id: 'ach-4',
    title: 'TREASURE HUNTER',
    description: 'Acquire your first ancient relic from the Cache.',
    icon: 'Gem',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    rewardEmbers: 100,
    category: 'Mastery'
  },
  {
    id: 'ach-5',
    title: 'ASCENSION',
    description: 'Ascend to Level 10 and unlock The Sanctum.',
    icon: 'Award',
    progress: 7,
    maxProgress: 10,
    unlocked: false,
    rewardEmbers: 500,
    category: 'Progression'
  },
  {
    id: 'ach-6',
    title: 'ARCHITECT OF CODE',
    description: 'Elevate your Craft attribute past 75.',
    icon: 'Cpu',
    progress: 78,
    maxProgress: 75,
    unlocked: true,
    rewardEmbers: 180,
    category: 'Attributes'
  }
];

export const ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: 'log-1',
    dateLabel: 'TODAY',
    title: 'Complete React feature',
    category: 'Craft',
    xp: 60,
    embers: 20,
    attributeChange: { attribute: 'CRAFT', value: 2 },
    timestamp: '11:42 AM'
  },
  {
    id: 'log-2',
    dateLabel: 'TODAY',
    title: 'Gym compound circuit',
    category: 'Vigor',
    xp: 40,
    embers: 15,
    attributeChange: { attribute: 'VIGOR', value: 2 },
    timestamp: '08:15 AM'
  },
  {
    id: 'log-3',
    dateLabel: 'YESTERDAY',
    title: 'Study Operating Systems',
    category: 'Focus',
    xp: 50,
    embers: 20,
    attributeChange: { attribute: 'FOCUS', value: 2 },
    timestamp: '04:30 PM'
  },
  {
    id: 'log-4',
    dateLabel: 'YESTERDAY',
    title: 'LEVEL UP // 06 → 07',
    category: 'Milestone',
    xp: 0,
    embers: 50,
    isMilestone: true,
    milestoneTitle: 'ASCENDED TO LEVEL 07',
    timestamp: '05:00 PM'
  },
  {
    id: 'log-5',
    dateLabel: 'THIS WEEK',
    title: 'Acquired Shadow Cloak',
    category: 'Cache',
    xp: 25,
    embers: -800,
    isMilestone: true,
    milestoneTitle: 'RELIC ACQUIRED: SHADOW CLOAK',
    timestamp: 'Wednesday'
  },
  {
    id: 'log-6',
    dateLabel: 'THIS WEEK',
    title: 'Reached 7-Day Unbroken Combo',
    category: 'Milestone',
    xp: 100,
    embers: 70,
    isMilestone: true,
    milestoneTitle: '7-DAY COMBO IGNITED',
    timestamp: 'Tuesday'
  }
];
