import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Share2,
  Users,
  Compass,
  Trophy,
  ArrowRight,
  Shield,
  Sparkles,
  Check,
  Plus
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { PLAYERS_NEARBY } from '../data/mockData';
import { sound } from '../utils/sound';

export const NetworkPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, attributes, archetype } = useGame();

  const [activeTab, setActiveTab] = useState<'NEARBY' | 'CREWS' | 'SHARED QUESTS' | 'LEADERBOARD'>('NEARBY');
  const [partyModalOpen, setPartyModalOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState<string[]>(['p-1', 'p-2']); // Riya & Kabir

  // Calculate dynamic Party Balance %
  const calculatePartyBalance = () => {
    // Check coverage of Craft, Focus, Vigor, Will
    let hasCraft = attributes.craft > 50;
    let hasFocus = attributes.focus > 50;
    let hasVigor = attributes.vigor > 50;
    let hasWill = attributes.will > 50;

    selectedParty.forEach(pId => {
      const p = PLAYERS_NEARBY.find(pl => pl.id === pId);
      if (p) {
        if (p.attributes.craft > 60) hasCraft = true;
        if (p.attributes.focus > 60) hasFocus = true;
        if (p.attributes.vigor > 60) hasVigor = true;
        if (p.attributes.will > 60) hasWill = true;
      }
    });

    let score = 50;
    if (hasCraft) score += 12;
    if (hasFocus) score += 12;
    if (hasVigor) score += 12;
    if (hasWill) score += 8;

    return Math.min(98, score);
  };

  const partyBalance = calculatePartyBalance();

  const togglePlayerInParty = (id: string) => {
    sound.playClick();
    if (selectedParty.includes(id)) {
      setSelectedParty(prev => prev.filter(p => p !== id));
    } else {
      setSelectedParty(prev => [...prev, id]);
    }
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 16
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
            SYNAPSE & ALLIANCE NEXUS
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>NETWORK</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            "Better together. Greater journeys." Connect with fellow wanderers and balance your expedition party.
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setPartyModalOpen(true);
          }}
          className="btn-ember"
          style={{ fontSize: 13, padding: '10px 20px' }}
        >
          <Users size={16} />
          FIND YOUR PARTY (BALANCE: {partyBalance}%)
        </button>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 24,
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 12,
          overflowX: 'auto'
        }}
      >
        {(['NEARBY', 'CREWS', 'SHARED QUESTS', 'LEADERBOARD'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => {
              sound.playClick();
              setActiveTab(tab);
            }}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 800,
              background: activeTab === tab ? 'rgba(255, 107, 43, 0.15)' : 'transparent',
              border: activeTab === tab ? '1px solid #FF6B2B' : '1px solid transparent',
              color: activeTab === tab ? '#FF9E40' : 'var(--text-secondary)'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Network Graph Visualization Canvas Area */}
      <div
        className="hud-glass-panel"
        style={{
          height: 300,
          marginBottom: 28,
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.08) 0%, rgba(13, 17, 23, 0.95) 75%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--border-subtle)'
        }}
      >
        {/* Subtle Constellation Lines */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          {/* Radiating lines from Center (You: 50%, 50%) */}
          <line x1="50%" y1="50%" x2="22%" y2="35%" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="78%" y2="30%" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="30%" y2="75%" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="50%" x2="72%" y2="78%" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>

        {/* Central Node: YOU (Atharv) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 10
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              margin: '0 auto 8px',
              border: '2px solid #FF6B2B',
              boxShadow: '0 0 24px rgba(255, 107, 43, 0.6)',
              overflow: 'hidden',
              background: '#07090E'
            }}
          >
            <img src={user.avatar} alt="You" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 800,
              color: '#F8FAFC',
              background: 'rgba(7, 9, 14, 0.85)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid #FF6B2B'
            }}
          >
            YOU ({archetype.name.replace('THE ', '')})
          </div>
        </div>

        {/* Node 1: Riya (Top-Left) */}
        <div
          onClick={() => togglePlayerInParty('p-1')}
          style={{
            position: 'absolute',
            left: '22%',
            top: '35%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              margin: '0 auto 6px',
              border: selectedParty.includes('p-1') ? '2px solid #38BDF8' : '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: selectedParty.includes('p-1') ? '0 0 16px rgba(56, 189, 248, 0.5)' : 'none',
              overflow: 'hidden'
            }}
          >
            <img src={PLAYERS_NEARBY[0].avatar} alt="Riya" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: '#38BDF8' }}>
            Riya (Focus 86)
          </div>
        </div>

        {/* Node 2: Kabir (Top-Right) */}
        <div
          onClick={() => togglePlayerInParty('p-2')}
          style={{
            position: 'absolute',
            left: '78%',
            top: '30%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              margin: '0 auto 6px',
              border: selectedParty.includes('p-2') ? '2px solid #34D399' : '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: selectedParty.includes('p-2') ? '0 0 16px rgba(16, 185, 129, 0.5)' : 'none',
              overflow: 'hidden'
            }}
          >
            <img src={PLAYERS_NEARBY[1].avatar} alt="Kabir" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: '#34D399' }}>
            Kabir (Vigor 82)
          </div>
        </div>

        {/* Node 3: Aarav (Bottom-Left) */}
        <div
          onClick={() => togglePlayerInParty('p-3')}
          style={{
            position: 'absolute',
            left: '30%',
            top: '75%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              margin: '0 auto 6px',
              border: selectedParty.includes('p-3') ? '2px solid #FBBF24' : '1px solid rgba(255, 255, 255, 0.2)',
              overflow: 'hidden'
            }}
          >
            <img src={PLAYERS_NEARBY[2].avatar} alt="Aarav" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: '#FBBF24' }}>
            Aarav (Balanced)
          </div>
        </div>

        {/* Node 4: Neha (Bottom-Right) */}
        <div
          onClick={() => togglePlayerInParty('p-4')}
          style={{
            position: 'absolute',
            left: '72%',
            top: '78%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              margin: '0 auto 6px',
              border: selectedParty.includes('p-4') ? '2px solid #C084FC' : '1px solid rgba(255, 255, 255, 0.2)',
              overflow: 'hidden'
            }}
          >
            <img src={PLAYERS_NEARBY[3].avatar} alt="Neha" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, color: '#C084FC' }}>
            Neha (Will 68)
          </div>
        </div>
      </div>

      {/* Tab Content Display */}
      {activeTab === 'NEARBY' && (
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>DISCOVERED WANDERERS</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {PLAYERS_NEARBY.map(p => {
              const inParty = selectedParty.includes(p.id);
              return (
                <div
                  key={p.id}
                  className="hud-glass-panel"
                  style={{
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: inParty ? 'rgba(56, 189, 248, 0.08)' : 'rgba(19, 26, 36, 0.75)',
                    border: inParty ? '1px solid #38BDF8' : '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                    <img
                      src={p.avatar}
                      alt={p.name}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 'var(--radius-full)',
                        objectFit: 'cover',
                        border: '2px solid var(--border-subtle)'
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 16 }}>{p.name}</div>
                      <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: '#FF9E40' }}>
                        LV. 0{p.level} • {p.archetype}
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                    Current activity: "{p.status}"
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16, fontSize: 11 }}>
                    <div style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: 4 }}>
                      Craft: <strong>{p.attributes.craft}</strong>
                    </div>
                    <div style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: 4 }}>
                      Focus: <strong>{p.attributes.focus}</strong>
                    </div>
                    <div style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: 4 }}>
                      Vigor: <strong>{p.attributes.vigor}</strong>
                    </div>
                    <div style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.03)', borderRadius: 4 }}>
                      Will: <strong>{p.attributes.will}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePlayerInParty(p.id)}
                    className={inParty ? 'btn-ghost' : 'btn-ember'}
                    style={{
                      padding: '8px 12px',
                      fontSize: 12,
                      justifyContent: 'center',
                      background: inParty ? 'rgba(56, 189, 248, 0.15)' : undefined,
                      borderColor: inParty ? '#38BDF8' : undefined,
                      color: inParty ? '#38BDF8' : undefined
                    }}
                  >
                    {inParty ? 'IN ACTIVE EXPEDITION' : 'RECRUIT TO PARTY'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'SHARED QUESTS' && (
        <div
          className="hud-glass-panel"
          style={{
            padding: 24,
            background: 'rgba(19, 26, 36, 0.85)',
            border: '1px solid rgba(255, 107, 43, 0.3)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <span className="pill-craft">COOPERATIVE RAID</span>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginTop: 8 }}>THE BUILDERS' RUN</h3>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                3 Players active • Build deliberate prototypes for 5 consecutive days.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                navigate('/shared-quest');
              }}
              className="btn-ember"
            >
              OPEN MISSION ROOM
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'CREWS' && (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>
          <Shield size={36} color="#FF9E40" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: 18, color: '#F8FAFC', marginBottom: 6 }}>CREWS & GUILDS</h3>
          <p style={{ fontSize: 14, maxWidth: 420, margin: '0 auto' }}>
            Form 5-person pacts to amplify combo streak defense and pool Embers for guild relics.
          </p>
        </div>
      )}

      {activeTab === 'LEADERBOARD' && (
        <div className="hud-glass-panel" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>GLOBAL DISCIPLINE LADDER</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { rank: 1, name: 'Atharv (You)', title: 'The Builder', score: 'Level 7 • 78 Craft • 7-Day Flame', current: true },
              { rank: 2, name: 'Kabir', title: 'The Warrior', score: 'Level 8 • 82 Vigor • 12-Day Flame' },
              { rank: 3, name: 'Riya', title: 'The Scholar', score: 'Level 6 • 86 Focus • 9-Day Flame' },
              { rank: 4, name: 'Aarav', title: 'The Balanced', score: 'Level 7 • 70 All • 5-Day Flame' }
            ].map(item => (
              <div
                key={item.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: item.current ? 'rgba(255, 107, 43, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  border: item.current ? '1px solid #FF6B2B' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, color: item.rank === 1 ? '#FF9E40' : 'var(--text-muted)' }}>
                    #{item.rank}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.title}</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, fontFamily: 'var(--font-display)', color: 'var(--text-secondary)' }}>
                  {item.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Find Your Party Modal */}
      {partyModalOpen && (
        <div className="modal-overlay" onClick={() => setPartyModalOpen(false)}>
          <div
            className="hud-glass-panel"
            onClick={e => e.stopPropagation()}
            style={{
              width: '90%',
              maxWidth: 480,
              padding: 28,
              background: '#0D1117',
              border: '1px solid rgba(56, 189, 248, 0.4)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: '#38BDF8', fontWeight: 800 }}>
                  SYNERGY ENGINE
                </span>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>EXPEDITION COMPATIBILITY</h3>
              </div>
              <button onClick={() => setPartyModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
                ✕
              </button>
            </div>

            <div
              style={{
                textAlign: 'center',
                padding: '20px',
                background: 'rgba(56, 189, 248, 0.08)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 20
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#38BDF8' }}>
                {partyBalance}%
              </div>
              <div style={{ fontSize: 12, fontFamily: 'var(--font-display)', fontWeight: 700, color: '#F8FAFC' }}>
                OPTIMAL ARCHETYPE DISTRIBUTION
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 6 }}>
                Atharv (Craft) + Riya (Focus) + Kabir (Vigor) harmonizes technical synthesis, intellectual stamina, and kinetic resilience.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button onClick={() => setPartyModalOpen(false)} className="btn-ghost">
                CLOSE
              </button>
              <button
                onClick={() => {
                  sound.playQuestComplete();
                  setPartyModalOpen(false);
                  navigate('/shared-quest');
                }}
                className="btn-ember"
              >
                DISPATCH SHARED EXPEDITION INVITE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
