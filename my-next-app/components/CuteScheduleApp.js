'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { palette, cardPalettes } from '../styles/palettes';
import { useIsMobile } from '../lib/hooks/useIsMobile';
import { headerActions } from '../lib/config/headerConfig';
import {
  BookIcon,
  WorkIcon,
  QuestionIcon,
} from './ui/Icons';

// Dynamic imports for better performance and code splitting
const CuteGlowCard = dynamic(() => import('./ui/CuteGlowCard'), {
  loading: () => <div style={{ width: '280px', height: '320px' }} />,
});

const Header = dynamic(() => import('./layout/Header'), {
  ssr: true,
});

const Sidebar = dynamic(() => import('./layout/Sidebar'), {
  ssr: true,
});

const CuteGradientBackground = dynamic(() => import('./ui/CuteGradientBackground'), {
  ssr: false,
});

export default function CuteScheduleApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();

  // Navigation handlers
  const handleNavigateToIdeas = () => {
    router.push('/ideas');
  };

  const handleNavigateToWork = () => {
    router.push('/work');
  };

  const handleNavigate = (path) => {
    router.push(path);
    setSidebarOpen(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
      }}
    >
      {/* Animated Background */}
      <CuteGradientBackground />

      {/* Floating Header */}
      <Header
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        headerActions={headerActions}
        palette={palette}
      />

      {/* Main Layout Container */}
      <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '5rem' }}>
        {/* Sidebar Navigation */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
          onNavigate={handleNavigate}
          activePath={pathname}
          palette={palette}
        />

        {/* Main Content Area */}
        <main
          style={{
            flex: 1,
            padding: '2rem',
            position: 'relative',
            zIndex: 1,
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 5rem)',
            transition: 'margin-left 0.3s ease',
            marginLeft: !isMobile && !sidebarOpen ? '0' : '0'
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Welcome Section - Currently Empty */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '3rem',
                position: 'relative',
                zIndex: 10
              }}
            />

            {/* Cards Section */}
            <div
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '2rem',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 0',
              }}
            >
              {/* Idea Book Card */}
              <CuteGlowCard
                title="Idea Book"
                description="Write down any thought or inspiration. You can organize them later."
                icon={<BookIcon size={24} />}
                glowColor="primary"
                onClick={handleNavigateToIdeas}
                transform="rotate(-2deg)"
                hoverTransform="rotate(0deg) scale(1.02)"
                cardPalette={cardPalettes.idea}
              />

              {/* Work Desk Card */}
              <CuteGlowCard
                title="Work Desk"
                description="Manage your daily tasks and goals here. Keep everything in order."
                icon={<WorkIcon size={24} />}
                glowColor="secondary"
                onClick={handleNavigateToWork}
                transform="rotate(2deg)"
                hoverTransform="rotate(0deg) scale(1.02)"
                cardPalette={cardPalettes.work}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Tour Button */}
      <button
        onClick={() => alert('Tour started!')}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          width: '3rem',
          height: '3rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '1.25rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}
        title="Start Tour"
      >
        <QuestionIcon size={24} />
      </button>
    </div>
  );
}
