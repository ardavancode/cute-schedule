'use client';

import Link from 'next/link';

const HomeButtonIcon = () => (
  <svg
    width={20}
    height={20}
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

export default function IdeasPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: 'linear-gradient(135deg, #BDEDE0 0%, #214E5D 100%)',
        backgroundSize: '260% 260%',
        animation: 'ideasGradientShift 22s ease-in-out infinite alternate',
      }}
    >
      <Link
        href="/"
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#214E5D',
          background: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 10px 24px rgba(33, 78, 93, 0.25)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget as HTMLAnchorElement;
          target.style.transform = 'scale(1.05)';
          target.style.boxShadow = '0 14px 32px rgba(33, 78, 93, 0.28)';
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget as HTMLAnchorElement;
          target.style.transform = 'scale(1)';
          target.style.boxShadow = '0 10px 24px rgba(33, 78, 93, 0.25)';
        }}
        aria-label="Back to home"
      >
        <HomeButtonIcon />
      </Link>

      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.92)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: '3rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          Idea Book
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.35em',
            color: 'rgba(255, 255, 255, 0.75)',
          }}
        >
          think • write • rise
        </p>
      </div>

      <style>
        {`
          @keyframes ideasGradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 50% 50%;
            }
            100% {
              background-position: 100% 50%;
            }
          }
        `}
      </style>
    </div>
  );
}
