import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Eye, EyeOff, Check, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { ApiClientError } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();

    if (!name.trim()) {
      setError('Please enter your character name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await signup(name.trim(), email.trim(), password);
      setIsSuccess(true);
      sound.playQuestComplete();
      setTimeout(() => {
        navigate('/home', { replace: true });
      }, 1200);
    } catch (err) {
      const message = err instanceof ApiClientError ? err.message : 'Unable to reach the AshKeeper backend.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
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
      {/* Left Column: Atmospheric Lore */}
      <div
        style={{
          position: 'relative',
          padding: '60px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: `
            linear-gradient(180deg, rgba(7, 9, 14, 0.6) 0%, rgba(7, 9, 14, 0.95) 100%),
            url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80') center/cover no-repeat
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
              YOUR LIFE IS THE QUEST
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
            BEGIN YOUR JOURNEY
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
            "Small steps. <br />Big future."
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6 }}>
            Forge your digital vessel. Every quest logged here becomes measurable biological and cognitive evolution.
          </p>
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
          VERSION 2.4.0 // SECURE PROTOCOL
        </div>
      </div>

      {/* Right Column: Sign Up Form */}
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
            <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8 }}>IGNITE YOUR EMBERS</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Already registered in the Keep?{' '}
              <Link to="/login" style={{ color: '#FF9E40', fontWeight: 600 }}>
                Sign In
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

          {isSuccess && (
            <div
              style={{
                padding: '16px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: 'var(--radius-sm)',
                color: '#6EE7B7',
                fontSize: 14,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}
            >
              <Check size={18} />
              <span>Vessel created! Synchronizing Life DNA...</span>
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
                CHARACTER / USERNAME
              </label>
              <input
                type="text"
                className="hud-input"
                placeholder="e.g. Atharv"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

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
                SECURE EMAIL
              </label>
              <input
                type="email"
                className="hud-input"
                placeholder="you@domain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

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
                PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="hud-input"
                  placeholder="Min 6 characters"
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
                CONFIRM PASSWORD
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="hud-input"
                placeholder="Re-type password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="btn-ember"
              style={{
                width: '100%',
                padding: '14px',
                marginTop: 8,
                fontSize: 14
              }}
            >
              {isLoading ? 'INITIALIZING VESSEL...' : 'CREATE VESSEL'}
            </button>
          </form>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button
              onClick={() => {
                sound.playClick();
                navigate('/home');
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 12,
                color: 'var(--text-muted)',
                letterSpacing: '0.06em'
              }}
            >
              Skip as Demo Character →
            </button>
          </div>
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
