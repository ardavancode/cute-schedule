'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { theme } from '../styles/theme';
import CuteGlowCard from './ui/CuteGlowCard';
import { BookIcon, WorkIcon, QuestionIcon, MenuIcon } from './ui/Icons';

const palette = {
  emerald: '#037971',
  deepTeal: '#214E5D',
  sapphire: '#275DAD',
  mist: '#D4F5F5',
  sand: '#F0EAD6',
};

const cardPalettes = {
  idea: {
    surface: 'rgba(212, 245, 245, 0.92)',
    border: 'rgba(3, 121, 113, 0.38)',
    highlight: 'rgba(3, 121, 113, 0.18)',
    shadow: '0 24px 48px rgba(3, 121, 113, 0.24)',
    accent: palette.emerald,
    text: 'rgba(33, 78, 93, 0.78)',
    buttonText: palette.sand,
    buttonShadow: '0 10px 28px rgba(3, 121, 113, 0.32)',
  },
  work: {
    surface: 'rgba(240, 234, 214, 0.92)',
    border: 'rgba(39, 93, 173, 0.36)',
    highlight: 'rgba(39, 93, 173, 0.18)',
    shadow: '0 24px 48px rgba(39, 93, 173, 0.24)',
    accent: palette.sapphire,
    text: 'rgba(33, 78, 93, 0.75)',
    buttonText: '#FFFFFF',
    buttonShadow: '0 10px 28px rgba(39, 93, 173, 0.32)',
  },
};

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

const PlannerIcon = ({ size = 18 }) => (
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

const MoonIcon = ({ size = 18 }) => (
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
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
);

// Utility function for className merging
// Background Gradient Animation Component
const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(72, 94, 200)",
  gradientBackgroundEnd = "rgb(18, 34, 92)",
  firstColor = "120, 160, 255",
  secondColor = "164, 210, 255",
  thirdColor = "132, 196, 235",
  fourthColor = "96, 140, 220",
  fifthColor = "172, 215, 250",
  pointerColor = "150, 180, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}) => {
  const interactiveRef = useRef(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
      document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
      document.body.style.setProperty("--first-color", firstColor);
      document.body.style.setProperty("--second-color", secondColor);
      document.body.style.setProperty("--third-color", thirdColor);
      document.body.style.setProperty("--fourth-color", fourthColor);
      document.body.style.setProperty("--fifth-color", fifthColor);
      document.body.style.setProperty("--pointer-color", pointerColor);
      document.body.style.setProperty("--size", size);
      document.body.style.setProperty("--blending-value", blendingValue);
    }
  }, [gradientBackgroundStart, gradientBackgroundEnd, firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue]);

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      if (!interactiveRef.current) return;
      setCurX(prev => prev + (tgX - prev) / 20);
      setCurY(prev => prev + (tgY - prev) / 20);
    }, 16);

    return () => clearInterval(moveInterval);
  }, [tgX, tgY]);

  useEffect(() => {
    if (interactiveRef.current) {
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
  }, [curX, curY]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const newTgX = event.clientX - centerX;
    const newTgY = event.clientY - centerY;

    if (Math.abs(newTgX - tgX) > 2 || Math.abs(newTgY - tgY) > 2) {
      setTgX(newTgX);
      setTgY(newTgY);
    }
  };

  return (
    <div
      className={containerClassName}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
        zIndex: -1
      }}
      onMouseMove={interactive ? handleMouseMove : undefined}
    >
      <div className={className}>{children}</div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          filter: isSafari ? 'blur(32px)' : 'blur(40px)',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            background: `radial-gradient(circle at center, rgba(${firstColor}, 0.8) 0%, rgba(${firstColor}, 0) 50%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            position: 'absolute',
            top: `calc(50% - ${size}/2)`,
            left: `calc(50% - ${size}/2)`,
            transformOrigin: 'center center',
            animation: 'moveVertical 30s ease infinite',
            opacity: 1
          }}
        />
        <div
          style={{
            background: `radial-gradient(circle at center, rgba(${secondColor}, 0.8) 0%, rgba(${secondColor}, 0) 50%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            position: 'absolute',
            top: `calc(50% - ${size}/2)`,
            left: `calc(50% - ${size}/2)`,
            transformOrigin: 'calc(50% - 400px)',
            animation: 'moveInCircle 20s reverse infinite',
            opacity: 1
          }}
        />
        <div
          style={{
            background: `radial-gradient(circle at center, rgba(${thirdColor}, 0.8) 0%, rgba(${thirdColor}, 0) 50%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            position: 'absolute',
            top: `calc(50% - ${size}/2)`,
            left: `calc(50% - ${size}/2)`,
            transformOrigin: 'calc(50% + 400px)',
            animation: 'moveInCircle 40s linear infinite',
            opacity: 1
          }}
        />
        <div
          style={{
            background: `radial-gradient(circle at center, rgba(${fourthColor}, 0.8) 0%, rgba(${fourthColor}, 0) 50%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            position: 'absolute',
            top: `calc(50% - ${size}/2)`,
            left: `calc(50% - ${size}/2)`,
            transformOrigin: 'calc(50% - 200px)',
            animation: 'moveHorizontal 40s ease infinite',
            opacity: 0.7
          }}
        />
        <div
          style={{
            background: `radial-gradient(circle at center, rgba(${fifthColor}, 0.8) 0%, rgba(${fifthColor}, 0) 50%)`,
            mixBlendMode: blendingValue,
            width: size,
            height: size,
            position: 'absolute',
            top: `calc(50% - ${size}/2)`,
            left: `calc(50% - ${size}/2)`,
            transformOrigin: 'calc(50% - 800px) calc(50% + 800px)',
            animation: 'moveInCircle 20s ease infinite',
            opacity: 1
          }}
        />
        {interactive && (
          <div
            ref={interactiveRef}
            style={{
              background: `radial-gradient(circle at center, rgba(${pointerColor}, 0.8) 0%, rgba(${pointerColor}, 0) 50%)`,
              mixBlendMode: blendingValue,
              width: '200%',
              height: '200%',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              opacity: 0.7,
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes moveHorizontal {
            0% { transform: translateX(-50%) translateY(-10%); }
            50% { transform: translateX(50%) translateY(10%); }
            100% { transform: translateX(-50%) translateY(-10%); }
          }
          @keyframes moveInCircle {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(180deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes moveVertical {
            0% { transform: translateY(-50%); }
            50% { transform: translateY(50%); }
            100% { transform: translateY(-50%); }
          }
        `
      }} />
    </div>
  );
};

// Cute Gradient Background Component
const CuteGradientBackground = () => {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgba(3, 121, 113, 0.75)"
      gradientBackgroundEnd="rgba(39, 93, 173, 0.78)"
      firstColor="3, 121, 113"
      secondColor="33, 78, 93"
      thirdColor="39, 93, 173"
      fourthColor="212, 245, 245"
      fifthColor="240, 234, 214"
      pointerColor="39, 93, 173"
      size="88%"
      blendingValue="soft-light"
      containerClassName="fixed inset-0"
      interactive={true}
    />
  );
};

// Icon Components
export default function CuteScheduleApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ideas, setIdeas] = useState([
    { id: 1, title: 'App redesign concept', date: '2024-01-15' },
    { id: 2, title: 'Weekend project', date: '2024-01-14' }
  ]);
  const router = useRouter();
  const [workItems, setWorkItems] = useState([
    { id: 1, title: 'Complete landing page', status: 'in-progress' },
    { id: 2, title: 'Review code changes', status: 'todo' }
  ]);
  const handleNavigateToIdeas = () => {
    router.push('/ideas');
  };
  const handleNavigateToWork = () => {
    router.push('/work');
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const addIdea = () => {
    const newIdea = {
      id: Date.now(),
      title: 'New Idea',
      date: new Date().toISOString().split('T')[0]
    };
    setIdeas([...ideas, newIdea]);
  };

  const addWorkItem = () => {
    const newItem = {
      id: Date.now(),
      title: 'New Task',
      status: 'todo'
    };
    setWorkItems([...workItems, newItem]);
  };

  const iconButtonStyle = (active = false) => ({
    width: isMobile ? '36px' : '42px',
    height: isMobile ? '36px' : '42px',
    borderRadius: '9999px',
    border: '1px solid rgba(33, 78, 93, 0.22)',
    background: active
      ? 'linear-gradient(145deg, rgba(3, 121, 113, 0.28) 0%, rgba(39, 93, 173, 0.32) 100%)'
      : 'rgba(212, 245, 245, 0.92)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: palette.deepTeal,
    cursor: 'pointer',
    transform: 'translateY(0)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease',
    boxShadow: active
      ? '0 18px 38px rgba(32, 78, 93, 0.28)'
      : '0 12px 28px rgba(33, 78, 93, 0.18)'
  });

  const resetIconButtonStyle = (element, active = false) => {
    if (!element) return;
    const base = iconButtonStyle(active);
    Object.entries(base).forEach(([property, value]) => {
      element.style[property] = value;
    });
  };

  const headerActions = [
    { label: 'Search schedule', Icon: SearchIcon },
    { label: 'Daily planner', Icon: PlannerIcon },
    { label: 'Notifications', Icon: BellIcon }
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: 'system-ui, sans-serif', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Cute Gradient Background */}
      <CuteGradientBackground />
      {/* Floating Header */}
      <div
        style={{
          position: 'fixed',
          top: isMobile ? '0.75rem' : '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          width: '100%',
          maxWidth: isMobile ? '560px' : '720px',
          padding: isMobile ? '0 0.75rem' : '0 1rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: isMobile ? '0.75rem' : '1.25rem',
            padding: isMobile ? '0.75rem 1rem' : '0.9rem 1.5rem',
            borderRadius: '26px',
            border: '1px solid rgba(3, 121, 113, 0.18)',
            background: 'linear-gradient(125deg, rgba(212, 245, 245, 0.9) 0%, rgba(240, 234, 214, 0.92) 55%, rgba(39, 93, 173, 0.22) 100%)',
            boxShadow: '0 28px 52px rgba(3, 121, 113, 0.25)',
            backdropFilter: 'blur(28px)',
            transition: 'box-shadow 0.3s ease'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '0.6rem' : '0.85rem'
            }}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              type="button"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              style={iconButtonStyle(sidebarOpen)}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = 'translateY(-2px)';
                event.currentTarget.style.boxShadow = '0 20px 40px rgba(3, 121, 113, 0.3)';
              }}
              onMouseLeave={(event) => resetIconButtonStyle(event.currentTarget, sidebarOpen)}
            >
              {sidebarOpen ? (
                <span style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1 }}>×</span>
              ) : (
                <MenuIcon size={isMobile ? 16 : 18} />
              )}
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '0.55rem' : '0.75rem'
              }}
            >
              <span
                style={{
                  width: isMobile ? '36px' : '42px',
                  height: isMobile ? '36px' : '42px',
                  borderRadius: '14px',
                  background: `linear-gradient(140deg, ${palette.emerald} 0%, ${palette.sapphire} 100%)`,
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  boxShadow: '0 16px 32px rgba(3, 121, 113, 0.35)'
                }}
              >
                CS
              </span>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem'
                }}
              >
                <span
                  style={{
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    fontWeight: 600,
                    color: theme.colors.textPrimary,
                    margin: 0
                  }}
                >
                  Cute Schedule
                </span>
                {!isMobile && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'rgba(33, 78, 93, 0.66)'
                    }}
                  >
                    plan · focus · glow
                  </span>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '0.6rem' : '0.75rem'
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
                  event.currentTarget.style.boxShadow = '0 18px 38px rgba(32, 78, 93, 0.28)';
                }}
                onMouseLeave={(event) => resetIconButtonStyle(event.currentTarget)}
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
                event.currentTarget.style.boxShadow = '0 18px 38px rgba(32, 78, 93, 0.28)';
              }}
              onMouseLeave={(event) => resetIconButtonStyle(event.currentTarget)}
            >
              <MoonIcon size={isMobile ? 16 : 18} />
            </button>

            <button
              type="button"
              aria-label="View profile"
              style={{
                width: isMobile ? '36px' : '42px',
                height: isMobile ? '36px' : '42px',
                borderRadius: '50%',
                border: '1px solid rgba(3, 121, 113, 0.18)',
                background: `linear-gradient(145deg, ${palette.emerald} 0%, ${palette.sapphire} 100%)`,
                color: '#FFFFFF',
                fontWeight: 600,
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transform: 'translateY(0)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                boxShadow: '0 18px 32px rgba(3, 121, 113, 0.35)'
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = 'translateY(-2px)';
                event.currentTarget.style.boxShadow = '0 22px 38px rgba(39, 93, 173, 0.42)';
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = 'translateY(0)';
                event.currentTarget.style.boxShadow = '0 18px 32px rgba(3, 121, 113, 0.35)';
              }}
            >
              YOU
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '5rem' }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? '256px' : '0px',
          background: 'linear-gradient(185deg, rgba(3, 121, 113, 0.26) 0%, rgba(33, 78, 93, 0.32) 55%, rgba(39, 93, 173, 0.25) 100%)',
          backdropFilter: 'blur(24px)',
          borderRight: sidebarOpen ? '1px solid rgba(3, 121, 113, 0.28)' : 'none',
          padding: sidebarOpen ? '5rem 1rem 1rem 1rem' : '0',
          position: 'fixed',
          left: 0,
          top: '0',
          height: '100vh',
          zIndex: 40,
          transform: !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'all 0.3s ease',
          overflow: 'hidden'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '600', color: 'rgba(240, 234, 214, 0.85)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
              Main
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <button
                onClick={() => {
                  router.push('/');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(212, 245, 245, 0.15)',
                  color: 'rgba(240, 234, 214, 0.95)',
                  border: '1px solid rgba(3, 121, 113, 0.25)',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: '0 12px 28px rgba(3, 121, 113, 0.25)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease'
                }}
              >
                🏠 Dashboard
              </button>
              <button
                onClick={() => {
                  router.push('/ideas');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(240, 234, 214, 0.12)',
                  color: 'rgba(240, 234, 214, 0.92)',
                  border: '1px solid rgba(3, 121, 113, 0.18)',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: '0 10px 24px rgba(3, 121, 113, 0.18)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease'
                }}
              >
                📖 Idea Book
              </button>
              <button
                onClick={() => {
                  router.push('/work');
                  setSidebarOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(240, 234, 214, 0.12)',
                  color: 'rgba(240, 234, 214, 0.92)',
                  border: '1px solid rgba(3, 121, 113, 0.18)',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: '0 10px 24px rgba(3, 121, 113, 0.18)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease'
                }}
              >
                💼 Work Desk
              </button>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Tools
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {['⏰ Timer', '📝 Notes', '📅 Calendar'].map(tool => (
                <button key={tool} style={{
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
                  textAlign: 'left'
                }}>
                  {tool}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ 
          flex: 1, 
          padding: '2rem', 
          position: 'relative', 
          zIndex: 1,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 5rem)',
          transition: 'margin-left 0.3s ease',
          marginLeft: !isMobile && !sidebarOpen ? '0' : '0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Welcome */}
            <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1rem', 
                margin: 0,
                background: `linear-gradient(135deg, ${palette.mist} 0%, ${palette.emerald} 40%, ${palette.sapphire} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 4px 8px rgba(3, 121, 113, 0.2)'
              }}>
                Welcome to Cute Schedule ✨
              </h1>
              <p style={{ 
                color: 'rgba(240, 234, 214, 0.85)', 
                margin: 0,
                fontSize: '1.05rem',
                textShadow: '0 2px 6px rgba(3, 121, 113, 0.25)'
              }}>
                Organize your ideas and get work done beautifully
              </p>
            </div>

            {/* Cards */}
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: '2rem',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
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
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
        title="Start Tour"
      >
        <QuestionIcon size={24} />
      </button>
    </div>
  );
}
