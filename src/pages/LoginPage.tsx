import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('atharv4707@gmail.com');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    if (!email || !password) {
      setError('Please provide valid credentials.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      sound.playQuestComplete();
      navigate('/home');
    }, 700);
  };

  const handleGuestLogin = () => {
    sound.playClick();
    navigate('/home');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'var(--bg-void)'
      }}
      className="auth-split-layout"
    >
      {/* Left Column: Atmospheric Realm Visual */}
      <div
        style={{
          position: 'relative',
          padding: '60px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `
            linear-gradient(180deg, rgba(7, 9, 14, 0.65) 0%, rgba(7, 9, 14, 0.95) 100%),
            url('https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80') center/cover no-repeat
          `,
          borderRight: '1px solid var(--border-subtle)'
        }}
        className="auth-left-pane"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #FF6B2B, #FF9E40)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(255, 107, 43, 0.4)'
            }}
          >
            <Flame size={22} color="#07090E" />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#F8FAFC' }}>
              ASHKEEPER
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.14em' }}>
              REAL-TIME RPG
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 460 }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.16em',
              color: '#FF9E40',
              marginBottom: 12
            }}
          >
            RESUME PROTOCOL
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 38,
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16
            }}
          >
            "Your world has been waiting."
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
            The Forge remains warm. Re-align with your active quests, fuel your combo flame, and explore newly unlocked territories.
          </p>
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
          SECURE QUANTUM SESSION // READY
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40
        }}
      >
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>WELCOME BACK</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Need to create a new character?{' '}
              <Link to="/signup" style={{ color: '#FF9E40', fontWeight: 600 }}>
                Sign Up
              </Link>
            </p>
          </div>

          {error && (
            <div
              style={{
                padding: '12px 16px',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: 'var(--radius-sm)',
                color: '#FCA5A5',
                fontSize: 13,
                marginBottom: 20
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--text-secondary)',
                  marginBottom: 6
                }}
              >
                EMAIL
              </label>
              <input
                type="email"
                className="hud-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: 'var(--text-secondary)'
                  }}
                >
                  PASSWORD
                </label>
                <span style={{ fontSize: 11, color: '#FF9E40', cursor: 'pointer' }}>
                  Reset key?
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="hud-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-ember"
              style={{
                width: '100%',
                padding: '14px',
                marginTop: 8,
                fontSize: 14
              }}
            >
              {isLoading ? 'ACCESSING VESSEL...' : 'ENTER REALM'}
            </button>
          </form>

          <div
            style={{
              margin: '28px 0',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
            <span style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          </div>

          <button
            onClick={handleGuestLogin}
            className="btn-ghost"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: 13
            }}
          >
            ENTER AS DEMO PLAYER (ATHARV LV. 07)
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .auth-split-layout {
            grid-template-columns: 1fr !important;
          }
          .auth-left-pane {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
