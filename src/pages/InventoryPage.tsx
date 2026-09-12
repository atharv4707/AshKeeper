import React, { useState } from 'react';
import {
  Package,
  Shield,
  Sparkles,
  Check,
  Lock,
  Zap,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Item } from '../types';
import { sound } from '../utils/sound';

export const InventoryPage: React.FC = () => {
  const { items, equipItem } = useGame();
  const [selectedItem, setSelectedItem] = useState<Item | null>(
    items.find(i => i.equipped) || items[0]
  );
  const [activeTab, setActiveTab] = useState<'ALL' | 'EQUIPPED' | 'OWNED' | 'LOCKED'>('ALL');

  const handleItemClick = (item: Item) => {
    sound.playClick();
    setSelectedItem(item);
  };

  const handleToggleEquip = (itemId: string) => {
    equipItem(itemId);
  };

  const filteredItems = items.filter(item => {
    if (activeTab === 'EQUIPPED') return item.equipped;
    if (activeTab === 'OWNED') return item.owned && !item.equipped;
    if (activeTab === 'LOCKED') return item.locked || !item.owned;
    return true;
  });

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
          EQUIPMENT MATRIX
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>INVENTORY</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Manage fitted gear, active resonance rings, and stored ancient relics.
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 24,
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 12
        }}
      >
        {(['ALL', 'EQUIPPED', 'OWNED', 'LOCKED'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => {
              sound.playClick();
              setActiveTab(tab);
            }}
            style={{
              padding: '8px 16px',
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: selectedItem ? '1fr 360px' : '1fr',
          gap: 24,
          alignItems: 'start'
        }}
        className="inventory-layout"
      >
        {/* Items Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {filteredItems.map(item => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="hud-glass-panel"
                style={{
                  padding: 16,
                  cursor: 'pointer',
                  border: isSelected
                    ? '1px solid #FF6B2B'
                    : item.equipped
                    ? '1px solid #10B981'
                    : '1px solid var(--border-subtle)',
                  background: isSelected
                    ? 'rgba(255, 107, 43, 0.1)'
                    : item.equipped
                    ? 'rgba(16, 185, 129, 0.05)'
                    : 'rgba(19, 26, 36, 0.65)',
                  boxShadow: isSelected ? '0 0 16px rgba(255, 107, 43, 0.25)' : 'none',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: 'var(--font-display)',
                      color: item.rarity === 'Legendary' ? '#FBBF24' : '#38BDF8',
                      fontWeight: 800
                    }}
                  >
                    {item.rarity.toUpperCase()}
                  </span>
                  {item.equipped && (
                    <span
                      style={{
                        fontSize: 9,
                        fontFamily: 'var(--font-display)',
                        color: '#34D399',
                        fontWeight: 800,
                        background: 'rgba(16, 185, 129, 0.2)',
                        padding: '1px 6px',
                        borderRadius: 2
                      }}
                    >
                      EQUIPPED
                    </span>
                  )}
                  {item.locked && (
                    <Lock size={12} color="rgba(255,255,255,0.4)" />
                  )}
                </div>

                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
                  SLOT: {item.slot.toUpperCase()}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  {item.effect}
                </div>
              </div>
            );
          })}
        </div>

        {/* Large Item Preview Drawer */}
        {selectedItem && (
          <div
            className="hud-glass-panel"
            style={{
              padding: 24,
              background: 'rgba(19, 26, 36, 0.9)',
              border: '1px solid rgba(255, 107, 43, 0.35)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#FF9E40'
                }}
              >
                ARTIFACT TELEMETRY
              </span>
              <span
                style={{
                  padding: '2px 8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: 10,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-muted)'
                }}
              >
                {selectedItem.slot.toUpperCase()}
              </span>
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{selectedItem.name}</h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  color: selectedItem.rarity === 'Legendary' ? '#FBBF24' : '#38BDF8'
                }}
              >
                {selectedItem.rarity}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {selectedItem.owned ? 'Acquired' : 'Available in Cache'}
              </span>
            </div>

            {/* Effect */}
            <div
              style={{
                padding: '12px 14px',
                background: 'rgba(255, 107, 43, 0.08)',
                border: '1px solid rgba(255, 107, 43, 0.25)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 20
              }}
            >
              <div style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: '#FF9E40', fontWeight: 800, marginBottom: 2 }}>
                PRIMARY RESONANCE
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F8FAFC' }}>
                {selectedItem.effect}
              </div>
            </div>

            {/* Lore */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 800, marginBottom: 6 }}>
                LORE INSCRIPTION
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                "{selectedItem.lore}"
              </p>
            </div>

            {/* Actions */}
            {selectedItem.owned ? (
              <button
                onClick={() => handleToggleEquip(selectedItem.id)}
                className={selectedItem.equipped ? 'btn-ghost' : 'btn-ember'}
                style={{ width: '100%', fontSize: 13, justifyContent: 'center' }}
              >
                {selectedItem.equipped ? 'UNEQUIP FROM VESSEL' : 'EQUIP TO VESSEL'}
              </button>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: 12,
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  color: 'var(--text-secondary)'
                }}
              >
                Unacquired. Visit The Cache to unlock for {selectedItem.price} Embers.
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .inventory-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
