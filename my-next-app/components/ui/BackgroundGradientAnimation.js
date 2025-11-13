'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Background Gradient Animation Component
 * Creates an animated gradient background with multiple moving color layers
 */
export default function BackgroundGradientAnimation({
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
}) {
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
        {/* First Color Layer */}
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
        {/* Second Color Layer */}
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
        {/* Third Color Layer */}
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
        {/* Fourth Color Layer */}
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
        {/* Fifth Color Layer */}
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
        {/* Interactive Mouse Layer */}
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

      {/* Animation Keyframes */}
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
}
