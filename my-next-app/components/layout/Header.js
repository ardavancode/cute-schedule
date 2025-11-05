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
    <rect x="3.5" y="5" width={17} height={15} rx={2.5} />
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
    borderRadius: '18px',
    border: '1px solid rgba(33, 78, 93, 0.14)',
    background: active
      ? 'rgba(3, 121, 113, 0.16)'
      : 'rgba(240, 244, 247, 0.82)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: palette.deepTeal,
    cursor: 'pointer',
    transform: 'translateY(0)',
    transition:
      'transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, color 0.18s ease',
    boxShadow: active
      ? '0 12px 24px rgba(32, 78, 93, 0.22)'
      : '0 8px 20px rgba(33, 78, 93, 0.16)',
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
        maxWidth: isMobile ? '520px' : '660px',
        padding: isMobile ? '0 0.75rem' : '0 0.85rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '0.65rem' : '1rem',
          padding: isMobile ? '0.55rem 0.85rem' : '0.65rem 1.1rem',
          borderRadius: '20px',
          border: '1px solid rgba(3, 121, 113, 0.12)',
          background: 'linear-gradient(135deg, rgba(236, 245, 245, 0.92) 0%, rgba(236, 244, 247, 0.9) 100%)',
          boxShadow: '0 14px 30px rgba(3, 121, 113, 0.18)',
          backdropFilter: 'blur(18px)',
          transition: 'box-shadow 0.25s ease',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.45rem' : '0.65rem',
          }}
        >
          <button
            onClick={onToggleSidebar}
            type="button"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            style={iconButtonStyle(sidebarOpen)}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-2px)';
              event.currentTarget.style.boxShadow =
                '0 14px 28px rgba(3, 121, 113, 0.25)';
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
              <MenuIcon size={isMobile ? 16 : 18} />
            )}
          </button>

          <span
            style={{
              fontSize: isMobile ? '0.95rem' : '1.1rem',
              fontWeight: 500,
              color: theme.colors.textPrimary,
              letterSpacing: '0.04em',
            }}
          >
            Cute Schedule
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.5rem' : '0.65rem',
          }}
        >
          {headerActions.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              style={iconButtonStyle(false)}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = 'translateY(-2px)';
                event.currentTarget.style.boxShadow =
                  '0 12px 26px rgba(32, 78, 93, 0.24)';
              }}
              onMouseLeave={(event) =>
                resetIconButtonStyle(event.currentTarget)
              }
            >
              <Icon size={isMobile ? 16 : 18} />
            </button>
          ))}

          <button
            type="button"
            aria-label="Toggle theme"
            style={iconButtonStyle(false)}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-2px)';
              event.currentTarget.style.boxShadow =
                '0 12px 26px rgba(32, 78, 93, 0.24)';
            }}
            onMouseLeave={(event) => resetIconButtonStyle(event.currentTarget)}
          >
            <svg
              width={isMobile ? 16 : 18}
              height={isMobile ? 16 : 18}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="View profile"
            style={{
              width: isMobile ? '34px' : '38px',
              height: isMobile ? '34px' : '38px',
              borderRadius: '50%',
              border: '1px solid rgba(3, 121, 113, 0.16)',
              background: `linear-gradient(145deg, ${palette.emerald} 0%, ${palette.sapphire} 85%)`,
              color: '#FFFFFF',
              fontWeight: 500,
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transform: 'translateY(0)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 12px 28px rgba(3, 121, 113, 0.26)',
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-2px)';
              event.currentTarget.style.boxShadow =
                '0 16px 30px rgba(39, 93, 173, 0.32)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = 'translateY(0)';
              event.currentTarget.style.boxShadow =
                '0 12px 28px rgba(3, 121, 113, 0.26)';
            }}
          >
            YOU
          </button>
        </div>
      </div>
    </div>
  );
}
