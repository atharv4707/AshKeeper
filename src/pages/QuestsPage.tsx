import React, { useState } from 'react';
import {
  Plus,
  Check,
  Play,
  RotateCcw,
  Sparkles,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  Filter
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { QuestCreateModal } from '../components/QuestCreateModal';
import { sound } from '../utils/sound';

export const QuestsPage: React.FC = () => {
  const { quests, completeQuest, completingFeedback, isQuestsLoading, questsError } = useGame();

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'DAILY' | 'MAIN' | 'SIDE' | 'EPIC'>('ALL');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const filteredQuests = quests.filter(q => {
    if (activeFilter === 'ALL') return true;
    return q.category === activeFilter;
  });

  const completedCount = quests.filter(q => q.completed).length;
  const totalCount = quests.length;

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Top Bar Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '0.14em',
              color: '#FF9E40',
              marginBottom: 4
            }}
          >
            OBJECTIVE MATRIX
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>QUESTS</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            "Turn real life into progress." Every fulfilled commitment fuels your Life DNA.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              padding: '6px 14px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              color: 'var(--text-secondary)'
            }}
          >
            COMPLETED: <span style={{ color: '#FF9E40', fontWeight: 800 }}>{completedCount}</span> / {totalCount}
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setCreateModalOpen(true);
            }}
            className="btn-ember"
            style={{ fontSize: 13, padding: '10px 20px' }}
          >
            <Plus size={16} />
            CREATE QUEST
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 28,
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 14,
          overflowX: 'auto'
        }}
      >
        {(['ALL', 'DAILY', 'MAIN', 'SIDE', 'EPIC'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => {
              sound.playClick();
              setActiveFilter(tab);
            }}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.08em',
              transition: 'all 0.2s ease',
              background: activeFilter === tab ? 'rgba(255, 107, 43, 0.15)' : 'rgba(255, 255, 255, 0.02)',
              border: activeFilter === tab ? '1px solid #FF6B2B' : '1px solid var(--border-subtle)',
              color: activeFilter === tab ? '#FF9E40' : 'var(--text-secondary)'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {questsError && (
        <div
          style={{
            marginBottom: 18,
            padding: '10px 14px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.45)',
            borderRadius: 'var(--radius-sm)',
            color: '#FCA5A5',
            fontSize: 13,
            fontWeight: 600
          }}
        >
          {questsError}
        </div>
      )}

      {isQuestsLoading && quests.length === 0 && (
        <div style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 18 }}>
          Loading quest journal...
        </div>
      )}

      {/* Quests Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
        {filteredQuests.map(quest => {
          const isCompleting = completingFeedback?.questId === quest.id;
          const attrClass =
            quest.attribute === 'CRAFT'
              ? 'pill-craft'
              : quest.attribute === 'FOCUS'
              ? 'pill-focus'
              : quest.attribute === 'VIGOR'
              ? 'pill-vigor'
              : 'pill-will';

          return (
            <div
              key={quest.id}
              className="hud-glass-panel"
              style={{
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: quest.completed
                  ? 'rgba(13, 17, 23, 0.5)'
                  : isCompleting
                  ? 'rgba(255, 107, 43, 0.15)'
                  : 'rgba(19, 26, 36, 0.75)',
                border: quest.completed
                  ? '1px solid rgba(255, 255, 255, 0.06)'
                  : isCompleting
                  ? '1px solid #FF6B2B'
                  : '1px solid var(--border-subtle)',
                opacity: quest.completed ? 0.7 : 1,
                boxShadow: isCompleting ? '0 0 24px rgba(255, 107, 43, 0.35)' : 'none',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s ease'
              }}
            >
              {/* Floating XP / Ember Particles on Complete */}
              {isCompleting && (
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 18,
                    display: 'flex',
                    gap: 8,
                    animation: 'slideUp 0.6s ease',
                    zIndex: 10
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 14,
                      color: '#38BDF8',
                      textShadow: '0 0 10px #38BDF8'
                    }}
                  >
                    +{completingFeedback.xpGain} XP
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 14,
                      color: '#FF9E40',
                      textShadow: '0 0 10px #FF9E40'
                    }}
                  >
                    +{completingFeedback.emberGain} EMBERS
                  </span>
                </div>
              )}

              <div>
                {/* Header Pills */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className={attrClass}>{quest.attribute}</span>
                    <span
                      style={{
                        padding: '2px 8px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderRadius: 'var(--radius-xs)',
                        fontSize: 10,
                        fontFamily: 'var(--font-display)',
                        color: 'var(--text-muted)',
                        fontWeight: 700
                      }}
                    >
                      {quest.category}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: 11,
                      fontFamily: 'var(--font-display)',
                      color: quest.difficulty === 'Legendary' ? '#FF6B2B' : 'var(--text-muted)',
                      fontWeight: 700
                    }}
                  >
                    {quest.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    marginBottom: 8,
                    textDecoration: quest.completed ? 'line-through' : 'none',
                    color: quest.completed ? 'var(--text-secondary)' : 'var(--text-primary)'
                  }}
                >
                  {quest.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 20 }}>
                  {quest.description}
                </p>
              </div>

              <div>
                {/* Rewards & Attribute Boost */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: 16
                  }}
                >
                  <div style={{ display: 'flex', gap: 12, fontSize: 12, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                    <span style={{ color: '#38BDF8' }}>+{quest.xp} XP</span>
                    <span style={{ color: '#FF9E40' }}>+{quest.embers} EMBERS</span>
                  </div>
                  <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>
                    +{2} {quest.attribute}
                  </div>
                </div>

                {/* Bottom Action */}
                {quest.completed ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      padding: '10px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#34D399',
                      fontFamily: 'var(--font-display)',
                      fontSize: 12,
                      fontWeight: 700
                    }}
                  >
                    <CheckCircle2 size={16} />
                    <span>COMPLETED {quest.completedAt || 'TODAY'}</span>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 10 }}>
                    <button
                      onClick={() => sound.playClick()}
                      className="btn-ghost"
                      style={{ padding: '8px 12px', fontSize: 12, justifyContent: 'center' }}
                    >
                      <Play size={13} />
                      START
                    </button>
                    <button
                      onClick={() => completeQuest(quest.id)}
                      className="btn-ember"
                      style={{ padding: '8px 12px', fontSize: 12, justifyContent: 'center' }}
                    >
                      <Check size={14} />
                      COMPLETE
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quest Create Modal */}
      <QuestCreateModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />
    </div>
  );
};
