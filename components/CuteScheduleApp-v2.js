'use client';

import { useState, useEffect } from 'react';
import { theme } from '../styles/theme';
import CuteGradientBackground from './ui/SimpleBackground';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import GlowCard from './ui/GlowCard';
import { BookIcon, WorkIcon, QuestionIcon } from './ui/Icons';

export default function CuteScheduleApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigateToIdeas = () => {
    console.log('Navigate to Idea Book page');
    // Future: Navigate to ideas page
  };

  const handleNavigateToWork = () => {
    console.log('Navigate to Work Desk page');
    // Future: Navigate to work page
  };

  const handleStartTour = () => {
    console.log('Starting guided tour...');
    // Future: Implement guided tour
  };

  const appStyles = {
    container: {
      minHeight: '100vh',
      fontFamily: theme.typography.fontFamily,
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      zIndex: 1
    },
    
    layout: {
      display: 'flex',
      minHeight: 'calc(100vh - 73px)'
    },
    
    mainContent: {
      flex: 1,
      padding: theme.spacing.xl,
      position: 'relative',
      zIndex: 1,
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 73px)'
    },
    
    contentContainer: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    
    welcomeSection: {
      textAlign: 'center',
      marginBottom: theme.spacing.xxl,
      position: 'relative',
      zIndex: 10
    },
    
    welcomeTitle: {
      fontSize: theme.typography.sizes['4xl'],
      fontWeight: theme.typography.weights.bold,
      marginBottom: theme.spacing.md,
      margin: 0,
      background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent'
    },
    
    welcomeSubtitle: {
      color: theme.colors.textSecondary,
      margin: 0,
      fontSize: theme.typography.sizes.lg
    },
    
    cardsContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: theme.spacing.xl,
      alignItems: 'center',
      justifyContent: 'center'
    },
    
    tourButton: {
      position: 'fixed',
      bottom: theme.spacing.lg,
      right: theme.spacing.lg,
      width: '48px',
      height: '48px',
      backgroundColor: theme.colors.primary,
      color: theme.colors.background,
      border: 'none',
      borderRadius: theme.radius.button,
      cursor: 'pointer',
      fontSize: theme.typography.sizes.lg,
      boxShadow: theme.shadows.primary,
      zIndex: 30,
      transition: theme.transitions.normal
    }
  };

  return (
    <>
      {/* Background */}
      <CuteGradientBackground />
      
      <div style={appStyles.container}>
        {/* Header */}
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isMobile}
        />

        <div style={appStyles.layout}>
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
        />

        {/* Main Content */}
        <main style={appStyles.mainContent}>
          <div style={appStyles.contentContainer}>
            {/* Welcome Section */}
            <div style={appStyles.welcomeSection}>
              <h1 style={appStyles.welcomeTitle}>
                Welcome to Cute Schedule ✨
              </h1>
              <p style={appStyles.welcomeSubtitle}>
                Organize your ideas and get work done beautifully
              </p>
            </div>

            {/* Cards */}
            <div style={appStyles.cardsContainer}>
              {/* Idea Book Card */}
              <GlowCard
                title="📝 Idea Book"
                description="Write down any thought or inspiration. You can organize them later."
                icon={<BookIcon size={32} />}
                variant="primary"
                onClick={handleNavigateToIdeas}
                transform="rotate(-2deg)"
                hoverTransform="rotate(0deg) scale(1.02)"
              />
              
              {/* Work Desk Card */}
              <GlowCard
                title="💼 Work Desk"
                description="Manage your daily tasks and goals here. Keep everything in order."
                icon={<WorkIcon size={32} />}
                variant="secondary"
                onClick={handleNavigateToWork}
                transform="rotate(2deg)"
                hoverTransform="rotate(0deg) scale(1.02)"
              />
            </div>
          </div>
        </main>
      </div>

      {/* Tour Button */}
      <button
        onClick={handleStartTour}
        style={appStyles.tourButton}
        title="Start Tour"
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 8px 24px rgba(255, 107, 107, 0.4)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = theme.shadows.primary;
        }}
      >
        <QuestionIcon size={20} />
      </button>
      </div>
    </>
  );
}