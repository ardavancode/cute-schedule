'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { theme } from '../styles/theme';
import CuteGlowCard from './ui/CuteGlowCard';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import { BookIcon, WorkIcon, QuestionIcon } from './ui/Icons';

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
  const pathname = usePathname();
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

  const headerActions = [
    { label: 'Search schedule', Icon: SearchIcon },
    { label: 'Daily planner', Icon: PlannerIcon },
    { label: 'Notifications', Icon: BellIcon }
  ];

  const handleNavigate = (path) => {
    router.push(path);
    setSidebarOpen(false);
  };

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
      <Header
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        headerActions={headerActions}
        palette={palette}
      />

      <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '5rem' }}>
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
          onNavigate={handleNavigate}
          activePath={pathname}
          palette={palette}
        />

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
