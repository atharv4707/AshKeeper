import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ArrowRight, Sparkles, Shield, Cpu, BookOpen, Activity, Compass } from 'lucide-react';
import { LifeDNAVisualizer } from '../components/LifeDNAVisualizer';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/sound';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { attributes } = useGame();

  const handleStart = () => {
    sound.playClick();
    navigate('/home');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-void)', overflowX: 'hidden' }}>
      {/* Cinematic Top Navigation */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(7, 9, 14, 0.75)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
          zIndex: 100
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #FF6B2B 0%, #FF9E40 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(255, 107, 43, 0.4)'
            }}
          >
            <Flame size={20} color="#07090E" />
          </div>
          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 18,
                letterSpacing: '0.14em',
                color: 'var(--text-primary)'
              }}
            >
              ASHKEEPER
            </span>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a
            href="#pillars"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--text-secondary)'
            }}
          >
            SYSTEM ARCHITECTURE
          </a>
          <a
            href="#lifedna"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--text-secondary)'
            }}
          >
            LIFE DNA
          </a>
          <a
            href="#realms"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--text-secondary)'
            }}
          >
            REALMS
          </a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => {
              sound.playClick();
              navigate('/login');
            }}
            className="btn-ghost"
            style={{ fontSize: 12, padding: '8px 16px' }}
          >
            ENTER WORLD
          </button>
          <button onClick={handleStart} className="btn-ember" style={{ fontSize: 12, padding: '8px 18px' }}>
            BEGIN YOUR JOURNEY
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          paddingTop: 120,
          paddingBottom: 80,
          display: 'flex',
          alignItems: 'center',
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(255, 107, 43, 0.12), transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(56, 189, 248, 0.08), transparent 50%),
            url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1800&auto=format&fit=crop&q=80') center/cover no-repeat
          `,
          backgroundBlendMode: 'screen'
        }}
      >
        {/* Dark Cinematic Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(7, 9, 14, 0.7) 0%, rgba(7, 9, 14, 0.95) 85%, #07090E 100%)',
            pointerEvents: 'none'
          }}
        />

        <div className="app-container" style={{ position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: 60,
              alignItems: 'center'
            }}
          >
            {/* Left Column: Hero Text */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 14px',
                  background: 'rgba(255, 107, 43, 0.12)',
                  border: '1px solid rgba(255, 107, 43, 0.35)',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: 24
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#FF6B2B',
                    boxShadow: '0 0 8px #FF6B2B'
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    color: '#FF9E40'
                  }}
                >
                  THE REAL-LIFE ACTION RPG
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(42px, 6vw, 68px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  marginBottom: 20
                }}
              >
                YOUR LIFE <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FF6B2B 0%, #FFA84A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(255, 107, 43, 0.4)'
                  }}
                >
                  IS THE QUEST.
                </span>
              </h1>

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#FF9E40',
                  marginBottom: 16
                }}
              >
                CODE. TRAIN. LEARN. BUILD.
              </div>

              <p
                style={{
                  fontSize: 17,
                  color: 'var(--text-secondary)',
                  maxWidth: 520,
                  lineHeight: 1.7,
                  marginBottom: 36
                }}
              >
                Every physical action leaves an indelible mark. Ashkeeper transforms your daily discipline into character evolution, shifting your organic Life DNA and unlocking living realms.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <button
                  onClick={handleStart}
                  className="btn-ember"
                  style={{ padding: '14px 32px', fontSize: 14 }}
                >
                  BEGIN YOUR JOURNEY
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    navigate('/signup');
                  }}
                  className="btn-ghost"
                  style={{ padding: '14px 24px', fontSize: 14 }}
                >
                  CREATE ACCOUNT
                </button>
              </div>

              {/* 4 Cardinal Pillars Badges */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 12,
                  marginTop: 48,
                  paddingTop: 32,
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ borderLeft: '2px solid #FF6B2B', paddingLeft: 10 }}>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 700 }}>
                    CRAFT
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#FF9E40' }}>Coding & Build</div>
                </div>
                <div style={{ borderLeft: '2px solid #38BDF8', paddingLeft: 10 }}>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 700 }}>
                    FOCUS
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#38BDF8' }}>Deep Study</div>
                </div>
                <div style={{ borderLeft: '2px solid #10B981', paddingLeft: 10 }}>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 700 }}>
                    VIGOR
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#34D399' }}>Physical Training</div>
                </div>
                <div style={{ borderLeft: '2px solid #A855F7', paddingLeft: 10 }}>
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 700 }}>
                    WILL
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#C084FC' }}>Iron Discipline</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Animated Ash Core */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                className="hud-glass-panel"
                style={{
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'rgba(19, 26, 36, 0.65)',
                  boxShadow: '0 0 50px rgba(0,0,0,0.8), 0 0 30px rgba(255, 107, 43, 0.15)'
                }}
              >
                <LifeDNAVisualizer attributes={attributes} size="hero" />

                <div style={{ textAlign: 'center', marginTop: 14 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      color: '#FF9E40',
                      marginBottom: 4
                    }}
                  >
                    ADAPTIVE ASH CORE
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Morphs mathematically in real-time as your real-world habit ratio shifts.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: REAL LIFE BECOMES THE QUEST */}
      <section id="pillars" style={{ padding: '100px 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="app-container">
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 60px' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.16em',
                color: '#FF9E40',
                marginBottom: 10
              }}
            >
              SYSTEM ARCHITECTURE
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>
              REAL LIFE BECOMES THE QUEST
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
              Every habit feeds an ancient resonance loop. No artificial grinding — your actual discipline fuels the engine.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
            {/* Coding -> Craft */}
            <div
              className="hud-glass-panel"
              style={{
                padding: 28,
                borderTop: '3px solid #FF6B2B',
                background: 'rgba(16, 22, 32, 0.7)'
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 107, 43, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20
                }}
              >
                <Cpu size={22} color="#FF9E40" />
              </div>
              <h3 style={{ fontSize: 18, marginBottom: 10 }}>CODING & CRAFT</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                Building software, architectural prototypes, creative design. Elevates your Craft attribute and unlocks technological ancient relics.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="pill-craft">ACTION → CRAFT</span>
                <span style={{ fontSize: 12, color: '#FF9E40', fontWeight: 700 }}>+60 XP</span>
              </div>
            </div>

            {/* Study -> Focus */}
            <div
              className="hud-glass-panel"
              style={{
                padding: 28,
                borderTop: '3px solid #38BDF8',
                background: 'rgba(16, 22, 32, 0.7)'
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(56, 189, 248, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20
                }}
              >
                <BookOpen size={22} color="#38BDF8" />
              </div>
              <h3 style={{ fontSize: 18, marginBottom: 10 }}>STUDY & FOCUS</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                Operating systems, deep academic reading, algorithmic mastery. Fuels your Focus attribute and expands Archive realm visions.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="pill-focus">ACTION → FOCUS</span>
                <span style={{ fontSize: 12, color: '#38BDF8', fontWeight: 700 }}>+50 XP</span>
              </div>
            </div>

            {/* Training -> Vigor */}
            <div
              className="hud-glass-panel"
              style={{
                padding: 28,
                borderTop: '3px solid #10B981',
                background: 'rgba(16, 22, 32, 0.7)'
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20
                }}
              >
                <Activity size={22} color="#34D399" />
              </div>
              <h3 style={{ fontSize: 18, marginBottom: 10 }}>TRAINING & VIGOR</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                Heavy lifting, endurance circuits, tactical mobility. Fortifies Vigor and fuels your character’s physiological resilience.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="pill-vigor">ACTION → VIGOR</span>
                <span style={{ fontSize: 12, color: '#34D399', fontWeight: 700 }}>+40 XP</span>
              </div>
            </div>

            {/* Habits -> Will */}
            <div
              className="hud-glass-panel"
              style={{
                padding: 28,
                borderTop: '3px solid #A855F7',
                background: 'rgba(16, 22, 32, 0.7)'
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(168, 85, 247, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20
                }}
              >
                <Shield size={22} color="#C084FC" />
              </div>
              <h3 style={{ fontSize: 18, marginBottom: 10 }}>HABITS & WILL</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                Cold showers, meditation, digital detox, dawn wakeups. Solidifies Willpower, defending your Combo streak against decay.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="pill-will">ACTION → WILL</span>
                <span style={{ fontSize: 12, color: '#C084FC', fontWeight: 700 }}>+30 XP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIFE DNA DIFFERENCE */}
      <section id="lifedna" style={{ padding: '100px 0', background: 'rgba(13, 17, 23, 0.5)' }}>
        <div className="app-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                  color: '#38BDF8',
                  marginBottom: 10
                }}
              >
                PROPRIETARY TECHNOLOGY
              </div>
              <h2 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
                NO TWO PLAYERS EVOLVE THE SAME WAY.
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
                Conventional tools force rigid checklists. Ashkeeper's Life DNA dynamically computes your multidimensional vector field. As you build code, read dense theory, hit personal records, and wake at dawn, your holographic core shifts geometry and color density.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF9E40' }} />
                  <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                    <strong>The Builder:</strong> High Craft & Focus focus archetype
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#38BDF8' }} />
                  <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                    <strong>The Scholar:</strong> Deep analytical mastery and memory
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399' }} />
                  <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                    <strong>The Warrior:</strong> Relentless kinetic and physical discipline
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C084FC' }} />
                  <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                    <strong>The Balanced:</strong> Equal equilibrium across all 4 pillars
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 32 }}>
                <button
                  onClick={() => {
                    sound.playClick();
                    navigate('/character');
                  }}
                  className="btn-ghost"
                >
                  INSPECT YOUR ARCHETYPE
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                className="hud-glass-panel"
                style={{
                  padding: 32,
                  textAlign: 'center',
                  background: 'rgba(16, 22, 32, 0.85)',
                  boxShadow: '0 0 40px rgba(56, 189, 248, 0.1)'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                    marginBottom: 16
                  }}
                >
                  LIVE DNA RADAR // ATHARV LV.07
                </div>
                <LifeDNAVisualizer attributes={attributes} size="lg" />
                <div
                  style={{
                    marginTop: 20,
                    padding: '8px 16px',
                    background: 'rgba(255, 107, 43, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#FF9E40'
                  }}
                >
                  CURRENT ARCHETYPE: THE BUILDER
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE LIVING WORLD */}
      <section id="realms" style={{ padding: '100px 0' }}>
        <div className="app-container">
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 60px' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.16em',
                color: '#10B981',
                marginBottom: 10
              }}
            >
              EXPANSIVE MAP
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>
              THE WORLD CHANGES WITH YOU
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
              Realms stay sealed in cosmic mist until your real-world level reaches the convergence threshold.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {/* The Keep */}
            <div
              className="hud-glass-panel"
              style={{
                overflow: 'hidden',
                background: 'rgba(16, 22, 32, 0.8)'
              }}
            >
              <div style={{ height: 160, position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80"
                  alt="The Keep"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-xs)',
                    background: 'rgba(16, 185, 129, 0.25)',
                    border: '1px solid #10B981',
                    fontFamily: 'var(--font-display)',
                    fontSize: 10,
                    fontWeight: 800,
                    color: '#34D399'
                  }}
                >
                  UNLOCKED // LV. 1
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 18, marginBottom: 6 }}>THE KEEP</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
                  The primordial citadel where all keepers ignite their first spark.
                </p>
                <span className="pill-craft">COMMON REALM</span>
              </div>
            </div>

            {/* The Forge */}
            <div
              className="hud-glass-panel"
              style={{
                overflow: 'hidden',
                background: 'rgba(16, 22, 32, 0.8)'
              }}
            >
              <div style={{ height: 160, position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=700&auto=format&fit=crop&q=80"
                  alt="The Forge"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-xs)',
                    background: 'rgba(16, 185, 129, 0.25)',
                    border: '1px solid #10B981',
                    fontFamily: 'var(--font-display)',
                    fontSize: 10,
                    fontWeight: 800,
                    color: '#34D399'
                  }}
                >
                  UNLOCKED // LV. 3
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 18, marginBottom: 6 }}>THE FORGE</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
                  Volcanic magma assembly docks where code and inventions are hammered into existence.
                </p>
                <span className="pill-craft">CRAFT SANCTUARY</span>
              </div>
            </div>

            {/* The Temple */}
            <div
              className="hud-glass-panel"
              style={{
                overflow: 'hidden',
                background: 'rgba(16, 22, 32, 0.8)'
              }}
            >
              <div style={{ height: 160, position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=700&auto=format&fit=crop&q=80"
                  alt="The Temple"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.7) brightness(0.6)' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-xs)',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.6)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 10,
                    fontWeight: 800,
                    color: '#FCA5A5'
                  }}
                >
                  SEALED // LV. 8 REQUIRED
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 18, marginBottom: 6 }}>THE TEMPLE</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
                  Jagged alpine peaks where the outer bounds of endurance and athletic resilience are tested.
                </p>
                <span className="pill-vigor">VIGOR DOMAIN</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          padding: '120px 0',
          textAlign: 'center',
          background: 'linear-gradient(180deg, var(--bg-void) 0%, rgba(255, 107, 43, 0.08) 50%, var(--bg-void) 100%)',
          borderTop: '1px solid var(--border-subtle)'
        }}
      >
        <div className="app-container" style={{ maxWidth: 720 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 5vw, 54px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: 16
            }}
          >
            YOUR STORY STARTS WITH ONE ACTION.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 18, marginBottom: 36 }}>
            Step onto the map. Convert your hours into unyielding legacy.
          </p>
          <button
            onClick={handleStart}
            className="btn-ember"
            style={{ padding: '16px 40px', fontSize: 15 }}
          >
            ENTER ASHKEEPER
          </button>
        </div>
      </section>
    </div>
  );
};
