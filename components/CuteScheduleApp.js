'use client';

import { useState, useEffect, useRef } from 'react';
import { theme } from '../styles/theme';

// Utility function for className merging
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Background Gradient Animation Component
const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
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
      firstColor="255, 107, 107"
      secondColor="255, 217, 61"
      thirdColor="255, 245, 225"
      fourthColor="255, 182, 182"
      fifthColor="255, 235, 153"
      pointerColor="255, 107, 107"
      containerClassName="fixed inset-0"
      interactive={true}
    />
  );
};

// Icon Components
const BookIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WorkIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StarIcon = ({ className, style }) => (
  <svg className={className} style={style} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

// Glow Card Component
const GlowCard = ({ children, glowColor = 'blue', className = '', transform, hoverTransform }) => {
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    
    const syncPointer = (e) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        const { clientX: x, clientY: y } = e;
        if (cardRef.current) {
          cardRef.current.style.setProperty('--x', x.toFixed(2));
          cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
          cardRef.current.style.setProperty('--y', y.toFixed(2));
          cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
        }
      });
    };
    
    document.addEventListener('pointermove', syncPointer);
    return () => {
      document.removeEventListener('pointermove', syncPointer);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const glowColorMap = {
    primary: { base: 0, spread: 30 },
    secondary: { base: 50, spread: 30 },
  };

  const { base, spread } = glowColorMap[glowColor] || glowColorMap.primary;

  const cardStyle = {
    '--base': base,
    '--spread': spread,
    '--radius': '16',
    '--border': '2',
    '--backdrop': theme.colors.cardBackground,
    '--backup-border': glowColor === 'primary' ? theme.colors.primary : theme.colors.secondary,
    '--size': '120',
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 120) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    width: '320px',
    height: '400px',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      ${glowColor === 'primary' ? 'rgba(255, 107, 107, 0.1)' : 'rgba(255, 217, 61, 0.1)'}, transparent
    )`,
    backgroundColor: theme.colors.cardBackground,
    border: `2px solid ${glowColor === 'primary' ? theme.colors.primary : theme.colors.secondary}`,
    borderRadius: '16px',
    position: 'relative',
    padding: '1.5rem',
    boxShadow: `0 8px 32px ${glowColor === 'primary' ? 'rgba(255, 107, 107, 0.15)' : 'rgba(255, 217, 61, 0.15)'}`,
    transform: transform,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  };

  const handleMouseEnter = () => {
    if (cardRef.current && hoverTransform) {
      cardRef.current.style.transform = hoverTransform;
      cardRef.current.style.boxShadow = '0 12px 48px rgba(0,0,0,0.15)';
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && transform) {
      cardRef.current.style.transform = transform;
      cardRef.current.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          [data-glow]::before {
            content: "";
            position: absolute;
            inset: calc(var(--border-size) * -1);
            border: var(--border-size) solid transparent;
            border-radius: calc(var(--radius) * 1px);
            background: radial-gradient(
              calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
              calc(var(--x, 0) * 1px)
              calc(var(--y, 0) * 1px),
              hsl(var(--hue, 210) 100% 50% / 1), transparent 100%
            );
            background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
            background-position: 50% 50%;
            background-attachment: fixed;
            mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
            mask-clip: padding-box, border-box;
            mask-composite: intersect;
            pointer-events: none;
            filter: brightness(1.5);
          }
        `
      }} />
      <div
        ref={cardRef}
        data-glow
        style={cardStyle}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={innerRef} data-glow style={{ position: 'absolute', inset: 0, opacity: 0.8, borderRadius: '14px' }}></div>
        {children}
      </div>
    </>
  );
};

// Cute Glow Card Component
const CuteGlowCard = ({ title, description, icon, glowColor, onAddItem, transform, hoverTransform }) => {
  const [showStars, setShowStars] = useState(false);

  const handleMouseEnter = () => {
    if (!showStars) {
      setShowStars(true);
    }
  };

  const handleMouseLeave = () => {
    if (showStars) {
      setShowStars(false);
    }
  };

  return (
    <GlowCard 
      glowColor={glowColor} 
      transform={transform}
      hoverTransform={hoverTransform}
    >
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          position: 'relative', 
          zIndex: 10 
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              borderRadius: '50%',
              background: glowColor === 'primary'
                ? `linear-gradient(135deg, ${theme.colors.primary}20 0%, ${theme.colors.primary}10 100%)` 
                : `linear-gradient(135deg, ${theme.colors.secondary}20 0%, ${theme.colors.secondary}10 100%)`,
              transform: showStars ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease',
              color: glowColor === 'primary' ? theme.colors.primary : theme.colors.secondary
            }}>
              {icon}
            </div>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: 0,
                marginBottom: '0.25rem',
                color: showStars ? (glowColor === 'primary' ? theme.colors.primary : theme.colors.secondary) : theme.colors.textPrimary,
                transition: 'color 0.3s ease'
              }}>
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onAddItem}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              border: 'none',
              background: glowColor === 'primary' 
                ? theme.colors.primary
                : theme.colors.secondary,
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: showStars ? 'scale(1.1) rotate(90deg)' : 'scale(1) rotate(0deg)',
              transition: 'transform 0.3s ease',
              boxShadow: `0 4px 12px ${
  glowColor === 'primary'
    ? theme.colors.primary + '40'
    : theme.colors.secondary + '40'
}`

              }}
            
          >
            +
          </button>
        </div>

        {/* Description */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '1rem',
            color: theme.colors.textSecondary,
            lineHeight: '1.6',
            maxWidth: '250px'
          }}>
            {description}
          </p>
        </div>

        {/* Animated Stars */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.25rem',
          marginTop: '0.5rem',
          opacity: showStars ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}>
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i}
              style={{
                color: theme.colors.secondary,
                animationDelay: `${i * 100}ms`,
                animation: showStars ? 'pulse 1s ease-in-out infinite' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
          }
        `
      }} />
    </GlowCard>
  );
};

export default function CuteScheduleApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ideas, setIdeas] = useState([
    { id: 1, title: 'App redesign concept', date: '2024-01-15' },
    { id: 2, title: 'Weekend project', date: '2024-01-14' }
  ]);
  const [workItems, setWorkItems] = useState([
    { id: 1, title: 'Complete landing page', status: 'in-progress' },
    { id: 2, title: 'Review code changes', status: 'todo' }
  ]);

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
      {/* Header */}
      <header style={{
        backgroundColor: `${theme.colors.background}F0`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.colors.primary}20`,
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              padding: '0.5rem',
              border: 'none',
              background: `${theme.colors.primary}20`,
              borderRadius: '0.5rem',
              cursor: 'pointer',
              display: isMobile ? 'block' : 'none',
              color: theme.colors.primary
            }}
          >
            ☰
          </button>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            margin: 0,
            color: theme.colors.textPrimary,
            textShadow: `0 2px 4px ${theme.colors.primary}20`
          }}>
            Cute Schedule
          </h1>
        </div>
        <button style={{
          padding: '0.5rem 1rem',
          backgroundColor: theme.colors.primary,
          color: theme.colors.background,
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontWeight: '500',
          boxShadow: `0 2px 8px ${theme.colors.primary}40`
        }}>
          Today's Goals
        </button>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)' }}>
        {/* Sidebar */}
        <aside style={{
          width: '256px',
          backgroundColor: `${theme.colors.background}F5`,
          backdropFilter: 'blur(15px)',
          borderRight: `1px solid ${theme.colors.primary}20`,
          padding: '1rem',
          position: isMobile ? 'fixed' : 'static',
          left: 0,
          top: '73px',
          height: isMobile ? 'calc(100vh - 73px)' : 'auto',
          zIndex: 50,
          transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s ease'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '0.75rem', fontWeight: '600', color: theme.colors.textSecondary, marginBottom: '0.75rem', textTransform: 'uppercase' }}>
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
          maxHeight: 'calc(100vh - 73px)'
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
                title="📝 Idea Book"
                description="Write down any thought or inspiration. You can organize them later."
                icon={<BookIcon />}
                glowColor="primary"
                onAddItem={() => alert('Navigate to Idea Book page')}
                transform="rotate(-2deg)"
                hoverTransform="rotate(0deg) scale(1.02)"
              />
              
              {/* Work Desk Card */}
              <CuteGlowCard
                title="💼 Work Desk"
                description="Manage your daily tasks and goals here. Keep everything in order."
                icon={<WorkIcon />}
                glowColor="secondary"
                onAddItem={() => alert('Navigate to Work Desk page')}
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
        ❓
      </button>
    </div>
  );
}