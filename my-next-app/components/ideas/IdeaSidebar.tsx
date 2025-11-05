'use client';

import { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import { MenuIcon } from '../ui/Icons';
import { ideaTheme } from '../../app/ideas/theme';

const CloseIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);

type IdeaSidebarProps = {
  isOpen: boolean;
  isMobile: boolean;
  activePath: string | null;
  onToggle: () => void;
  onClose: () => void;
  onNavigate: (path: string) => void;
};

const {
  palette: ideaPalette,
  surfaces: ideaSurfaces,
  shadows: ideaShadows,
  sidebarPalette,
} = ideaTheme;

export function IdeaSidebar({
  isOpen,
  isMobile,
  activePath,
  onToggle,
  onClose,
  onNavigate,
}: IdeaSidebarProps) {
  const [isHover, setIsHover] = useState(false);

  const toggleButtonStyle = {
    position: 'absolute' as const,
    top: '1.25rem',
    left: '1.25rem',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: ideaSurfaces.overlaySoft,
    color: ideaPalette.deepTeal,
    boxShadow: isHover ? ideaShadows.floatingButtonHover : ideaShadows.floatingButton,
    cursor: 'pointer',
    transform: isHover ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    zIndex: 60,
  };

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        onClose={onClose}
        isMobile={isMobile}
        onNavigate={onNavigate}
        activePath={activePath}
        palette={sidebarPalette}
      />
      <button
        type="button"
        onClick={onToggle}
        style={toggleButtonStyle}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
      </button>
    </>
  );
}
