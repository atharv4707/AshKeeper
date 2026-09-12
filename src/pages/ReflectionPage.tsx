import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Flame,
  Cpu,
  ArrowRight,
  Shield,
  Layers,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { LifeDNAVisualizer } from '../components/LifeDNAVisualizer';
import { Attributes } from '../types';

export const ReflectionPage: React.FC = () => {
  const { user, attributes, archetype } = useGame();

  // Synthetic last week attributes for before/after comparison
  const lastWeekAttributes: Attributes = {
    craft: Math.max(10, attributes.craft - 12),
    focus: Math.max(10, attributes.focus - 6),
    vigor: Math.max(10, attributes.vigor - 4),
    will: Math.max(10, attributes.will - 5)
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
          IDENTITY & INTROSPECTION
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>WHO YOU ARE BECOMING</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          "Your week, reflected through your actions." You are the compounding sum of your completed missions.
        </p>
      </div>

      {/* 4 Weekly Reflection Highlights */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginBottom: 32
        }}
      >
        <div
          className="hud-glass-panel"
          style={{
            padding: 20,
            background: 'rgba(19, 26, 36, 0.8)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 800, marginBottom: 6 }}>
            QUESTS COMPLETED
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#F8FAFC' }}>
            19 MISSIONS
          </div>
          <div style={{ fontSize: 11, color: '#34D399', fontWeight: 600, marginTop: 4 }}>
            +4 vs previous cycle
          </div>
        </div>

        <div
          className="hud-glass-panel"
          style={{
            padding: 20,
            background: 'rgba(19, 26, 36, 0.8)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 800, marginBottom: 6 }}>
            XP HARVESTED
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#38BDF8' }}>
            +820 XP
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
            82% to Level 08
          </div>
        </div>

        <div
          className="hud-glass-panel"
          style={{
            padding: 20,
            background: 'rgba(19, 26, 36, 0.8)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 800, marginBottom: 6 }}>
            EMBERS ACCRUED
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#FF9E40' }}>
            +420 EMBERS
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
            Vault ready for relics
          </div>
        </div>

        <div
          className="hud-glass-panel"
          style={{
            padding: 20,
            background: 'rgba(19, 26, 36, 0.8)',
            border: '1px solid rgba(255, 107, 43, 0.3)'
          }}
        >
          <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: '#FF9E40', fontWeight: 800, marginBottom: 6 }}>
            ACTIVE STREAK
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#F8FAFC' }}>
            7-DAY COMBO
          </div>
          <div style={{ fontSize: 11, color: '#FF9E40', fontWeight: 600, marginTop: 4 }}>
            Unbroken combustion
          </div>
        </div>
      </div>

      {/* STRONGEST ATTRIBUTE ANALYSIS CARD */}
      <div
        className="hud-glass-panel"
        style={{
          padding: 28,
          marginBottom: 32,
          background: 'linear-gradient(90deg, rgba(255, 107, 43, 0.12) 0%, rgba(19, 26, 36, 0.85) 100%)',
          border: '1px solid rgba(255, 107, 43, 0.4)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Cpu size={18} color="#FF9E40" />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 800, color: '#FF9E40', letterSpacing: '0.1em' }}>
            WEEKLY SYNTHESIS
          </span>
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
          THIS WEEK'S STRONGEST ATTRIBUTE: CRAFT (+12 POINTS)
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, maxWidth: 640, lineHeight: 1.6 }}>
          You spent substantial cognitive bandwidth building, shipping code, and architecting systems. Your vector field shifted noticeably eastward on the radar matrix.
        </p>
      </div>

      {/* SIDE-BY-SIDE LIFE DNA EVOLUTION: LAST WEEK → THIS WEEK */}
      <div
        className="hud-glass-panel"
        style={{
          padding: 32,
          marginBottom: 32,
          background: 'rgba(13, 17, 23, 0.9)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.12em' }}>
            MORPHOLOGICAL VECTOR DIVERGENCE
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>
            YOUR LIFE DNA: LAST WEEK → THIS WEEK
          </h3>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 60px 1fr',
            gap: 20,
            alignItems: 'center'
          }}
          className="dna-comparison-grid"
        >
          {/* Last Week */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: 12, fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-muted)' }}>
              LAST WEEK // BASELINE
            </div>
            <div
              style={{
                padding: 16,
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <LifeDNAVisualizer attributes={lastWeekAttributes} size="md" />
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
              Craft: {lastWeekAttributes.craft} • Focus: {lastWeekAttributes.focus} • Vigor: {lastWeekAttributes.vigor} • Will: {lastWeekAttributes.will}
            </div>
          </div>

          {/* Morph Arrow */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255, 107, 43, 0.15)',
                border: '1px solid #FF6B2B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(255, 107, 43, 0.3)'
              }}
            >
              <ArrowRight size={20} color="#FF9E40" />
            </div>
          </div>

          {/* This Week */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: 12, fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 700, color: '#FF9E40' }}>
              THIS WEEK // ASCENDED
            </div>
            <div
              style={{
                padding: 16,
                background: 'rgba(255, 107, 43, 0.05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255, 107, 43, 0.3)'
              }}
            >
              <LifeDNAVisualizer attributes={attributes} size="md" />
            </div>
            <div style={{ marginTop: 12, fontSize: 12, color: '#F8FAFC', fontWeight: 600 }}>
              Craft: {attributes.craft} • Focus: {attributes.focus} • Vigor: {attributes.vigor} • Will: {attributes.will}
            </div>
          </div>
        </div>
      </div>

      {/* ARCHETYPE EVOLUTION & NEXT HORIZON */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20
        }}
        className="archetype-horizon-grid"
      >
        <div
          className="hud-glass-panel"
          style={{
            padding: 24,
            background: 'rgba(19, 26, 36, 0.85)'
          }}
        >
          <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontWeight: 800, marginBottom: 8 }}>
            ACTIVE MANIFESTATION
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: archetype.color, marginBottom: 8 }}>
            CURRENT ARCHETYPE: {archetype.name}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            "You spent this week building." Your codebases and creative architecture reflect high internal resolve.
          </p>
        </div>

        <div
          className="hud-glass-panel"
          style={{
            padding: 24,
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(19, 26, 36, 0.85) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)'
          }}
        >
          <div style={{ fontSize: 11, fontFamily: 'var(--font-display)', color: '#38BDF8', fontWeight: 800, marginBottom: 8 }}>
            HORIZON PROJECTION
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: '#F8FAFC', marginBottom: 8 }}>
            NEXT ASCENSION: THE MASTER ARCHITECT
          </h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            If you continue your current pace of +12 Craft and +6 Focus, your vessel evolves into The Master Architect at Level 10.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dna-comparison-grid {
            grid-template-columns: 1fr !important;
          }
          .archetype-horizon-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
