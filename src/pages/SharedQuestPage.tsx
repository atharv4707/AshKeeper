import React from 'react';
import {
  Users,
  Sparkles,
  Flame,
  CheckCircle2,
  Trophy,
  Play,
  ArrowRight,
  Shield,
  Zap
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

export const SharedQuestPage: React.FC = () => {
  const { sharedQuest, contributeSharedQuest, joinSharedQuest } = useGame();

  const handleContribute = () => {
    contributeSharedQuest();
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
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
          COOPERATIVE CAMPAIGN
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>SHARED EXPEDITION</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Unified real-life discipline missions with your party members.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 24,
          alignItems: 'start'
        }}
        className="shared-quest-layout"
      >
        {/* Main Mission Card */}
        <div
          className="hud-glass-panel"
          style={{
            padding: 32,
            background: 'linear-gradient(180deg, rgba(19, 26, 36, 0.9) 0%, rgba(13, 17, 23, 0.95) 100%)',
            border: '1px solid rgba(255, 107, 43, 0.35)',
            boxShadow: '0 0 30px rgba(255, 107, 43, 0.12)'
          }}
        >
          {/* Badge & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span className="pill-craft">CO-OP EXPEDITION</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              DAY {sharedQuest.currentDay} OF {sharedQuest.targetDays}
            </span>
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>{sharedQuest.title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            {sharedQuest.description}
          </p>

          {/* Core Objective Banner */}
          <div
            style={{
              padding: '16px 20px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: 28
            }}
          >
            <div style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 800, marginBottom: 4 }}>
              OPERATIONAL DIRECTIVE
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC' }}>
              "{sharedQuest.objective}"
            </div>
          </div>

          {/* Combined Progress Bar */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 800, color: 'var(--text-secondary)' }}>
                PARTY EXPEDITION PROGRESS
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#FF9E40' }}>
                {sharedQuest.progressPercent}%
              </span>
            </div>
            <div
              style={{
                height: 12,
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${sharedQuest.progressPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #FF6B2B 0%, #FFA84A 100%)',
                  boxShadow: '0 0 12px rgba(255, 107, 43, 0.6)',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>

          {/* Action Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={handleContribute}
              className="btn-ember"
              style={{ padding: '12px 24px', fontSize: 14 }}
            >
              <Zap size={16} />
              SUBMIT TODAY'S SPRINT CONTRIBUTION (+8%)
            </button>
          </div>
        </div>

        {/* Right Column: Party Members & Pool Rewards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Rewards Card */}
          <div
            className="hud-glass-panel"
            style={{
              padding: 24,
              background: 'rgba(255, 107, 43, 0.06)',
              border: '1px solid rgba(255, 107, 43, 0.3)'
            }}
          >
            <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: '#FF9E40', fontWeight: 800, marginBottom: 6 }}>
              EXPEDITION COMPLETION BOUNTY
            </div>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#38BDF8' }}>
                  +{sharedQuest.rewards.xp} XP
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>To all members</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: '#FF9E40' }}>
                  +{sharedQuest.rewards.embers} EMBERS
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Direct harvest</div>
              </div>
            </div>
          </div>

          {/* Party Member Contributions */}
          <div
            className="hud-glass-panel"
            style={{
              padding: 24,
              background: 'rgba(19, 26, 36, 0.85)'
            }}
          >
            <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 800, marginBottom: 16 }}>
              PARTY TELEMETRY (3 PLAYERS)
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {sharedQuest.players.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img
                      src={p.avatar}
                      alt={p.name}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 'var(--radius-full)',
                        objectFit: 'cover',
                        border: '1px solid #FF6B2B'
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{p.name}</div>
                      <div style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>
                        LV. 0{p.level} • {p.archetype}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: '#FF9E40' }}>
                      {p.contribution}%
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Deliberate</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .shared-quest-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
