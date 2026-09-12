import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  Flame,
  Sun,
  Lock,
  Check,
  Package,
  AlertCircle,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Item } from '../types';
import { sound } from '../utils/sound';

export const CachePage: React.FC = () => {
  const { user, items, purchaseItem, equipItem } = useGame();
  const [purchaseNotice, setPurchaseNotice] = useState<{ text: string; isError: boolean } | null>(null);

  const handlePurchase = (item: Item) => {
    sound.playClick();
    const result = purchaseItem(item.id);
    setPurchaseNotice({ text: result.message, isError: !result.success });
    setTimeout(() => {
      setPurchaseNotice(null);
    }, 3000);
  };

  const handleEquip = (itemId: string) => {
    equipItem(itemId);
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
            RELIC VAULT // ANCIENT ARTIFACTS
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>THE CACHE</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            Spend your earned Embers on permanent stat talismans and defensive relics.
          </p>
        </div>

        {/* Big Embers Balance Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 20px',
            background: 'rgba(255, 158, 64, 0.1)',
            border: '1px solid rgba(255, 158, 64, 0.35)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 0 20px rgba(255, 107, 43, 0.15)'
          }}
        >
          <Sparkles size={22} color="#FF9E40" />
          <div>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 800 }}>
              AVAILABLE HARVEST
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#F8FAFC' }}>
              {user.embers} <span style={{ color: '#FF9E40', fontSize: 14 }}>EMBERS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Alert / Status Banner */}
      {purchaseNotice && (
        <div
          style={{
            padding: '12px 20px',
            marginBottom: 24,
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: purchaseNotice.isError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
            border: purchaseNotice.isError ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(16, 185, 129, 0.4)',
            color: purchaseNotice.isError ? '#FCA5A5' : '#34D399',
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            fontWeight: 700,
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <AlertCircle size={18} />
          <span>{purchaseNotice.text}</span>
        </div>
      )}

      {/* Cache Items Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {items.map(item => {
          const isAffordable = user.embers >= item.price;
          const isLocked = item.locked || (item.requiredLevel && user.level < item.requiredLevel);

          const rarityBorder =
            item.rarity === 'Legendary'
              ? '1px solid rgba(245, 158, 11, 0.5)'
              : item.rarity === 'Epic'
              ? '1px solid rgba(168, 85, 247, 0.5)'
              : '1px solid rgba(56, 189, 248, 0.4)';

          const rarityBadge =
            item.rarity === 'Legendary'
              ? 'pill-ember'
              : item.rarity === 'Epic'
              ? 'pill-will'
              : 'pill-focus';

          return (
            <div
              key={item.id}
              className="hud-glass-panel"
              style={{
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: isLocked ? 'rgba(13, 17, 23, 0.4)' : 'rgba(19, 26, 36, 0.75)',
                border: rarityBorder,
                borderRadius: 'var(--radius-md)',
                boxShadow: item.equipped ? '0 0 20px rgba(255, 107, 43, 0.2)' : 'none',
                opacity: isLocked ? 0.65 : 1
              }}
            >
              <div>
                {/* Rarity & Slot Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span className={rarityBadge}>{item.rarity.toUpperCase()}</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: 'var(--font-display)',
                      color: 'var(--text-muted)',
                      fontWeight: 700
                    }}
                  >
                    SLOT: {item.slot.toUpperCase()}
                  </span>
                </div>

                {/* Item Name */}
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{item.name}</h3>

                {/* Description & Lore */}
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
                  {item.description}
                </p>

                {/* Effect Callout */}
                <div
                  style={{
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <Zap size={14} color="#FF9E40" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#F8FAFC', fontFamily: 'var(--font-display)' }}>
                    {item.effect}
                  </span>
                </div>
              </div>

              <div>
                {/* Price or State Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                    paddingTop: 12,
                    borderTop: '1px solid var(--border-subtle)'
                  }}
                >
                  <span style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>
                    COST
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Sparkles size={14} color="#FF9E40" />
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 16,
                        color: isAffordable || item.owned ? '#FF9E40' : '#EF4444'
                      }}
                    >
                      {item.price} EMBERS
                    </span>
                  </div>
                </div>

                {/* Action Buttons based on state */}
                {isLocked ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      padding: '10px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#FCA5A5',
                      fontFamily: 'var(--font-display)',
                      fontSize: 12,
                      fontWeight: 700
                    }}
                  >
                    <Lock size={14} />
                    <span>LOCKED // LV. {item.requiredLevel} REQUIRED</span>
                  </div>
                ) : item.owned ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                    <button
                      onClick={() => handleEquip(item.id)}
                      className={item.equipped ? 'btn-ghost' : 'btn-ember'}
                      style={{
                        padding: '10px',
                        fontSize: 12,
                        justifyContent: 'center',
                        background: item.equipped ? 'rgba(16, 185, 129, 0.15)' : undefined,
                        borderColor: item.equipped ? '#10B981' : undefined,
                        color: item.equipped ? '#34D399' : undefined
                      }}
                    >
                      {item.equipped ? (
                        <>
                          <Check size={14} />
                          EQUIPPED TO VESSEL
                        </>
                      ) : (
                        'EQUIP TO VESSEL'
                      )}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePurchase(item)}
                    className="btn-ember"
                    style={{
                      width: '100%',
                      padding: '10px',
                      fontSize: 12,
                      justifyContent: 'center',
                      opacity: isAffordable ? 1 : 0.85
                    }}
                  >
                    <ShoppingBag size={14} />
                    ACQUIRE RELIC
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
