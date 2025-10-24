'use client';

import { useEffect, useRef } from 'react';
import { theme } from '../../styles/theme';

// Base Glow Card Component
const GlowCard = ({ children, glowColor = 'blue', className = '', transform, hoverTransform, onClick }) => {
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const syncPointer = (e) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const { clientX: x, clientY: y } = e;
        if (cardRef.current) {
          cardRef.current.style.setProperty('--x', x.toFixed(2));
          cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
          cardRef.current.style.setProperty('--y', y.toFixed(2));
          cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
        }
      });
    };

    document.addEventListener('pointermove', syncPointer);
    return () => {
      document.removeEventListener('pointermove', syncPointer);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const glowColorMap = {
    primary: { base: 0, spread: 30 },
    secondary: { base: 50, spread: 30 },
  };

  const { base, spread } = glowColorMap[glowColor] || glowColorMap.primary;

  const cardStyle = {
    '--base': base,
    '--spread': spread,
    '--radius': '16',
    '--border': '2',
    '--backdrop': theme.colors.cardBackground,
    '--backup-border': glowColor === 'primary' ? theme.colors.primary : theme.colors.secondary,
    '--size': '120',
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 120) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    width: '320px',
    height: '400px',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      ${glowColor === 'primary' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(255, 217, 61, 0.1)'}, transparent
    )`,
    backgroundColor: theme.colors.cardBackground,
    border: `2px solid ${glowColor === 'primary' ? theme.colors.primary : theme.colors.secondary}`,
    borderRadius: '16px',
    position: 'relative',
    padding: '1.5rem',
    boxShadow: `0 8px 32px ${glowColor === 'primary' ? 'rgba(255, 107, 107, 0.15)' : 'rgba(255, 217, 61, 0.15)'}`,
    transform: transform,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  };

  const handleMouseEnter = () => {
    if (cardRef.current && hoverTransform) {
      cardRef.current.style.transform = hoverTransform;
      cardRef.current.style.boxShadow = '0 12px 48px rgba(0,0,0,0.15)';
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && transform) {
      cardRef.current.style.transform = transform;
      cardRef.current.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
    }
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          [data-glow]::before {
            content: "";
            position: absolute;
            inset: calc(var(--border-size) * -1);
            border: var(--border-size) solid transparent;
            border-radius: calc(var(--radius) * 1px);
            background: radial-gradient(
              calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
              calc(var(--x, 0) * 1px)
              calc(var(--y, 0) * 1px),
              hsl(var(--hue, 210) 100% 50% / 1), transparent 100%
            );
            background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
            background-position: 50% 50%;
            background-attachment: fixed;
            mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
            mask-clip: padding-box, border-box;
            mask-composite: intersect;
            pointer-events: none;
            filter: brightness(1.5);
          }
        `,
        }}
      />
      <div
        ref={cardRef}
        data-glow
        style={cardStyle}
        className={className}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={innerRef} data-glow style={{ position: 'absolute', inset: 0, opacity: 0.8, borderRadius: '14px' }} />
        {children}
      </div>
    </>
  );
};

// Main Cute Glow Card Component
export default function CuteGlowCard({
  title,
  description,
  icon,
  glowColor,
  onClick,
  onAddItem,
  transform,
  hoverTransform,
}) {
  const accentColor = glowColor === 'primary' ? theme.colors.primary : theme.colors.secondary;

  return (
    <GlowCard
      glowColor={glowColor}
      transform={transform}
      hoverTransform={hoverTransform}
      onClick={onClick}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          zIndex: 10,
          gap: '1.25rem',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {icon && (
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: accentColor,
                }}
              >
                {icon}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '3px',
                  borderRadius: '9999px',
                  background: accentColor,
                  opacity: 0.35,
                }}
              />
              <h3
                style={{
                  fontSize: '1.45rem',
                  fontWeight: '600',
                  margin: 0,
                  color: theme.colors.textPrimary,
                  letterSpacing: '-0.01em',
                }}
              >
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onAddItem}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              border: 'none',
              background: accentColor,
              color: theme.colors.background,
              cursor: 'pointer',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: `0 4px 12px ${
                accentColor + '40'
              }`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            +
          </button>
        </div>

        {/* Description */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '1rem',
              color: theme.colors.textSecondary,
              lineHeight: '1.6',
              maxWidth: '250px',
            }}
          >
            {description}
          </p>
        </div>

      </div>
    </GlowCard>
  );
}
