import React, { useState } from 'react';
import {
  Compass,
  Lock,
  Unlock,
  X,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Realm } from '../types';
import { sound } from '../utils/sound';

export const WorldPage: React.FC = () => {
  const { realms, user } = useGame();
  const [selectedRealm, setSelectedRealm] = useState<Realm | null>(realms[0]);

  const handleRealmClick = (realm: Realm) => {
    sound.playClick();
    setSelectedRealm(realm);
  };

  return (
    <div style={{ paddingBottom: 60, position: 'relative' }}>
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
          CONTINENTAL CARTOGRAPHY
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>THE LIVING WORLD</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Ascend through real-life discipline to unlock and explore cosmic domains. Current access: LV. {user.level}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: selectedRealm ? '1fr 380px' : '1fr',
          gap: 24,
          alignItems: 'start'
        }}
        className="world-layout"
      >
        {/* Interactive Tactical Map Container */}
        <div
          className="hud-glass-panel"
          style={{
            position: 'relative',
            height: 600,
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            background: `
              radial-gradient(ellipse at center, rgba(255, 107, 43, 0.06) 0%, rgba(7, 9, 14, 0.95) 80%),
              url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80') center/cover no-repeat
            `,
            boxShadow: 'inset 0 0 80px rgba(0, 0, 0, 0.9)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {/* Tactical Grid / Overlay Lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              pointerEvents: 'none'
            }}
          />

          {/* Holographic Radar Concentric Circles */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 440,
              height: 440,
              border: '1px dashed rgba(255, 107, 43, 0.15)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 240,
              height: 240,
              border: '1px dashed rgba(56, 189, 248, 0.15)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />

          {/* Connecting Map Constellation Lines */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none'
            }}
          >
            {/* Lines from The Keep (50%, 52%) to other nodes */}
            <line x1="50%" y1="52%" x2="26%" y2="74%" stroke="rgba(255, 107, 43, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="52%" x2="22%" y2="26%" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="52%" x2="78%" y2="22%" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="52%" x2="80%" y2="72%" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>

          {/* Interactive Realm Waypoint Nodes */}
          {realms.map(realm => {
            const isSelected = selectedRealm?.id === realm.id;
            const isLocked = !realm.unlocked;

            const markerColor =
              realm.attribute === 'CRAFT'
                ? '#FF9E40'
                : realm.attribute === 'FOCUS'
                ? '#38BDF8'
                : realm.attribute === 'VIGOR'
                ? '#34D399'
                : realm.attribute === 'WILL'
                ? '#C084FC'
                : '#FBBF24';

            return (
              <div
                key={realm.id}
                onClick={() => handleRealmClick(realm)}
                style={{
                  position: 'absolute',
                  left: `${realm.coordinates.x}%`,
                  top: `${realm.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 30 : 20,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.25s ease'
                }}
              >
                {/* Glowing Aura & Ping */}
                <div
                  style={{
                    position: 'relative',
                    width: isSelected ? 48 : 40,
                    height: isSelected ? 48 : 40,
                    borderRadius: '50%',
                    background: isLocked
                      ? 'rgba(30, 41, 59, 0.8)'
                      : `radial-gradient(circle, ${markerColor} 0%, rgba(7, 9, 14, 0.9) 80%)`,
                    border: isSelected
                      ? `2px solid #FFFFFF`
                      : isLocked
                      ? '1px solid rgba(255, 255, 255, 0.2)'
                      : `2px solid ${markerColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isLocked
                      ? 'none'
                      : isSelected
                      ? `0 0 24px ${markerColor}, 0 0 40px ${markerColor}`
                      : `0 0 14px ${markerColor}`
                  }}
                >
                  {isLocked ? (
                    <Lock size={16} color="rgba(255, 255, 255, 0.4)" />
                  ) : (
                    <Compass size={isSelected ? 22 : 18} color="#07090E" strokeWidth={2.4} />
                  )}
                </div>

                {/* Waypoint Label */}
                <div
                  style={{
                    marginTop: 8,
                    padding: '4px 10px',
                    background: 'rgba(7, 9, 14, 0.85)',
                    border: isSelected ? `1px solid ${markerColor}` : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-sm)',
                    backdropFilter: 'blur(8px)',
                    textAlign: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 11,
                      fontWeight: 800,
                      color: isLocked ? 'var(--text-muted)' : isSelected ? markerColor : '#F8FAFC',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {realm.name}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      fontFamily: 'var(--font-display)',
                      color: isLocked ? '#EF4444' : '#10B981',
                      fontWeight: 700
                    }}
                  >
                    {isLocked ? `SEALED // LV. ${realm.levelReq}` : `LV. ${realm.levelReq} ACCESSIBLE`}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Tactical Bottom Legend */}
          <div
            style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '6px 14px',
              background: 'rgba(7, 9, 14, 0.85)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-display)',
              fontSize: 11,
              color: 'var(--text-secondary)'
            }}
          >
            <span>WORLD GRID: 5 REALMS DISCOVERED</span>
            <span>•</span>
            <span style={{ color: '#34D399' }}>3 UNLOCKED</span>
            <span>•</span>
            <span style={{ color: '#F87171' }}>2 SEALED</span>
          </div>
        </div>

        {/* Selected Realm Drawer Panel */}
        {selectedRealm && (
          <div
            className="hud-glass-panel"
            style={{
              padding: 0,
              overflow: 'hidden',
              background: 'rgba(19, 26, 36, 0.9)',
              border: '1px solid rgba(255, 107, 43, 0.3)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            {/* Header Image */}
            <div style={{ position: 'relative', height: 180 }}>
              <img
                src={selectedRealm.image}
                alt={selectedRealm.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: selectedRealm.unlocked ? 'none' : 'grayscale(0.8) brightness(0.6)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(7, 9, 14, 0.2) 0%, rgba(13, 17, 23, 0.95) 100%)'
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <div
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-xs)',
                    background: selectedRealm.unlocked ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                    border: selectedRealm.unlocked ? '1px solid #10B981' : '1px solid #EF4444',
                    fontFamily: 'var(--font-display)',
                    fontSize: 10,
                    fontWeight: 800,
                    color: selectedRealm.unlocked ? '#34D399' : '#FCA5A5'
                  }}
                >
                  {selectedRealm.unlocked ? 'ACCESSIBLE' : `SEALED (LV. ${selectedRealm.levelReq})`}
                </div>
                <button
                  onClick={() => setSelectedRealm(null)}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'rgba(7, 9, 14, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F8FAFC'
                  }}
                >
                  <X size={15} />
                </button>
              </div>

              <div style={{ position: 'absolute', bottom: 14, left: 18, right: 18 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    color: '#FF9E40'
                  }}
                >
                  REALM ATLAS
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 800 }}>{selectedRealm.name}</h2>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedRealm.title}</div>
              </div>
            </div>

            {/* Details Content */}
            <div style={{ padding: 20 }}>
              {/* Lore & Overview */}
              <div style={{ marginBottom: 20 }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    marginBottom: 6
                  }}
                >
                  OVERVIEW & LORE
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 10 }}>
                  {selectedRealm.description}
                </p>
                <div
                  style={{
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderLeft: '2px solid #FF6B2B',
                    fontSize: 12,
                    fontStyle: 'italic',
                    color: 'var(--text-muted)'
                  }}
                >
                  "{selectedRealm.lore}"
                </div>
              </div>

              {/* Associated Attribute & Requirement */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                  marginBottom: 20
                }}
              >
                <div
                  style={{
                    padding: '10px 12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>
                    DOMINANT ATTRIBUTE
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#FF9E40' }}>
                    {selectedRealm.attribute}
                  </div>
                </div>

                <div
                  style={{
                    padding: '10px 12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>
                    LEVEL GATE
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>
                    LV. {selectedRealm.levelReq}
                  </div>
                </div>
              </div>

              {/* Available Quests in this Realm */}
              <div style={{ marginBottom: 20 }}>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: 'var(--text-muted)',
                    marginBottom: 8
                  }}
                >
                  AVAILABLE DISCIPLINE RUNS
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {selectedRealm.availableQuests.map((q, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 12,
                        color: 'var(--text-secondary)',
                        padding: '6px 10px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: 'var(--radius-xs)'
                      }}
                    >
                      <Sparkles size={13} color="#FF9E40" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rewards */}
              <div
                style={{
                  padding: '12px 14px',
                  background: 'rgba(255, 107, 43, 0.08)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255, 107, 43, 0.25)',
                  marginBottom: 20
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    color: '#FF9E40',
                    marginBottom: 2
                  }}
                >
                  REALM REWARDS
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC' }}>
                  {selectedRealm.rewards}
                </div>
              </div>

              {/* Action Button */}
              {selectedRealm.unlocked ? (
                <button
                  onClick={() => sound.playQuestComplete()}
                  className="btn-ember"
                  style={{ width: '100%', fontSize: 13 }}
                >
                  ENTER REALM EXPEDITION
                </button>
              ) : (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '12px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 12,
                    color: '#FCA5A5',
                    fontWeight: 700
                  }}
                >
                  ACQUIRE {selectedRealm.levelReq - user.level} MORE LEVELS TO UNLOCK
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 950px) {
          .world-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
