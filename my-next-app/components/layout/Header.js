'use client';

import { theme } from '../../styles/theme';
import { MenuIcon, SearchIcon, CalendarIcon, BellIcon, MoonIcon } from '../ui/Icons';

const defaultPalette = {
  emerald: '#037971',
  deepTeal: '#214E5D',
  sapphire: '#275DAD',
};

const defaultActions = [
  { label: 'Search schedule', Icon: SearchIcon },
  { label: 'Daily planner', Icon: CalendarIcon },
  { label: 'Notifications', Icon: BellIcon },
];

export default function Header({
  isMobile,
  sidebarOpen,
  onToggleSidebar,
  headerActions = defaultActions,
  palette = defaultPalette,
}) {
  const iconButtonStyle = (active = false) => ({
    width: isMobile ? '32px' : '36px',
    height: isMobile ? '32px' : '36px',
    borderRadius: '9999px',
    border: '1px solid rgba(33, 78, 93, 0.15)',
    background: active
      ? 'rgba(3, 121, 113, 0.15)'
      : 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: palette.deepTeal,
    cursor: 'pointer',
    transform: 'translateY(0)',
    transition:
      'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease',
    boxShadow: active
      ? '0 4px 12px rgba(3, 121, 113, 0.2)'
      : '0 2px 8px rgba(33, 78, 93, 0.1)',
  });

  const resetIconButtonStyle = (element, active = false) => {
    if (!element) return;
    const base = iconButtonStyle(active);
    Object.entries(base).forEach(([property, value]) => {
      element.style[property] = value;
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: isMobile ? '0.75rem' : '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: '100%',
        maxWidth: isMobile ? '560px' : '720px',
        padding: isMobile ? '0 0.75rem' : '0 1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '0.75rem' : '1rem',
          padding: isMobile ? '0.5rem 0.875rem' : '0.625rem 1.25rem',
          borderRadius: '20px',
          border: '1px solid rgba(3, 121, 113, 0.15)',
          background: 'rgba(212, 245, 245, 0.75)',
          boxShadow: '0 8px 32px rgba(3, 121, 113, 0.15)',
          backdropFilter: 'blur(20px)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.55rem' : '0.75rem',
          }}
        >
          <button
            onClick={onToggleSidebar}
            type="button"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            style={iconButtonStyle(sidebarOpen)}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-1px)';
              event.currentTarget.style.boxShadow =
                '0 4px 16px rgba(3, 121, 113, 0.25)';
            }}
            onMouseLeave={(event) =>
              resetIconButtonStyle(event.currentTarget, sidebarOpen)
            }
          >
            {sidebarOpen ? (
              <span style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1 }}>
                ×
              </span>
            ) : (
              <MenuIcon size={isMobile ? 14 : 16} />
            )}
          </button>

          <span
            style={{
              fontSize: isMobile ? '0.875rem' : '1rem',
              fontWeight: 600,
              color: theme.colors.textPrimary,
              letterSpacing: '0.02em',
            }}
          >
            Cute Schedule
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.6rem' : '0.75rem',
          }}
        >
          {headerActions.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              style={iconButtonStyle(false)}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = 'translateY(-1px)';
                event.currentTarget.style.boxShadow =
                  '0 4px 16px rgba(3, 121, 113, 0.2)';
              }}
              onMouseLeave={(event) =>
                resetIconButtonStyle(event.currentTarget)
              }
            >
              <Icon size={isMobile ? 14 : 16} />
            </button>
          ))}

          <button
            type="button"
            aria-label="Toggle theme"
            style={iconButtonStyle(false)}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-1px)';
              event.currentTarget.style.boxShadow =
                '0 4px 16px rgba(3, 121, 113, 0.2)';
            }}
            onMouseLeave={(event) => resetIconButtonStyle(event.currentTarget)}
          >
            <MoonIcon size={isMobile ? 14 : 16} />
          </button>

          <button
            type="button"
            aria-label="View profile"
            style={{
              width: isMobile ? '32px' : '36px',
              height: isMobile ? '32px' : '36px',
              borderRadius: '50%',
              border: '1px solid rgba(3, 121, 113, 0.2)',
              background: `linear-gradient(145deg, ${palette.emerald} 0%, ${palette.sapphire} 100%)`,
              color: '#FFFFFF',
              fontSize: isMobile ? '0.65rem' : '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transform: 'translateY(0)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 2px 8px rgba(3, 121, 113, 0.25)',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-1px)';
              event.currentTarget.style.boxShadow =
                '0 4px 16px rgba(3, 121, 113, 0.35)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = 'translateY(0)';
              event.currentTarget.style.boxShadow =
                '0 2px 8px rgba(3, 121, 113, 0.25)';
            }}
          >
            YOU
          </button>
        </div>
      </div>
    </div>
  );
}
