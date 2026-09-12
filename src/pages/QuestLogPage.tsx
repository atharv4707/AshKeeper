import React from 'react';
import {
  History,
  Calendar,
  Sparkles,
  Flame,
  Award,
  ArrowUpRight,
  TrendingUp,
  Cpu,
  BookOpen,
  Activity,
  Shield
} from 'lucide-react';
import { useGame } from '../context/GameContext';

export const QuestLogPage: React.FC = () => {
  const { logs } = useGame();

  const todayLogs = logs.filter(l => l.dateLabel === 'TODAY');
  const yesterdayLogs = logs.filter(l => l.dateLabel === 'YESTERDAY');
  const weekLogs = logs.filter(l => l.dateLabel === 'THIS WEEK');

  const renderSection = (title: string, items: typeof logs) => {
    if (items.length === 0) return null;

    return (
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: '0.12em',
            color: '#FF9E40',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <Calendar size={14} />
          <span>{title}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(log => {
            const isMilestone = log.isMilestone;
            return (
              <div
                key={log.id}
                className="hud-glass-panel"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: isMilestone
                    ? 'linear-gradient(90deg, rgba(255, 107, 43, 0.12) 0%, rgba(19, 26, 36, 0.8) 100%)'
                    : 'rgba(19, 26, 36, 0.65)',
                  border: isMilestone
                    ? '1px solid rgba(255, 107, 43, 0.4)'
                    : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-sm)',
                      background: isMilestone ? 'rgba(255, 107, 43, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isMilestone ? '#FF9E40' : 'var(--text-secondary)'
                    }}
                  >
                    {isMilestone ? <Award size={20} /> : <TrendingUp size={18} />}
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: isMilestone ? '#FF9E40' : '#F8FAFC' }}>
                      {isMilestone ? log.milestoneTitle : log.title}
                    </div>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}>
                      {log.category.toUpperCase()} • {log.timestamp}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {log.attributeChange && (
                    <span
                      style={{
                        padding: '2px 8px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderRadius: 'var(--radius-xs)',
                        fontFamily: 'var(--font-display)',
                        fontSize: 11,
                        color: '#38BDF8',
                        fontWeight: 700
                      }}
                    >
                      +{log.attributeChange.value} {log.attributeChange.attribute}
                    </span>
                  )}

                  {log.xp > 0 && (
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#38BDF8' }}>
                      +{log.xp} XP
                    </span>
                  )}

                  {log.embers !== 0 && (
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 13,
                        fontWeight: 700,
                        color: log.embers > 0 ? '#FF9E40' : '#EF4444'
                      }}
                    >
                      {log.embers > 0 ? `+${log.embers}` : log.embers} EMBERS
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
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
          RECORDED CHRONOLOGY
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>QUEST LOG</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          A historical timeline of every action logged, attribute point accrued, and milestone achieved.
        </p>
      </div>

      {renderSection('TODAY', todayLogs)}
      {renderSection('YESTERDAY', yesterdayLogs)}
      {renderSection('THIS WEEK', weekLogs)}
    </div>
  );
};
