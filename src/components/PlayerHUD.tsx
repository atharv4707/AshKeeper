import React from 'react';
import { Flame, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

export const PlayerHUD: React.FC = () => {
  const { user, soundEnabled, toggleSound } = useGame();
  const xpPercent = Math.min(100, Math.round((user.xp / user.xpMax) * 100));

  return (
    <header
      className="player-hud"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 80,
        height: 56,
        background: 'rgba(7, 9, 14, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        width: '100%'
      }}
    >
      {/* Left: Quick System Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--text-muted)'
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#FF6B2B',
              boxShadow: '0 0 8px #FF6B2B',
              display: 'inline-block'
            }}
          />
          <span style={{ color: 'var(--text-secondary)' }}>ASHKEEPER // REAL-TIME RPG</span>
        </div>
      </div>

      {/* Right: Global Telemetry HUD */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Level Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255, 107, 43, 0.1)',
            border: '1px solid rgba(255, 107, 43, 0.3)',
            padding: '3px 10px',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#FF9E40'
            }}
          >
            LV.
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 800,
              color: '#F8FAFC'
            }}
          >
            {user.level < 10 ? `0${user.level}` : user.level}
          </span>
        </div>

        {/* XP Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 160 }}>
          <div
            style={{
              flex: 1,
              height: 6,
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: `${xpPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #FF6B2B, #FF9E40)',
                borderRadius: 'var(--radius-full)',
                boxShadow: '0 0 8px rgba(255, 107, 43, 0.6)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap'
            }}
          >
            {user.xp} <span style={{ color: 'var(--text-muted)' }}>/ {user.xpMax} XP</span>
          </div>
        </div>

        {/* Embers Currency */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255, 158, 64, 0.08)',
            border: '1px solid rgba(255, 158, 64, 0.25)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <Sparkles size={14} color="#FF9E40" />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 800,
              color: '#F8FAFC'
            }}
          >
            {user.embers}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#FF9E40'
            }}
          >
            EMBERS
          </span>
        </div>

        {/* Today's Combo Flame */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255, 107, 43, 0.15)',
            border: '1px solid rgba(255, 107, 43, 0.4)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-sm)',
            boxShadow: '0 0 14px rgba(255, 107, 43, 0.2)'
          }}
        >
          <Flame size={15} color="#FF6B2B" className="animate-flame" />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 800,
              color: '#F8FAFC'
            }}
          >
            {user.combo}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#FF9E40'
            }}
          >
            COMBO
          </span>
        </div>

        {/* Audio SFX Toggle */}
        <button
          onClick={() => {
            toggleSound();
          }}
          title={soundEnabled ? 'Mute Game Audio' : 'Unmute Game Audio'}
          style={{
            width: 30,
            height: 30,
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            color: soundEnabled ? '#FF9E40' : 'var(--text-muted)'
          }}
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .player-hud {
            padding: 0 12px !important;
          }
          .player-hud > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
