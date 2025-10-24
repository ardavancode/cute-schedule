'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { theme } from '../styles/theme';
import CuteGlowCard from './ui/CuteGlowCard';
import { BookIcon, WorkIcon, QuestionIcon, MenuIcon } from './ui/Icons';

// Utility function for className merging
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      const newTgX = event.clientX - rect.left;
      const newTgY = event.clientY - rect.top;
      
      // Only update if position changed significantly
      if (Math.abs(newTgX - tgX) > 2 || Math.abs(newTgY - tgY) > 2) {
        setTgX(newTgX);
        setTgY(newTgY);
      }
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 overflow-hidden",
        containerClassName
      )}
      style={{
        background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
        zIndex: -1
      }}
    >
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:blur(40px)]"
        )}
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
            onMouseMove={handleMouseMove}
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
      gradientBackgroundStart={theme.colors.background}
      gradientBackgroundEnd={theme.colors.cardBackground}
      firstColor="120, 160, 255"
      secondColor="164, 210, 255"
      thirdColor="132, 196, 235"
      fourthColor="96, 140, 220"
      fifthColor="172, 215, 250"
      pointerColor="150, 180, 255"
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
      <div style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: '100%',
        maxWidth: '512px',
        padding: '0 1rem'
      }}>
      <div style={{
        backgroundColor: 'rgba(228, 235, 255, 0.25)',
        backdropFilter: 'blur(26px)',
        borderRadius: '9999px',
        boxShadow: '0 20px 48px rgba(60, 90, 170, 0.25)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(104, 136, 230, 0.55)',
        outline: '1px solid rgba(255, 255, 255, 0.14)',
        outlineOffset: '-2px'
      }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.5rem'
          }}>
            {/* App Name */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
              <span style={{
                  color: 'rgba(240, 246, 255, 0.95)',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}>CS</span>
              </div>
              <h1 style={{
                color: 'rgba(238, 243, 255, 0.95)',
                fontWeight: '600',
                fontSize: '1.125rem',
                margin: 0,
                textShadow: '0 2px 6px rgba(40, 60, 120, 0.25)',
                display: isMobile ? 'none' : 'block'
              }}>
                Cute Schedule
              </h1>
            </div>

            {/* Search Bar */}
            <div style={{ flex: 1, maxWidth: '300px', margin: '0 1rem' }}>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  placeholder="Search schedules..."
                  style={{
                    width: '100%',
                    padding: '0.5rem 1rem 0.5rem 2.5rem',
                    backgroundColor: 'rgba(228, 235, 255, 0.2)',
                    border: '1px solid rgba(198, 208, 255, 0.35)',
                    borderRadius: '9999px',
                    color: theme.colors.textPrimary,
                    fontSize: '0.875rem',
                    outline: 'none',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'rgba(128, 152, 220, 0.8)'
                }}>
                  🔍
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Sidebar Toggle */}
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: sidebarOpen
                    ? theme.alphaColors.primary40
                    : theme.alphaColors.primary20,
                  color: sidebarOpen ? theme.colors.background : theme.colors.primary,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  fontSize: '1.2rem',
                  boxShadow: '0 10px 24px rgba(74, 106, 196, 0.25)'
                }}
                title={sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
              >
                {sidebarOpen ? '✕' : <MenuIcon size={18} />}
              </button>
              
              {/* Theme Toggle */}
              <button style={{
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
              }}>
                🌙
              </button>
              
              {/* User Button */}
              <button style={{
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
              }}>
                👤
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', minHeight: '100vh', paddingTop: '5rem' }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? '256px' : '0px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(15px)',
          borderRight: sidebarOpen ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
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
            <h3 style={{ fontSize: '0.75rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
              Main
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <button style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}>
                🏠 Dashboard
              </button>
              <button style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}>
                📖 Idea Book
              </button>
              <button style={{
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
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 192, 203, 0.8) 50%, rgba(186, 85, 211, 0.8) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                textShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}>
                Welcome to Cute Schedule ✨
              </h1>
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                margin: 0,
                fontSize: '1.1rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
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
