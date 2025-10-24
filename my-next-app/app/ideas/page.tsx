'use client';

import { useState } from 'react';
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

const SearchIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="16.65" y1="16.65" x2="21" y2="21" />
  </svg>
);

const ListIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="4" cy="6" r="1" />
    <circle cx="4" cy="12" r="1" />
    <circle cx="4" cy="18" r="1" />
  </svg>
);

const GridIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const filters = ['All Ideas', 'Work', 'Personal', 'Inspiration'];

export default function IdeasPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState('grid');

  const searchPanelStyles = {
    maxHeight: isSearchOpen ? '120px' : '0px',
    opacity: isSearchOpen ? 1 : 0,
    transform: isSearchOpen ? 'translateY(0)' : 'translateY(-12px)',
    transition: 'all 0.35s ease',
    overflow: 'hidden',
    width: '100%',
    borderRadius: '24px',
    background: 'rgba(189, 237, 224, 0.18)',
    border: '1px solid rgba(187, 219, 209, 0.45)',
    boxShadow: '0 14px 30px rgba(33, 93, 109, 0.12)',
    padding: isSearchOpen ? '1rem 1.25rem' : '0 1.25rem',
  };

  const layoutButtonStyle = (active: boolean) => ({
    width: '44px',
    height: '44px',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    backgroundImage: active
      ? 'linear-gradient(135deg, #275DAD 0%, #0B0A07 100%)'
      : 'linear-gradient(135deg, rgba(189, 237, 224, 0.65) 0%, rgba(187, 219, 209, 0.55) 100%)',
    color: active ? '#BDEDE0' : '#214E5D',
    boxShadow: active
      ? '0 16px 32px rgba(11, 10, 7, 0.32)'
      : '0 10px 24px rgba(33, 93, 109, 0.18)',
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: 'linear-gradient(135deg, #BDEDE0 0%, #214E5D 100%)',
        backgroundSize: '260% 260%',
        animation: 'ideasGradientShift 22s ease-in-out infinite alternate',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '6rem',
      }}
    >
      <Link
        href="/"
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
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
          const target = e.currentTarget;
          target.style.transform = 'scale(1.05)';
          target.style.boxShadow = '0 14px 32px rgba(33, 78, 93, 0.28)';
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          target.style.transform = 'scale(1)';
          target.style.boxShadow = '0 10px 24px rgba(33, 78, 93, 0.25)';
        }}
        aria-label="Back to home"
      >
        <HomeButtonIcon />
      </Link>

      <div
        style={{
          paddingTop: '0.2rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.92)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.85rem',
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
        <button
          type="button"
          style={{
            width: '200px',
            height: '72px',
            borderRadius: '9999px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.05rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#BDEDE0',
            backgroundImage: 'linear-gradient(135deg, #214E5D 0%, #275DAD 100%)',
            backgroundSize: '220% 220%',
            animation: 'ideaButtonPulse 6s ease-in-out infinite',
            boxShadow: '0 18px 36px rgba(11, 10, 7, 0.28)',
            cursor: 'pointer',
          }}
        >
          Add Idea
        </button>
      </div>

      <section
        style={{
          width: '100%',
          maxWidth: '960px',
          marginTop: '100px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            borderRadius: '22px',
            background: 'rgba(189, 237, 224, 0.15)',
            border: '1px solid rgba(187, 219, 209, 0.35)',
            boxShadow: '0 12px 24px rgba(33, 93, 109, 0.15)',
            backdropFilter: 'blur(10px)',
            gap: '1.25rem',
          }}
        >
          <select
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '18px',
              border: '1px solid rgba(187, 219, 209, 0.45)',
              background: 'rgba(255, 255, 255, 0.7)',
              color: '#214E5D',
              fontSize: '0.95rem',
              outline: 'none',
              minWidth: '50px',
            }}
            defaultValue={filters[0]}
          >
            {filters.map((filter) => (
              <option value={filter} key={filter}>
                {filter}
              </option>
            ))}
          </select>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <button
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              aria-label="Toggle search"
              style={{
                width: '48px',
                height: '48px',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'linear-gradient(135deg, #275DAD 0%, #0B0A07 100%)',
                color: '#BDEDE0',
                boxShadow: '0 16px 34px rgba(11, 10, 7, 0.32)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <SearchIcon />
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('list')}
              aria-label="Switch to list view"
              style={layoutButtonStyle(layoutMode === 'list')}
            >
              <ListIcon />
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode('grid')}
              aria-label="Switch to grid view"
              style={layoutButtonStyle(layoutMode === 'grid')}
            >
              <GridIcon />
            </button>
          </div>
        </header>

        <div style={searchPanelStyles}>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              opacity: isSearchOpen ? 1 : 0,
              transition: 'opacity 0.3s ease 0.1s',
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to search your idea library"
              style={{
                flex: 1,
                padding: '0.85rem 1.1rem',
                borderRadius: '16px',
                border: '1px solid rgba(187, 219, 209, 0.45)',
                background: 'rgba(255, 255, 255, 0.82)',
                color: '#214E5D',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
            <button
              type="button"
              style={{
                padding: '0.85rem 1.25rem',
                borderRadius: '16px',
                border: 'none',
                background: '#214E5D',
                color: '#BDEDE0',
                fontWeight: 600,
                letterSpacing: '0.08em',
                cursor: 'pointer',
              }}
            >
              Search
            </button>
          </div>
        </div>

        <div
          style={{
            padding: '2.75rem 1.75rem',
            borderRadius: '28px',
            background: 'rgba(189, 237, 224, 0.12)',
            border: '1px dashed rgba(187, 219, 209, 0.45)',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.05rem',
            letterSpacing: '0.05em',
          }}
        >
          <span>No ideas yet. Start by adding your first spark.</span>
          <span
            style={{
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.65)',
              letterSpacing: '0.08em',
            }}
          >
            Currently viewing the {layoutMode === 'grid' ? 'grid' : 'list'} layout.
          </span>
        </div>
      </section>

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

          @keyframes ideaButtonPulse {
            0% {
              background-position: 0% 50%;
              box-shadow: 0 16px 32px rgba(11, 10, 7, 0.24);
            }
            50% {
              background-position: 100% 50%;
              box-shadow: 0 22px 40px rgba(11, 10, 7, 0.34);
            }
            100% {
              background-position: 0% 50%;
              box-shadow: 0 16px 32px rgba(11, 10, 7, 0.24);
            }
          }
        `}
      </style>
    </div>
  );
}
