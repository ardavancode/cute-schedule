'use client';

import { useState, useRef, useEffect } from 'react';
import { theme } from '../../styles/theme';
import { StarIcon } from './Icons';

export default function GlowCard({ 
  title, 
  description, 
  icon, 
  variant = 'primary', // 'primary' or 'secondary'
  onClick,
  transform = 'rotate(0deg)',
  hoverTransform = 'rotate(0deg) scale(1.02)'
}) {
  const [showStars, setShowStars] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    
    const handleMouseMove = (e) => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      
      animationFrame = requestAnimationFrame(() => {
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setMousePosition({ x, y });
        }
      });
    };

    const element = cardRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    }
  }, []);

  const handleMouseEnter = () => setShowStars(true);
  const handleMouseLeave = () => setShowStars(false);

  const cardStyles = {
    container: {
      width: '320px',
      height: '400px',
      position: 'relative',
      cursor: 'pointer',
      transform,
      transition: theme.transitions.normal,
      borderRadius: theme.radius.card,
      overflow: 'hidden'
    },
    
    content: {
      width: '100%',
      height: '100%',
      background: theme.colors.cardBackground,
      border: `2px solid ${variant === 'primary' ? theme.colors.primary : theme.colors.secondary}`,
      borderRadius: theme.radius.card,
      padding: theme.spacing.lg,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 2,
      boxShadow: variant === 'primary' ? theme.shadows.card : theme.shadows.cardSecondary,
      transition: `all ${theme.transitions.normal}`
    },
    
    spotlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: theme.radius.card,
      pointerEvents: 'none',
      opacity: showStars ? 0.1 : 0,
      transition: `opacity ${theme.transitions.normal}`,
      background: `radial-gradient(circle 120px at ${mousePosition.x}px ${mousePosition.y}px, ${
        variant === 'primary' ? theme.colors.primary : theme.colors.secondary
      }40, transparent)`,
      zIndex: 1
    },
    
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: theme.spacing.lg
    },
    
    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.md
    },
    
    icon: {
      padding: theme.spacing.md,
      borderRadius: theme.radius.button,
      background: `linear-gradient(135deg, ${
        variant === 'primary' 
          ? `${theme.colors.primary}20 0%, ${theme.colors.primary}10 100%`
          : `${theme.colors.secondary}20 0%, ${theme.colors.secondary}10 100%`
      })`,
      color: variant === 'primary' ? theme.colors.primary : theme.colors.secondary,
      transform: showStars ? 'scale(1.1)' : 'scale(1)',
      transition: theme.transitions.normal
    },
    
    title: {
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.bold,
      margin: 0,
      color: showStars 
        ? (variant === 'primary' ? theme.colors.primary : theme.colors.secondary)
        : theme.colors.textPrimary,
      transition: theme.transitions.normal
    },
    
    addButton: {
      width: '40px',
      height: '40px',
      borderRadius: theme.radius.button,
      border: 'none',
      background: variant === 'primary' ? theme.colors.primary : theme.colors.secondary,
      color: theme.colors.background,
      cursor: 'pointer',
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: showStars ? 'scale(1.1) rotate(90deg)' : 'scale(1) rotate(0deg)',
      transition: theme.transitions.normal,
      boxShadow: variant === 'primary' ? theme.shadows.primary : theme.shadows.secondary
    },
    
    description: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    
    descriptionText: {
      fontSize: theme.typography.sizes.base,
      color: theme.colors.textSecondary,
      lineHeight: 1.6,
      maxWidth: '250px',
      margin: 0
    },
    
    starsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: theme.spacing.xs,
      marginTop: theme.spacing.sm,
      opacity: showStars ? 1 : 0,
      transition: theme.transitions.normal
    }
  };

  return (
    <div 
      ref={cardRef}
      style={cardStyles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = hoverTransform;
        e.currentTarget.style.boxShadow = variant === 'primary' 
          ? '0 12px 48px rgba(255, 107, 107, 0.25)' 
          : '0 12px 48px rgba(255, 217, 61, 0.25)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = transform;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Spotlight effect */}
      <div style={cardStyles.spotlight} />
      
      {/* Card content */}
      <div style={cardStyles.content}>
        {/* Header */}
        <div style={cardStyles.header}>
          <div style={cardStyles.iconContainer}>
            <div style={cardStyles.icon}>
              {icon}
            </div>
            <div>
              <h3 style={cardStyles.title}>
                {title}
              </h3>
            </div>
          </div>
          <button 
            style={cardStyles.addButton}
            onClick={(e) => {
              e.stopPropagation();
              onClick && onClick();
            }}
          >
            +
          </button>
        </div>

        {/* Description */}
        <div style={cardStyles.description}>
          <p style={cardStyles.descriptionText}>
            {description}
          </p>
        </div>

        {/* Animated Stars */}
        <div style={cardStyles.starsContainer}>
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i}
              size={16}
              style={{
                color: variant === 'primary' ? theme.colors.secondary : theme.colors.primary,
                animationDelay: `${i * 100}ms`,
                animation: showStars ? 'starPulse 1s ease-in-out infinite' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes starPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}