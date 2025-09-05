'use client';

import { theme } from '../../styles/theme';
import { MenuIcon } from '../ui/Icons';

export default function Header({ onMenuClick, isMobile }) {
  const headerStyles = {
    container: {
      backgroundColor: theme.alphaColors.background90,
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${theme.alphaColors.primary20}`,
      padding: `${theme.spacing.md} ${theme.spacing.lg}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10
    },
    
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.md
    },
    
    menuButton: {
      padding: theme.spacing.sm,
      border: 'none',
      background: theme.alphaColors.primary20,
      borderRadius: theme.radius.small,
      cursor: 'pointer',
      color: theme.colors.primary,
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: theme.transitions.normal
    },
    
    title: {
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.bold,
      margin: 0,
      color: theme.colors.textPrimary,
      textShadow: `0 2px 4px ${theme.alphaColors.primary20}`
    },
    
    goalsButton: {
      padding: `${theme.spacing.sm} ${theme.spacing.md}`,
      backgroundColor: theme.colors.primary,
      color: theme.colors.background,
      border: 'none',
      borderRadius: theme.radius.small,
      cursor: 'pointer',
      fontWeight: theme.typography.weights.medium,
      boxShadow: theme.shadows.small,
      transition: theme.transitions.normal,
      fontSize: theme.typography.sizes.sm
    }
  };

  return (
    <header style={headerStyles.container}>
      <div style={headerStyles.leftSection}>
        <button
          onClick={onMenuClick}
          style={headerStyles.menuButton}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = theme.alphaColors.primary40;
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = theme.alphaColors.primary20;
          }}
        >
          <MenuIcon size={20} />
        </button>
        
        <h1 style={headerStyles.title}>
          Cute Schedule
        </h1>
      </div>
      
      <button 
        style={headerStyles.goalsButton}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-1px)';
          e.target.style.boxShadow = theme.shadows.primary;
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = theme.shadows.small;
        }}
      >
        Today's Goals
      </button>
    </header>
  );
}