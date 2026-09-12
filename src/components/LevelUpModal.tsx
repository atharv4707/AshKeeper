import React from 'react';
import { Sparkles, Trophy, ArrowRight, ShieldAlert } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { LifeDNAVisualizer } from './LifeDNAVisualizer';

export const LevelUpModal: React.FC = () => {
  const { levelUpInfo, closeLevelUpModal, attributes } = useGame();

  if (!levelUpInfo) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        zIndex: 2000,
        background: 'rgba(4, 6, 10, 0.94)',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      <div
        className="hud-glass-panel"
        style={{
          width: '90%',
          maxWidth: 520,
          padding: '40px 32px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, rgba(22, 31, 44, 0.95) 0%, rgba(13, 17, 23, 0.98) 100%)',
          border: '1px solid rgba(255, 107, 43, 0.5)',
          boxShadow: '0 0 60px rgba(255, 107, 43, 0.3), inset 0 0 30px rgba(255, 107, 43, 0.15)',
          borderRadius: 'var(--radius-xl)',
          position: 'relative'
        }}
      >
        {/* Expanded Ash Core Visual in Background/Center */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <LifeDNAVisualizer attributes={attributes} size="md" showLabels={false} />
        </div>

        {/* Small Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255, 107, 43, 0.15)',
            border: '1px solid rgba(255, 107, 43, 0.4)',
            padding: '4px 14px',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.16em',
            color: '#FF9E40',
            marginBottom: 16
          }}
        >
          <Sparkles size={14} />
          CONVERGENCE ACHIEVED
        </div>

        {/* Big Title */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 38,
            fontWeight: 800,
            letterSpacing: '0.04em',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #FFE3D1 50%, #FF9E40 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 12
          }}
        >
          LEVEL UP
        </h2>

        {/* Transition Numbers */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 28
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--text-muted)'
            }}
          >
            {levelUpInfo.oldLevel < 10 ? `0${levelUpInfo.oldLevel}` : levelUpInfo.oldLevel}
          </span>
          <ArrowRight size={24} color="#FF6B2B" />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 38,
              fontWeight: 800,
              color: '#FF9E40',
              textShadow: '0 0 16px rgba(255, 107, 43, 0.6)'
            }}
          >
            {levelUpInfo.newLevel < 10 ? `0${levelUpInfo.newLevel}` : levelUpInfo.newLevel}
          </span>
        </div>

        {/* New Unlock Notification */}
        {levelUpInfo.unlockedRealmName && (
          <div
            style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 20px',
              marginBottom: 28,
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: 14
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(56, 189, 248, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Trophy size={18} color="#38BDF8" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#38BDF8'
                }}
              >
                NEW REALM UNLOCKED
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#F8FAFC'
                }}
              >
                {levelUpInfo.unlockedRealmName}
              </div>
            </div>
          </div>
        )}

        {/* Stat Growth Summary */}
        <p
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            marginBottom: 28,
            lineHeight: 1.6
          }}
        >
          Your physical and mental discipline has manifested tangible power. The Ash Core expands, unveiling deeper dimensions of the living world.
        </p>

        {/* Continue Button */}
        <button
          onClick={closeLevelUpModal}
          className="btn-ember"
          style={{
            width: '100%',
            padding: '14px 28px',
            fontSize: 15
          }}
        >
          CONTINUE YOUR JOURNEY
        </button>
      </div>
    </div>
  );
};
