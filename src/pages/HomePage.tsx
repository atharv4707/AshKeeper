import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Plus,
  Compass,
  Play,
  Check,
  TrendingUp,
  Award
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { LifeDNAVisualizer } from '../components/LifeDNAVisualizer';
import { QuestCreateModal } from '../components/QuestCreateModal';
import { sound } from '../utils/sound';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    attributes,
    quests,
    archetype,
    completeQuest,
    completingFeedback
  } = useGame();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedAttributeHover, setSelectedAttributeHover] = useState<string | null>(null);

  // Active uncompleted quests (limit to 4 for clean hub display)
  const activeQuests = quests.filter(q => !q.completed).slice(0, 4);

  const xpPercent = Math.min(100, Math.round((user.xp / user.xpMax) * 100));

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Top Banner / Breadcrumb Area */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
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
            COMMAND NEXUS // ACTIVE CYCLE
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>GAME HUB</h1>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setCreateModalOpen(true);
          }}
          className="btn-ember"
          style={{ fontSize: 13, padding: '10px 18px' }}
        >
          <Plus size={16} />
          ADD QUEST
        </button>
      </div>

      {/* THREE-COLUMN HERO DASHBOARD */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1.35fr 1fr',
          gap: 20,
          marginBottom: 32,
          alignItems: 'stretch'
        }}
        className="hub-tri-grid"
      >
        {/* LEFT COLUMN: Player Status & Greeting */}
        <div
          className="hud-glass-panel"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(19, 26, 36, 0.7) 0%, rgba(13, 17, 23, 0.9) 100%)'
          }}
        >
          <div>
            {/* Greeting */}
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 13,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.06em',
                  marginBottom: 4
                }}
              >
                GOOD MORNING, {user.name.toUpperCase()} 🍂
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em'
                }}
              >
                "Small steps. Big future."
              </div>
            </div>

            {/* Profile Bar Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 14px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                marginBottom: 20
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 'var(--radius-full)',
                  objectFit: 'cover',
                  border: '2px solid #FF6B2B',
                  boxShadow: '0 0 16px rgba(255, 107, 43, 0.4)'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>
                    {user.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 12,
                      color: '#FF9E40',
                      background: 'rgba(255, 107, 43, 0.15)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-xs)'
                    }}
                  >
                    LV. {user.level < 10 ? `0${user.level}` : user.level}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: archetype.color, fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                  "{archetype.name}"
                </div>
              </div>
            </div>

            {/* XP Progression Telemetry */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  XP PROGRESSION
                </span>
                <span style={{ color: '#F8FAFC', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  {user.xp} <span style={{ color: 'var(--text-muted)' }}>/ {user.xpMax} XP</span>
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${xpPercent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #FF6B2B, #FFA84A)',
                    boxShadow: '0 0 10px rgba(255, 107, 43, 0.6)',
                    transition: 'width 0.5s ease'
                  }}
                />
              </div>
            </div>

            {/* Embers Balance Banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(255, 158, 64, 0.06)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 158, 64, 0.25)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Sparkles size={18} color="#FF9E40" />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)' }}>
                  AVAILABLE EMBERS
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#FF9E40' }}>
                {user.embers}
              </span>
            </div>
          </div>

          <div style={{ paddingTop: 16 }}>
            <button
              onClick={() => {
                sound.playClick();
                navigate('/character');
              }}
              className="btn-ghost"
              style={{ width: '100%', fontSize: 12, padding: '10px' }}
            >
              VIEW CHARACTER PROFILE
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* CENTER COLUMN: LIFE DNA / ASH CORE VISUALIZER */}
        <div
          className="hud-glass-panel"
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            background: 'radial-gradient(ellipse at center, rgba(255, 107, 43, 0.08) 0%, rgba(13, 17, 23, 0.95) 75%)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 16,
              left: 20,
              fontFamily: 'var(--font-display)',
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: '0.14em',
              color: 'var(--text-muted)'
            }}
          >
            LIFE DNA // DYNAMIC ASH CORE
          </div>

          <LifeDNAVisualizer
            attributes={attributes}
            size="lg"
            onStatHover={stat => setSelectedAttributeHover(stat)}
          />

          <div
            style={{
              textAlign: 'center',
              marginTop: 10
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                fontWeight: 800,
                color: archetype.color,
                letterSpacing: '0.08em'
              }}
            >
              CURRENT ARCHETYPE: {archetype.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', maxWidth: 320, margin: '4px auto 0' }}>
              {selectedAttributeHover
                ? `Focusing on ${selectedAttributeHover} development.`
                : archetype.subtitle}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Combo Flame & Next Unlock */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}
        >
          {/* Today's Combo Flame */}
          <div
            className="hud-glass-panel"
            style={{
              padding: 20,
              background: 'linear-gradient(135deg, rgba(255, 107, 43, 0.12) 0%, rgba(13, 17, 23, 0.85) 100%)',
              border: '1px solid rgba(255, 107, 43, 0.35)',
              boxShadow: '0 0 24px rgba(255, 107, 43, 0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  color: '#FF9E40'
                }}
              >
                TODAY'S COMBO
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-muted)'
                }}
              >
                ACTIVE FLAME
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 107, 43, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(255, 107, 43, 0.3)'
                }}
              >
                <Flame size={26} color="#FF6B2B" className="animate-flame" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 32,
                    fontWeight: 800,
                    lineHeight: 1,
                    color: '#F8FAFC'
                  }}
                >
                  {user.combo} DAYS
                </div>
                <div style={{ fontSize: 11, color: '#FF9E40', fontWeight: 600 }}>
                  UNBROKEN STREAK
                </div>
              </div>
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              "Don't let it fade. Complete 1 more quest today to maintain momentum."
            </p>
          </div>

          {/* Next Unlock Preview */}
          <div
            className="hud-glass-panel"
            style={{
              flex: 1,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'relative',
                height: 110,
                backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(7, 9, 14, 0.3) 0%, rgba(13, 17, 23, 0.95) 100%)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  padding: '3px 8px',
                  background: 'rgba(7, 9, 14, 0.8)',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 10,
                  color: '#F8FAFC',
                  fontFamily: 'var(--font-display)'
                }}
              >
                <Lock size={12} color="#FF9E40" />
                <span>UNLOCK AT LV. 8</span>
              </div>
            </div>

            <div style={{ padding: '0 18px 18px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  marginBottom: 2
                }}
              >
                NEXT REALM DISCOVERY
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: 6
                }}
              >
                THE TEMPLE (VIGOR)
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
                Alpine high-altitude sanctuaries carved into jagged cliffs for kinetic conditioning.
              </p>

              <button
                onClick={() => {
                  sound.playClick();
                  navigate('/world');
                }}
                className="btn-ghost"
                style={{ width: '100%', fontSize: 11, padding: '8px' }}
              >
                INSPECT MAP COORDINATES
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE QUESTS SECTION */}
      <div style={{ marginTop: 24 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>ACTIVE QUESTS</h2>
            <span
              style={{
                fontSize: 12,
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700
              }}
            >
              ({activeQuests.length} READY)
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              navigate('/quests');
            }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 700,
              color: '#FF9E40',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            VIEW ALL QUESTS
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Quest Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {activeQuests.map(quest => {
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
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: isCompleting ? 'rgba(255, 107, 43, 0.15)' : 'rgba(19, 26, 36, 0.7)',
                  border: isCompleting ? '1px solid #FF6B2B' : '1px solid var(--border-subtle)',
                  boxShadow: isCompleting ? '0 0 24px rgba(255, 107, 43, 0.3)' : 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Floating Reward Numbers on Completion */}
                {isCompleting && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 16,
                      display: 'flex',
                      gap: 8,
                      animation: 'slideUp 0.6s ease'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 14,
                        color: '#38BDF8',
                        textShadow: '0 0 8px #38BDF8'
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
                        textShadow: '0 0 8px #FF9E40'
                      }}
                    >
                      +{completingFeedback.emberGain} EMBERS
                    </span>
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span className={attrClass}>{quest.attribute}</span>
                    <span
                      style={{
                        fontSize: 10,
                        fontFamily: 'var(--font-display)',
                        color: 'var(--text-muted)',
                        fontWeight: 700
                      }}
                    >
                      {quest.category} // {quest.difficulty.toUpperCase()}
                    </span>
                  </div>

                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>
                    {quest.title}
                  </h3>

                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                    {quest.description}
                  </p>
                </div>

                <div>
                  {/* Rewards Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 16,
                      fontSize: 12,
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700
                    }}
                  >
                    <span style={{ color: '#38BDF8' }}>+{quest.xp} XP</span>
                    <span style={{ color: 'var(--text-muted)' }}>•</span>
                    <span style={{ color: '#FF9E40' }}>+{quest.embers} EMBERS</span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 10 }}>
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
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quest Creation Modal */}
      <QuestCreateModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />

      <style>{`
        @media (max-width: 1050px) {
          .hub-tri-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
