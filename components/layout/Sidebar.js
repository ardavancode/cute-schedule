'use client';

import { theme } from '../../styles/theme';
import { HomeIcon, BookIcon, WorkIcon, TimerIcon, NotesIcon, CalendarIcon } from '../ui/Icons';

export default function Sidebar({ isOpen, onClose, isMobile }) {
  const mainMenuItems = [
    { icon: HomeIcon, label: 'Dashboard', active: true },
    { icon: BookIcon, label: 'Idea Book', active: false },
    { icon: WorkIcon, label: 'Work Desk', active: false }
  ];

  const toolItems = [
    { icon: TimerIcon, label: 'Timer' },
    { icon: NotesIcon, label: 'Notes' },
    { icon: CalendarIcon, label: 'Calendar' }
  ];

  const sidebarStyles = {
    backdrop: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      zIndex: 40,
      display: isMobile && isOpen ? 'block' : 'none'
    },
    
    container: {
      width: '256px',
      backgroundColor: theme.alphaColors.backgroundF5,
      backdropFilter: 'blur(15px)',
      borderRight: `1px solid ${theme.alphaColors.primary20}`,
      padding: theme.spacing.md,
      position: isMobile ? 'fixed' : 'static',
      left: 0,
      top: '73px',
      height: isMobile ? 'calc(100vh - 73px)' : 'auto',
      zIndex: 50,
      transform: isMobile && !isOpen ? 'translateX(-100%)' : 'translateX(0)',
      transition: `transform ${theme.transitions.normal}`,
      overflowY: 'auto'
    },
    
    section: {
      marginBottom: theme.spacing.xl
    },
    
    sectionTitle: {
      fontSize: theme.typography.sizes.xs,
      fontWeight: theme.typography.weights.semibold,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
      textTransform: 'uppercase',
      letterSpacing: '0.05em'
    },
    
    menuList: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.xs
    },
    
    menuItem: (active) => ({
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.sm,
      padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
      backgroundColor: active ? theme.colors.primary : 'transparent',
      color: active ? theme.colors.background : theme.colors.textPrimary,
      border: 'none',
      borderRadius: theme.radius.small,
      cursor: 'pointer',
      textAlign: 'left',
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
      transition: theme.transitions.normal
    }),
    
    toolItem: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.sm,
      padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
      backgroundColor: 'transparent',
      color: theme.colors.textPrimary,
      border: 'none',
      borderRadius: theme.radius.small,
      cursor: 'pointer',
      textAlign: 'left',
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium,
      transition: theme.transitions.normal
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isMobile && isOpen && (
        <div style={sidebarStyles.backdrop} onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside style={sidebarStyles.container}>
        {/* Main Navigation */}
        <div style={sidebarStyles.section}>
          <h3 style={sidebarStyles.sectionTitle}>
            Main
          </h3>
          <div style={sidebarStyles.menuList}>
            {mainMenuItems.map((item) => (
              <button
                key={item.label}
                style={sidebarStyles.menuItem(item.active)}
                onMouseOver={(e) => {
                  if (!item.active) {
                    e.target.style.backgroundColor = theme.alphaColors.primary10;
                  }
                }}
                onMouseOut={(e) => {
                  if (!item.active) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div style={sidebarStyles.section}>
          <h3 style={sidebarStyles.sectionTitle}>
            Tools
          </h3>
          <div style={sidebarStyles.menuList}>
            {toolItems.map((tool) => (
              <button
                key={tool.label}
                style={sidebarStyles.toolItem}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = theme.alphaColors.secondary10;
                  e.target.style.color = theme.colors.textPrimary;
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = theme.colors.textPrimary;
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