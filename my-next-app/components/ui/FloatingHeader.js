'use client';

import { theme } from '../../styles/theme';

/**
 * Floating Header Component
 * شامل: App Logo, Search Bar, Sidebar Toggle, Theme Toggle, User Button
 */
export default function FloatingHeader({ 
  sidebarOpen = false, 
  setSidebarOpen, 
  isMobile = false,
  searchValue = '',
  onSearchChange,
  onThemeToggle,
  onUserClick,
  className = ''
}) {
  return (
    <div 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4 ${className}`}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '9999px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.5rem'
          }}
        >
          {/* App Name & Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span
                style={{
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}
              >
                CS
              </span>
            </div>
            <h1
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: '1.125rem',
                margin: 0,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                display: isMobile ? 'none' : 'block'
              }}
            >
              Cute Schedule
            </h1>
          </div>

          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '300px', margin: '0 1rem' }}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <input
                type="text"
                placeholder="Search schedules..."
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem 0.5rem 2.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '9999px',
                  color: 'white',
                  fontSize: '0.875rem',
                  outline: 'none',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(255, 255, 255, 0.6)',
                  pointerEvents: 'none'
                }}
              >
                🔍
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen?.(!sidebarOpen)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: sidebarOpen 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                fontSize: '1.2rem'
              }}
              title={sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = sidebarOpen 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              {sidebarOpen ? '✕' : '☰'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              title="Toggle Theme"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              🌙
            </button>

            {/* User Button */}
            <button
              onClick={onUserClick}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: 'none',
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
              title="User Profile"
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 6px 16px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
              }}
            >
              👤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}