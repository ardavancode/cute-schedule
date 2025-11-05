'use client';

import { theme } from '../../styles/theme';
import {
  HomeIcon,
  BookIcon,
  WorkIcon,
  TimerIcon,
  NotesIcon,
  CalendarIcon,
} from '../ui/Icons';

const defaultPalette = {
  emerald: '#037971',
  deepTeal: '#214E5D',
  sapphire: '#275DAD',
};

const mainMenuItems = [
  { icon: BookIcon, label: 'Idea Book', path: '/ideas' },
  { icon: WorkIcon, label: 'Work Desk', path: '/work' },
];

const toolItems = [
  { icon: TimerIcon, label: 'Timer' },
  { icon: NotesIcon, label: 'Notes' },
  { icon: CalendarIcon, label: 'Calendar' },
];

export default function Sidebar({
  isOpen,
  onClose,
  isMobile,
  onNavigate = (_path) => {},
  activePath = '/',
  palette = defaultPalette,
}) {
  const containerStyle = {
    width: '256px',
    background:
      'linear-gradient(185deg, rgba(3, 121, 113, 0.26) 0%, rgba(33, 78, 93, 0.32) 55%, rgba(39, 93, 173, 0.25) 100%)',
    backdropFilter: 'blur(24px)',
    borderRight: isOpen ? '1px solid rgba(3, 121, 113, 0.28)' : 'none',
    padding: isOpen ? '5rem 1rem 1rem 1rem' : '0',
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    zIndex: 50,
    transform: !isOpen ? 'translateX(-100%)' : 'translateX(0)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  };

  const sectionTitleStyle = {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'rgba(240, 234, 214, 0.85)',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
  };

  const menuListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  };

  const mainItemStyle = (active) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 0.75rem',
    background: active ? 'rgba(212, 245, 245, 0.18)' : 'transparent',
    color: 'rgba(240, 234, 214, 0.95)',
    border: '1px solid rgba(3, 121, 113, 0.18)',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
    boxShadow: active ? '0 14px 28px rgba(3, 121, 113, 0.22)' : 'none',
  });

  const toolItemStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: 'transparent',
    color: '#374151',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'transform 0.2s ease, background 0.2s ease',
  };

  const handleNavigate = (path) => {
    onNavigate(path);
    onClose?.();
  };

  return (
    <>
      {isMobile && isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 40,
          }}
          onClick={onClose}
        />
      )}

      <aside style={containerStyle}>
        <div>
          <h3 style={sectionTitleStyle}>Main</h3>
          <div style={menuListStyle}>
            {mainMenuItems.map((item) => {
              const active = activePath === item.path;
              return (
                <button
                  key={item.label}
                  style={mainItemStyle(active)}
                  onClick={() => handleNavigate(item.path)}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = 'translateY(-2px)';
                    event.currentTarget.style.boxShadow =
                      '0 16px 32px rgba(3, 121, 113, 0.22)';
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = 'translateY(0)';
                    event.currentTarget.style.boxShadow = active
                      ? '0 14px 28px rgba(3, 121, 113, 0.22)'
                      : 'none';
                  }}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 style={sectionTitleStyle}>Tools</h3>
          <div style={menuListStyle}>
            {toolItems.map((tool) => (
              <button
                key={tool.label}
                style={toolItemStyle}
                onMouseEnter={(event) => {
                  event.currentTarget.style.transform = 'translateY(-2px)';
                  event.currentTarget.style.background =
                    'rgba(240, 234, 214, 0.18)';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.transform = 'translateY(0)';
                  event.currentTarget.style.background = 'transparent';
                }}
              >
                <tool.icon size={18} />
                <span>{tool.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
