import React, { useState } from 'react';
import { X, Plus, Sparkles, Flame, Check } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { AttributeType, QuestDifficulty } from '../types';
import { sound } from '../utils/sound';

interface QuestCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuestCreateModal: React.FC<QuestCreateModalProps> = ({ isOpen, onClose }) => {
  const { createQuest } = useGame();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'DAILY' | 'MAIN' | 'SIDE' | 'EPIC'>('DAILY');
  const [attribute, setAttribute] = useState<AttributeType>('CRAFT');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>('Medium');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Calculate XP and Embers dynamically based on difficulty & category
  const getRewards = (diff: QuestDifficulty, cat: string) => {
    let xpBase = diff === 'Easy' ? 25 : diff === 'Medium' ? 50 : diff === 'Hard' ? 85 : 150;
    let emberBase = diff === 'Easy' ? 10 : diff === 'Medium' ? 20 : diff === 'Hard' ? 30 : 60;
    if (cat === 'EPIC') {
      xpBase = Math.round(xpBase * 1.5);
      emberBase = Math.round(emberBase * 1.5);
    }
    return { xp: xpBase, embers: emberBase };
  };

  const { xp, embers } = getRewards(difficulty, category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Quest title is required.');
      return;
    }

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createQuest({
        title: title.trim(),
        description: description.trim() || 'Custom self-directed real world action.',
        category,
        attribute,
        difficulty,
        xp,
        embers
      });

      sound.playQuestComplete();
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to create your quest right now.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="hud-glass-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: '95%',
          maxWidth: 540,
          padding: 28,
          background: 'linear-gradient(180deg, #131A24 0%, #0D1117 100%)',
          border: '1px solid rgba(255, 107, 43, 0.35)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                color: '#FF9E40'
              }}
            >
              MISSION FORGE
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700 }}>CREATE REAL-LIFE QUEST</h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: 'var(--radius-sm)',
              color: '#FCA5A5',
              fontSize: 13,
              marginBottom: 16
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Title */}
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
              QUEST TITLE *
            </label>
            <input
              type="text"
              className="hud-input"
              placeholder="e.g. Ship authentication microservice, Run 5k, Meditate 15m"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              autoFocus
            />
          </div>

          {/* Description */}
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
              DESCRIPTION (OPTIONAL)
            </label>
            <textarea
              className="hud-input"
              rows={2}
              placeholder="Detail your real-life objective..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>

          {/* Category & Attribute in 2 cols */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
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
                CATEGORY
              </label>
              <select
                className="hud-select"
                value={category}
                onChange={e => setCategory(e.target.value as 'DAILY' | 'MAIN' | 'SIDE' | 'EPIC')}
              >
                <option value="DAILY">DAILY HABIT</option>
                <option value="MAIN">MAIN QUEST</option>
                <option value="SIDE">SIDE QUEST</option>
                <option value="EPIC">EPIC EXPEDITION</option>
              </select>
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
                GOVERNING ATTRIBUTE
              </label>
              <select
                className="hud-select"
                value={attribute}
                onChange={e => setAttribute(e.target.value as AttributeType)}
              >
                <option value="CRAFT">CRAFT (Coding, Building)</option>
                <option value="FOCUS">FOCUS (Study, Reading)</option>
                <option value="VIGOR">VIGOR (Gym, Athletics)</option>
                <option value="WILL">WILL (Habits, Discipline)</option>
              </select>
            </div>
          </div>

          {/* Difficulty */}
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
              DIFFICULTY
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {(['Easy', 'Medium', 'Hard', 'Legendary'] as QuestDifficulty[]).map(d => (
                <button
                  type="button"
                  key={d}
                  onClick={() => setDifficulty(d)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 11,
                    fontWeight: 700,
                    textAlign: 'center',
                    background: difficulty === d ? 'rgba(255, 107, 43, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: difficulty === d ? '1px solid #FF6B2B' : '1px solid var(--border-subtle)',
                    color: difficulty === d ? '#FF9E40' : 'var(--text-secondary)'
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Estimated Rewards Display */}
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontSize: 12, fontFamily: 'var(--font-display)', color: 'var(--text-secondary)' }}>
              EARNED REWARDS:
            </span>
            <div style={{ display: 'flex', gap: 14 }}>
              <span style={{ color: '#38BDF8', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 13 }}>
                +{xp} XP
              </span>
              <span style={{ color: '#FF9E40', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: 13 }}>
                +{embers} EMBERS
              </span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
            <button type="button" onClick={onClose} className="btn-ghost">
              CANCEL
            </button>
            <button type="submit" className="btn-ember" disabled={isSubmitting || !title.trim()}>
              <Plus size={16} />
              {isSubmitting ? 'MANIFESTING...' : 'MANIFEST QUEST'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
