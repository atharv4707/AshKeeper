import React, { useState } from 'react';
import {
  Settings,
  Volume2,
  VolumeX,
  Eye,
  RotateCcw,
  Check,
  Bell,
  Shield,
  User as UserIcon,
  Sparkles,
  LogOut
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';
import { useNavigate } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    soundEnabled,
    toggleSound,
    reducedMotion,
    toggleReducedMotion,
    resetProgress
  } = useGame();

  const [resetConfirmed, setResetConfirmed] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleTestSound = (type: 'quest' | 'level' | 'purchase') => {
    if (type === 'quest') sound.playQuestComplete();
    if (type === 'level') sound.playLevelUp();
    if (type === 'purchase') sound.playPurchase();
  };

  const handleReset = () => {
    resetProgress();
    setResetConfirmed(true);
    setTimeout(() => {
      setResetConfirmed(false);
    }, 2500);
  };

  const handleLogout = () => {
    sound.playClick();
    navigate('/login');
  };

  return (
    <div style={{ paddingBottom: 60, maxWidth: 840 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
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
          VESSEL CONFIGURATION
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>SETTINGS</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Fine-tune audio cues, interface performance, and telemetry preferences.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Audio Microinteractions Settings */}
        <div
          className="hud-glass-panel"
          style={{
            padding: 24,
            background: 'rgba(19, 26, 36, 0.85)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Volume2 size={18} color="#FF9E40" />
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>HAPTIC & AUDIO SYNTHESIS</h3>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                Real-time Web Audio API synthesized harmonics for quest completions and level ups.
              </p>
            </div>

            <button
              onClick={toggleSound}
              className={soundEnabled ? 'btn-ember' : 'btn-ghost'}
              style={{ padding: '8px 16px', fontSize: 12 }}
            >
              {soundEnabled ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          {/* Test Sound Samples */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', alignSelf: 'center' }}>
              TEST HARMONICS:
            </span>
            <button onClick={() => handleTestSound('quest')} className="btn-ghost" style={{ fontSize: 11, padding: '6px 12px' }}>
              Quest Bell
            </button>
            <button onClick={() => handleTestSound('purchase')} className="btn-ghost" style={{ fontSize: 11, padding: '6px 12px' }}>
              Ember Clink
            </button>
            <button onClick={() => handleTestSound('level')} className="btn-ghost" style={{ fontSize: 11, padding: '6px 12px' }}>
              Level Up Fanfare
            </button>
          </div>
        </div>

        {/* Visual & Motion Performance */}
        <div
          className="hud-glass-panel"
          style={{
            padding: 24,
            background: 'rgba(19, 26, 36, 0.85)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={18} color="#38BDF8" />
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>REDUCED MOTION</h3>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                Minimize confetti particle bursts and holographic radar sweeps for accessibility.
              </p>
            </div>

            <button
              onClick={toggleReducedMotion}
              className={reducedMotion ? 'btn-ember' : 'btn-ghost'}
              style={{ padding: '8px 16px', fontSize: 12 }}
            >
              {reducedMotion ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* User Identity Profile */}
        <div
          className="hud-glass-panel"
          style={{
            padding: 24,
            background: 'rgba(19, 26, 36, 0.85)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{
                width: 56,
                height: 56,
                borderRadius: 'var(--radius-full)',
                objectFit: 'cover',
                border: '2px solid #FF6B2B'
              }}
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{user.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
                {user.email} • Level {user.level} {user.title}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <button
              onClick={handleLogout}
              className="btn-ghost"
              style={{ justifyContent: 'center', fontSize: 12 }}
            >
              <LogOut size={14} />
              LOGOUT / SWITCH VESSEL
            </button>

            <button
              onClick={handleReset}
              className="btn-ghost"
              style={{
                justifyContent: 'center',
                fontSize: 12,
                color: '#EF4444',
                borderColor: 'rgba(239, 68, 68, 0.3)'
              }}
            >
              <RotateCcw size={14} />
              {resetConfirmed ? 'DEMO DATA RESET!' : 'RESET DEMO PROGRESSION'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
