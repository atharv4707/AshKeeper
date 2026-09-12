import React, { useEffect, useRef } from 'react';
import { Attributes } from '../types';

interface LifeDNAVisualizerProps {
  attributes: Attributes;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  interactive?: boolean;
  onStatHover?: (stat: string | null) => void;
  showLabels?: boolean;
  className?: string;
}

export const LifeDNAVisualizer: React.FC<LifeDNAVisualizerProps> = ({
  attributes,
  size = 'lg',
  interactive = true,
  onStatHover,
  showLabels = true,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const dimension =
    size === 'sm' ? 180 : size === 'md' ? 260 : size === 'hero' ? 440 : 360;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    // Normalizing attribute weights (0 to 1 scale)
    const { craft, focus, vigor, will } = attributes;
    const maxVal = 100;
    const craftNorm = Math.min(1, Math.max(0.2, craft / maxVal));
    const focusNorm = Math.min(1, Math.max(0.2, focus / maxVal));
    const vigorNorm = Math.min(1, Math.max(0.2, vigor / maxVal));
    const willNorm = Math.min(1, Math.max(0.2, will / maxVal));

    const render = () => {
      t += 0.015;
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const baseR = Math.min(cx, cy) * 0.44;

      ctx.clearRect(0, 0, width, height);

      // 1. Ambient Background Core Glow
      const ambientGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, baseR * 1.6);
      ambientGlow.addColorStop(0, 'rgba(255, 107, 43, 0.22)');
      ambientGlow.addColorStop(0.35, 'rgba(56, 189, 248, 0.12)');
      ambientGlow.addColorStop(0.7, 'rgba(168, 85, 247, 0.05)');
      ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // 2. Tactical Concentric Orbital Rings
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 0.7, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.15, 0, Math.PI * 2);
      ctx.stroke();

      // Outer telemetry ring with rotating tick
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(255, 107, 43, 0.15)';
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.45, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating tick indicator
      const tickAngle = t * 0.4;
      const tx = cx + Math.cos(tickAngle) * baseR * 1.45;
      const ty = cy + Math.sin(tickAngle) * baseR * 1.45;
      ctx.fillStyle = '#FF9E40';
      ctx.beginPath();
      ctx.arc(tx, ty, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Four Directional Axis Lines
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy - baseR * 1.35); // Focus (Top)
      ctx.lineTo(cx, cy + baseR * 1.35); // Vigor (Bottom)
      ctx.moveTo(cx - baseR * 1.35, cy); // Will (Left)
      ctx.lineTo(cx + baseR * 1.35, cy); // Craft (Right)
      ctx.stroke();
      ctx.restore();

      // 4. Dynamic Organic Energy Ribbons (Life DNA Strands)
      const strands = [
        { color: 'rgba(255, 107, 43, 0.7)', speed: 1.2, phase: 0, amp: craftNorm },
        { color: 'rgba(56, 189, 248, 0.65)', speed: 0.9, phase: Math.PI / 2, amp: focusNorm },
        { color: 'rgba(168, 85, 247, 0.55)', speed: 1.4, phase: Math.PI, amp: willNorm },
        { color: 'rgba(16, 185, 129, 0.55)', speed: 0.75, phase: (Math.PI * 3) / 2, amp: vigorNorm }
      ];

      strands.forEach(strand => {
        ctx.save();
        ctx.beginPath();
        const steps = 40;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const wobble =
            Math.sin(theta * 3 + t * strand.speed + strand.phase) *
            baseR *
            0.18 *
            strand.amp;
          const r = baseR * (0.55 + strand.amp * 0.35) + wobble;
          const x = cx + Math.cos(theta) * r;
          const y = cy + Math.sin(theta) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = strand.color;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = strand.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      });

      // 5. Morphing Attribute Radar Polygon
      // Top: Focus, Right: Craft, Bottom: Vigor, Left: Will
      const pFocusY = cy - baseR * 1.2 * focusNorm;
      const pCraftX = cx + baseR * 1.2 * craftNorm;
      const pVigorY = cy + baseR * 1.2 * vigorNorm;
      const pWillX = cx - baseR * 1.2 * willNorm;

      ctx.save();
      const polyGrad = ctx.createLinearGradient(pWillX, pFocusY, pCraftX, pVigorY);
      polyGrad.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
      polyGrad.addColorStop(0.5, 'rgba(255, 107, 43, 0.25)');
      polyGrad.addColorStop(1, 'rgba(168, 85, 247, 0.18)');

      ctx.fillStyle = polyGrad;
      ctx.strokeStyle = 'rgba(255, 170, 70, 0.85)';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(255, 107, 43, 0.6)';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.moveTo(cx, pFocusY);
      ctx.lineTo(pCraftX, cy);
      ctx.lineTo(cx, pVigorY);
      ctx.lineTo(pWillX, cy);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Vertex Nodes
      const nodes = [
        { x: cx, y: pFocusY, color: '#38BDF8' },
        { x: pCraftX, y: cy, color: '#FF9E40' },
        { x: cx, y: pVigorY, color: '#34D399' },
        { x: pWillX, y: cy, color: '#C084FC' }
      ];

      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });
      ctx.restore();

      // 6. Central Pulsing Ash Core
      ctx.save();
      const corePulse = 1 + Math.sin(t * 2.5) * 0.08;
      const coreR = baseR * 0.22 * corePulse;

      const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, coreR);
      coreGrad.addColorStop(0, '#FFFFFF');
      coreGrad.addColorStop(0.3, '#FFE3D1');
      coreGrad.addColorStop(0.65, '#FF7A30');
      coreGrad.addColorStop(1, 'rgba(255, 107, 43, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // Floating ember particles
      for (let p = 0; p < 8; p++) {
        const pAngle = t * 0.8 + (p * Math.PI) / 4;
        const pDist = baseR * (0.28 + (Math.sin(t + p * 1.5) + 1) * 0.35);
        const px = cx + Math.cos(pAngle) * pDist;
        const py = cy + Math.sin(pAngle) * pDist;

        ctx.fillStyle = p % 2 === 0 ? 'rgba(255, 180, 80, 0.7)' : 'rgba(56, 189, 248, 0.6)';
        ctx.beginPath();
        ctx.arc(px, py, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [attributes, dimension]);

  return (
    <div
      className={`life-dna-container ${className}`}
      style={{
        position: 'relative',
        width: dimension,
        height: dimension,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <canvas
        ref={canvasRef}
        width={dimension}
        height={dimension}
        style={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />

      {showLabels && size !== 'sm' && (
        <>
          {/* Top: FOCUS */}
          <div
            onMouseEnter={() => onStatHover && onStatHover('FOCUS')}
            onMouseLeave={() => onStatHover && onStatHover(null)}
            style={{
              position: 'absolute',
              top: '6%',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: interactive ? 'pointer' : 'default',
              userSelect: 'none'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                background: 'rgba(9, 13, 20, 0.85)',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                borderRadius: 4,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 0 14px rgba(56, 189, 248, 0.2)'
              }}
            >
              <span style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: '#38BDF8', fontWeight: 700, letterSpacing: '0.1em' }}>
                FOCUS:
              </span>
              <span style={{ fontSize: 13, fontFamily: 'var(--font-display)', color: '#F8FAFC', fontWeight: 700 }}>
                {attributes.focus}
              </span>
            </div>
          </div>

          {/* Right: CRAFT */}
          <div
            onMouseEnter={() => onStatHover && onStatHover('CRAFT')}
            onMouseLeave={() => onStatHover && onStatHover(null)}
            style={{
              position: 'absolute',
              right: '2%',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: interactive ? 'pointer' : 'default',
              userSelect: 'none'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                background: 'rgba(9, 13, 20, 0.85)',
                border: '1px solid rgba(255, 107, 43, 0.4)',
                borderRadius: 4,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 0 14px rgba(255, 107, 43, 0.2)'
              }}
            >
              <span style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: '#FF9E40', fontWeight: 700, letterSpacing: '0.1em' }}>
                CRAFT:
              </span>
              <span style={{ fontSize: 13, fontFamily: 'var(--font-display)', color: '#F8FAFC', fontWeight: 700 }}>
                {attributes.craft}
              </span>
            </div>
          </div>

          {/* Bottom: VIGOR */}
          <div
            onMouseEnter={() => onStatHover && onStatHover('VIGOR')}
            onMouseLeave={() => onStatHover && onStatHover(null)}
            style={{
              position: 'absolute',
              bottom: '6%',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: interactive ? 'pointer' : 'default',
              userSelect: 'none'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                background: 'rgba(9, 13, 20, 0.85)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: 4,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 0 14px rgba(16, 185, 129, 0.2)'
              }}
            >
              <span style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: '#34D399', fontWeight: 700, letterSpacing: '0.1em' }}>
                VIGOR:
              </span>
              <span style={{ fontSize: 13, fontFamily: 'var(--font-display)', color: '#F8FAFC', fontWeight: 700 }}>
                {attributes.vigor}
              </span>
            </div>
          </div>

          {/* Left: WILL */}
          <div
            onMouseEnter={() => onStatHover && onStatHover('WILL')}
            onMouseLeave={() => onStatHover && onStatHover(null)}
            style={{
              position: 'absolute',
              left: '2%',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: interactive ? 'pointer' : 'default',
              userSelect: 'none'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                background: 'rgba(9, 13, 20, 0.85)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                borderRadius: 4,
                backdropFilter: 'blur(8px)',
                boxShadow: '0 0 14px rgba(168, 85, 247, 0.2)'
              }}
            >
              <span style={{ fontSize: 10, fontFamily: 'var(--font-display)', color: '#C084FC', fontWeight: 700, letterSpacing: '0.1em' }}>
                WILL:
              </span>
              <span style={{ fontSize: 13, fontFamily: 'var(--font-display)', color: '#F8FAFC', fontWeight: 700 }}>
                {attributes.will}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
