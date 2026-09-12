import React, { useState } from 'react';
import {
  Shield,
  Sparkles,
  Flame,
  Award,
  Cpu,
  BookOpen,
  Activity,
  Heart,
  ChevronRight,
  Info
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { LifeDNAVisualizer } from '../components/LifeDNAVisualizer';
import { sound } from '../utils/sound';

export const CharacterPage: React.FC = () => {
  const { user, attributes, archetype, items, equipItem } = useGame();

  const [inspectedSlot, setInspectedSlot] = useState<string | null>(null);

  const xpPercent = Math.min(100, Math.round((user.xp / user.xpMax) * 100));

  // Equipment slots configuration
  const equipmentSlots = [
    { id: 'aura', label: 'AURA', slotName: 'aura' },
    { id: 'weapon', label: 'WEAPON', slotName: 'weapon' },
    { id: 'armor', label: 'ARMOR / CHEST', slotName: 'armor' },
    { id: 'relic', label: 'RELIC', slotName: 'relic' },
    { id: 'ring', label: 'RING', slotName: 'ring' },
    { id: 'talisman', label: 'TALISMAN', slotName: 'talisman' },
    { id: 'cloak', label: 'CLOAK', slotName: 'cloak' },
    { id: 'boots', label: 'BOOTS', slotName: 'boots' }
  ];

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
          VESSEL DIAGNOSTICS & TELEMETRY
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>CHARACTER PROFILE</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Your physical actions shape internal architecture. Flanked by ancient relics and adaptive Life DNA.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 24,
          alignItems: 'start'
        }}
        className="character-split-layout"
      >
        {/* LEFT COLUMN: Large Character Artwork flanked by 8 Equipment Slots */}
        <div
          className="hud-glass-panel"
          style={{
            padding: 28,
            background: 'linear-gradient(180deg, rgba(19, 26, 36, 0.8) 0%, rgba(9, 13, 20, 0.95) 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Cyber Tactical Hex / Grid overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(255, 107, 43, 0.05) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none'
            }}
          />

          {/* Top Identity Row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 16
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h2 style={{ fontSize: 24, fontWeight: 800 }}>{user.name}</h2>
                <span
                  style={{
                    padding: '2px 8px',
                    background: 'rgba(255, 107, 43, 0.15)',
                    border: '1px solid rgba(255, 107, 43, 0.35)',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#FF9E40'
                  }}
                >
                  LV. {user.level < 10 ? `0${user.level}` : user.level}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  fontWeight: 700,
                  color: archetype.color,
                  letterSpacing: '0.08em',
                  marginTop: 2
                }}
              >
                "{archetype.name}" // {archetype.title}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>
                JOINED DISCIPLINE
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>
                {user.joinedDate}
              </div>
            </div>
          </div>

          {/* Center Stage: Flanked Character Presentation */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '110px 1fr 110px',
              gap: 16,
              alignItems: 'center',
              minHeight: 380,
              position: 'relative'
            }}
            className="flanked-stage"
          >
            {/* Left 4 Equipment Slots */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {equipmentSlots.slice(0, 4).map(slot => {
                const equippedItem = items.find(i => i.slot === slot.slotName && i.equipped);
                return (
                  <div
                    key={slot.id}
                    onClick={() => {
                      sound.playClick();
                      setInspectedSlot(slot.slotName);
                    }}
                    style={{
                      padding: 10,
                      background: equippedItem ? 'rgba(255, 107, 43, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                      border: equippedItem ? '1px solid #FF9E40' : '1px dashed var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: equippedItem ? '0 0 12px rgba(255, 107, 43, 0.2)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: 9, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 800 }}>
                      {slot.label}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: equippedItem ? '#F8FAFC' : 'var(--text-muted)',
                        marginTop: 2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {equippedItem ? equippedItem.name : 'EMPTY'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Avatar Artwork & Holographic Ring */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: 220,
                  height: 280,
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '2px solid rgba(255, 107, 43, 0.4)',
                  boxShadow: '0 0 40px rgba(255, 107, 43, 0.25), inset 0 0 20px rgba(0, 0, 0, 0.8)'
                }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 60%, rgba(7, 9, 14, 0.9) 100%)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    color: '#FF9E40'
                  }}
                >
                  ACTIVE VESSEL
                </div>
              </div>
            </div>

            {/* Right 4 Equipment Slots */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {equipmentSlots.slice(4, 8).map(slot => {
                const equippedItem = items.find(i => i.slot === slot.slotName && i.equipped);
                return (
                  <div
                    key={slot.id}
                    onClick={() => {
                      sound.playClick();
                      setInspectedSlot(slot.slotName);
                    }}
                    style={{
                      padding: 10,
                      background: equippedItem ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                      border: equippedItem ? '1px solid #38BDF8' : '1px dashed var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      boxShadow: equippedItem ? '0 0 12px rgba(56, 189, 248, 0.2)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: 9, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 800 }}>
                      {slot.label}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: equippedItem ? '#F8FAFC' : 'var(--text-muted)',
                        marginTop: 2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {equippedItem ? equippedItem.name : 'EMPTY'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* XP Progress Bar on Bottom */}
          <div style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-display)', color: 'var(--text-secondary)', fontWeight: 700 }}>
                XP CONVERGENCE TOWARD LEVEL {user.level + 1}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#F8FAFC' }}>
                {user.xp} / {user.xpMax} XP ({xpPercent}%)
              </span>
            </div>
            <div
              style={{
                height: 8,
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${xpPercent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #FF6B2B, #FF9E40)',
                  boxShadow: '0 0 10px rgba(255, 107, 43, 0.5)',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Four Attributes & Dynamic Life DNA Radar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Attributes Matrix Card */}
          <div
            className="hud-glass-panel"
            style={{
              padding: 24,
              background: 'rgba(19, 26, 36, 0.85)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: '#FF9E40',
                marginBottom: 16
              }}
            >
              CARDINAL ATTRIBUTES
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* CRAFT */}
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(255, 107, 43, 0.06)',
                  border: '1px solid rgba(255, 107, 43, 0.25)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Cpu size={16} color="#FF9E40" />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: '#FF9E40' }}>
                      CRAFT
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>
                    {attributes.craft}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  Software architecture, system synthesis, tactile engineering.
                </div>
              </div>

              {/* FOCUS */}
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(56, 189, 248, 0.06)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <BookOpen size={16} color="#38BDF8" />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: '#38BDF8' }}>
                      FOCUS
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>
                    {attributes.focus}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  Immersion depth, theoretical analysis, undistracted attention.
                </div>
              </div>

              {/* WILL */}
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(168, 85, 247, 0.06)',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Shield size={16} color="#C084FC" />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: '#C084FC' }}>
                      WILL
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>
                    {attributes.will}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  Dawn routines, stoic habit defense, resisting impulse.
                </div>
              </div>

              {/* VIGOR */}
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(16, 185, 129, 0.06)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Activity size={16} color="#34D399" />
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: '#34D399' }}>
                      VIGOR
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>
                    {attributes.vigor}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  Athletic stamina, muscular output, cardiovascular resilience.
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Archetype & Life DNA Visual */}
          <div
            className="hud-glass-panel"
            style={{
              padding: 24,
              textAlign: 'center',
              background: 'radial-gradient(ellipse at center, rgba(255, 107, 43, 0.06) 0%, rgba(13, 17, 23, 0.95) 80%)'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.14em',
                color: 'var(--text-muted)',
                marginBottom: 12
              }}
            >
              DYNAMIC ARCHETYPE RESONANCE
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LifeDNAVisualizer attributes={attributes} size="md" />
            </div>

            <div style={{ marginTop: 14 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: archetype.color }}>
                {archetype.name}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.5 }}>
                {archetype.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 950px) {
          .character-split-layout {
            grid-template-columns: 1fr !important;
          }
          .flanked-stage {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};
