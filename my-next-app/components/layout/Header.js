'use client';

import { theme } from '../../styles/theme';

const MenuIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
  >
    <path d="M4 7h16" />
    <path d="M7 12h13" />
    <path d="M4 17h16" />
  </svg>
);

const SearchIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-3.4-3.4" />
  </svg>
);

const CalendarIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M8 3.5v3" />
    <path d="M16 3.5v3" />
    <path d="M3.5 10h17" />
    <path d="M9 14h6" />
  </svg>
);

const BellIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18.5 16.5H5.5l1-1.5a5 5 0 0 0 .9-2.9V10a5.6 5.6 0 0 1 11.2 0v2.1a5 5 0 0 0 .9 2.9l1 1.5Z" />
    <path d="M10 18.5a2 2 0 0 0 4 0" />
  </svg>
);

export default function Header({ onMenuClick, isMobile }) {
  const headerActions = [
    { label: 'Search schedule', Icon: SearchIcon },
    { label: 'Daily planner', Icon: CalendarIcon },
    { label: 'Notifications', Icon: BellIcon }
  ];

  const headerStyles = {
    container: {
      background: `linear-gradient(120deg, ${theme.alphaColors.backgroundF5} 0%, ${theme.alphaColors.background90} 100%)`,
      borderBottom: `1px solid ${theme.alphaColors.primary20}`,
      backdropFilter: 'blur(24px)',
      padding: `${theme.spacing.md} ${theme.spacing.xl}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 10,
      boxShadow: '0 10px 34px rgba(108, 140, 255, 0.14)'
    },

    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.md
    },

    menuButton: {
      width: '40px',
      height: '40px',
      borderRadius: theme.radius.button,
      border: `1px solid ${theme.alphaColors.primary20}`,
      background: 'rgba(255, 255, 255, 0.78)',
      cursor: 'pointer',
      color: theme.colors.primary,
      display: isMobile ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: theme.transitions.normal,
      boxShadow: '0 8px 20px rgba(108, 140, 255, 0.12)'
    },

    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.sm
    },

    brandBadge: {
      width: '42px',
      height: '42px',
      borderRadius: '14px',
      background: 'linear-gradient(140deg, #6C8CFF 0%, #8AD7F4 100%)',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: theme.typography.sizes.base,
      fontWeight: theme.typography.weights.bold,
      letterSpacing: '0.08em',
      boxShadow: theme.shadows.primary
    },

    brandText: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.2rem'
    },

    brandTitle: {
      margin: 0,
      fontSize: theme.typography.sizes['2xl'],
      fontWeight: theme.typography.weights.semibold,
      color: theme.colors.textPrimary
    },

    brandSubtitle: {
      margin: 0,
      fontSize: theme.typography.sizes.sm,
      color: theme.colors.textSecondary,
      letterSpacing: '0.18em',
      textTransform: 'uppercase'
    },

    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.md
    },

    iconGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.sm
    },

    iconButton: {
      width: '42px',
      height: '42px',
      borderRadius: theme.radius.button,
      border: `1px solid ${theme.alphaColors.primary20}`,
      background: 'rgba(255, 255, 255, 0.88)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colors.primary,
      cursor: 'pointer',
      transition: theme.transitions.normal,
      boxShadow: '0 12px 28px rgba(108, 140, 255, 0.12)'
    }
  };

  const setMenuHover = (element, isHovering) => {
    if (!element) return;
    if (isHovering) {
      element.style.background = 'linear-gradient(140deg, rgba(108, 140, 255, 0.18) 0%, rgba(138, 215, 244, 0.18) 100%)';
      element.style.transform = 'translateY(-2px)';
      element.style.boxShadow = theme.shadows.primary;
    } else {
      element.style.background = 'rgba(255, 255, 255, 0.78)';
      element.style.transform = 'translateY(0)';
      element.style.boxShadow = '0 8px 20px rgba(108, 140, 255, 0.12)';
    }
  };

  const setActionHover = (element, isHovering) => {
    if (!element) return;
    if (isHovering) {
      element.style.background = 'linear-gradient(140deg, rgba(108, 140, 255, 0.22) 0%, rgba(138, 215, 244, 0.22) 100%)';
      element.style.color = theme.colors.textPrimary;
      element.style.transform = 'translateY(-2px)';
      element.style.boxShadow = theme.shadows.primary;
    } else {
      element.style.background = 'rgba(255, 255, 255, 0.88)';
      element.style.color = theme.colors.primary;
      element.style.transform = 'translateY(0)';
      element.style.boxShadow = '0 12px 28px rgba(108, 140, 255, 0.12)';
    }
  };

  return (
    <header style={headerStyles.container}>
      <div style={headerStyles.leftSection}>
        <button
          onClick={onMenuClick}
          style={headerStyles.menuButton}
          onMouseEnter={(event) => setMenuHover(event.currentTarget, true)}
          onMouseLeave={(event) => setMenuHover(event.currentTarget, false)}
        >
          <MenuIcon size={20} />
        </button>

        <div style={headerStyles.brand}>
          <span style={headerStyles.brandBadge}>CS</span>
          <div style={headerStyles.brandText}>
            <h1 style={headerStyles.brandTitle}>Cute Schedule</h1>
            <span style={headerStyles.brandSubtitle}>plan • focus • glow</span>
          </div>
        </div>
      </div>

      <div style={headerStyles.rightSection}>
        <div style={headerStyles.iconGroup}>
          {headerActions.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              style={headerStyles.iconButton}
              onMouseEnter={(event) => setActionHover(event.currentTarget, true)}
              onMouseLeave={(event) => setActionHover(event.currentTarget, false)}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
