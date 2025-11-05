'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ideaTheme } from '../../app/ideas/theme';

type FloatingHomeButtonProps = {
  isMobile: boolean;
  top?: string;
  rightDesktop?: string;
  rightMobile?: string;
  leftDesktop?: string;
  leftMobile?: string;
  href?: string;
};

const {
  palette: ideaPalette,
  surfaces: ideaSurfaces,
  shadows: ideaShadows,
} = ideaTheme;

const HomeIcon = ({ size = 20 }: { size?: number }) => (
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
    <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-4h-4v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8.5Z" />
  </svg>
);

export function FloatingHomeButton({
  isMobile,
  top = '1.25rem',
  rightDesktop = '2.5rem',
  rightMobile = '1.25rem',
  leftDesktop,
  leftMobile,
  href = '/',
}: FloatingHomeButtonProps) {
  const [isHover, setIsHover] = useState(false);

  const desktopPosition = leftDesktop
    ? { left: leftDesktop }
    : { right: rightDesktop };

  const mobilePosition = leftMobile
    ? { left: leftMobile }
    : { right: rightMobile };

  const style = {
    position: 'absolute' as const,
    top,
    ...(isMobile ? mobilePosition : desktopPosition),
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ideaPalette.deepTeal,
    background: ideaSurfaces.overlaySoft,
    boxShadow: isHover ? ideaShadows.floatingButtonHover : ideaShadows.floatingButton,
    transform: isHover ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    zIndex: 60,
  };

  return (
    <Link
      href={href}
      style={style}
      aria-label="Back to home"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <HomeIcon />
    </Link>
  );
}
