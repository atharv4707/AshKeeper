import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Lock,
  Sparkles,
  Award,
  Gem,
  Cpu
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

export const AchievementsPage: React.FC = () => {
  const { achievements, user } = useGame();
  const [filter, setFilter] = useState<'ALL' | 'Progression' | 'Consistency' | 'Mastery' | 'Attributes'>('ALL');

  const filtered = achievements.filter(a => {
    if (filter === 'ALL') return true;
    return a.category === filter;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Header */}
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
            DISCIPLINE MILESTONES
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>TROPHY ROOM</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            Commemorate monumental breakthroughs in your real-world journey.
          </p>
        </div>

        <div
          style={{
            padding: '10px 18px',
            background: 'rgba(255, 107, 43, 0.1)',
            border: '1px solid rgba(255, 107, 43, 0.35)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            fontWeight: 800,
            color: '#FF9E40'
          }}
        >
          CLAIMED MILESTONES: {unlockedCount} / {achievements.length}
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 24,
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 12,
          overflowX: 'auto'
        }}
      >
        {(['ALL', 'Progression', 'Consistency', 'Mastery', 'Attributes'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => {
              sound.playClick();
              setFilter(tab);
            }}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 800,
              background: filter === tab ? 'rgba(255, 107, 43, 0.15)' : 'transparent',
              border: filter === tab ? '1px solid #FF6B2B' : '1px solid transparent',
              color: filter === tab ? '#FF9E40' : 'var(--text-secondary)'
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Achievements Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {filtered.map(ach => {
          const progressPercent = Math.min(100, Math.round((ach.progress / ach.maxProgress) * 100));

          return (
            <div
              key={ach.id}
              className="hud-glass-panel"
              style={{
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: ach.unlocked ? 'rgba(19, 26, 36, 0.85)' : 'rgba(13, 17, 23, 0.5)',
                border: ach.unlocked ? '1px solid rgba(255, 107, 43, 0.4)' : '1px solid var(--border-subtle)',
                boxShadow: ach.unlocked ? '0 0 20px rgba(255, 107, 43, 0.15)' : 'none',
                opacity: ach.unlocked ? 1 : 0.7
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 'var(--radius-sm)',
                      background: ach.unlocked ? 'rgba(255, 107, 43, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      border: ach.unlocked ? '1px solid #FF6B2B' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: ach.unlocked ? '0 0 14px rgba(255, 107, 43, 0.3)' : 'none'
                    }}
                  >
                    {ach.unlocked ? (
                      <Trophy size={20} color="#FF9E40" />
                    ) : (
                      <Lock size={18} color="var(--text-muted)" />
                    )}
                  </div>

                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: 'var(--font-display)',
                      color: ach.unlocked ? '#34D399' : 'var(--text-muted)',
                      fontWeight: 800
                    }}
                  >
                    {ach.unlocked ? 'UNLOCKED' : 'IN PROGRESS'}
                  </span>
                </div>

                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{ach.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                  {ach.description}
                </p>
              </div>

              <div>
                {/* Progress bar */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                    <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>PROGRESS</span>
                    <span style={{ fontWeight: 700, color: '#F8FAFC' }}>
                      {ach.progress} / {ach.maxProgress}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        background: ach.unlocked ? 'linear-gradient(90deg, #FF6B2B, #FF9E40)' : 'rgba(255,255,255,0.2)',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>

                {/* Bounty */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: 11,
                    fontFamily: 'var(--font-display)'
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>REWARD:</span>
                  <span style={{ color: '#FF9E40', fontWeight: 800 }}>+{ach.rewardEmbers} EMBERS</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
