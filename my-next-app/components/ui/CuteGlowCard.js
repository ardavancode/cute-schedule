'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { theme } from '../../styles/theme';

export default function CuteGlowCard({
  title,
  description,
  icon,
  glowColor,
  onClick,
  onAddItem,
  cardPalette,
}) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const contentRef = useRef(null);
  const iconRef = useRef(null);

  const accentColor =
    (cardPalette && cardPalette.accent) ||
    (glowColor === 'primary' ? theme.colors.primary : theme.colors.secondary);
  const surfaceColor = (cardPalette && cardPalette.surface) || theme.colors.cardBackground;
  const borderColor = (cardPalette && cardPalette.border) || accentColor;
  const shadowColor = (cardPalette && cardPalette.shadow) || '0 8px 32px rgba(0,0,0,0.15)';
  const secondaryText = (cardPalette && cardPalette.text) || theme.colors.textSecondary;
  const buttonTextColor = (cardPalette && cardPalette.buttonText) || theme.colors.background;

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const content = contentRef.current;

    if (!card || !glow || !content) return;

    // Initial fade in animation on mount
    gsap.fromTo(card,
      {
        opacity: 0,
        scale: 0.95,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      }
    );

    // Mouse move effect - only move the glow
    const handleMouseMove = (e) => {
      if (!card || !glow) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      gsap.to(glow, {
        x: (x - centerX) * 0.5,
        y: (y - centerY) * 0.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
        duration: 0.3,
        ease: 'power2.out',
      });

      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1.1,
          duration: 0.3,
          ease: 'back.out(2)',
        });
      }
    };

    const handleMouseLeaveScale = () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: shadowColor,
        duration: 0.3,
        ease: 'power2.out',
      });

      if (iconRef.current) {
        gsap.to(iconRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeaveScale);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeaveScale);
    };
  }, [shadowColor]);

  const cardStyle = {
    width: '280px',
    height: '320px',
    backgroundColor: surfaceColor,
    border: `2px solid ${borderColor}`,
    borderRadius: '20px',
    position: 'relative',
    padding: '1.5rem',
    boxShadow: shadowColor,
    cursor: 'pointer',
    overflow: 'hidden',
  };

  return (
    <div ref={cardRef} style={cardStyle} onClick={onClick}>
      {/* Animated Glow Background */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200%',
          height: '200%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, ${accentColor}35 0%, ${accentColor}15 30%, transparent 60%)`,
          opacity: 0.6,
          pointerEvents: 'none',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
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
            marginBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {icon && (
              <div
                ref={iconRef}
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: accentColor,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}
              >
                {icon}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '3px',
                  borderRadius: '9999px',
                  background: accentColor,
                  opacity: 0.5,
                }}
              />
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: '600',
                  margin: 0,
                  color: theme.colors.textPrimary,
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </h3>
            </div>
          </div>

          {onAddItem && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddItem();
              }}
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                border: 'none',
                background: accentColor,
                color: buttonTextColor,
                cursor: 'pointer',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 12px ${accentColor}40`,
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.1,
                  rotation: 90,
                  duration: 0.3,
                  ease: 'back.out(2)',
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  rotation: 0,
                  duration: 0.3,
                  ease: 'power2.out',
                });
              }}
            >
              +
            </button>
          )}
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
              fontSize: '0.95rem',
              color: secondaryText,
              lineHeight: '1.6',
              maxWidth: '220px',
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}15 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accentColor}10 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
