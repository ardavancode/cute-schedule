'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '../../components/layout/Sidebar';
import { MenuIcon } from '../../components/ui/Icons';

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

const TrashIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const PencilIcon = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2 22 6 8 20H4V16L18 2Z" />
    <path d="M15 5 19 9" />
  </svg>
);

const filters = ['All Ideas', 'Work', 'Personal', 'Inspiration'];

const sidebarPalette = {
  emerald: '#037971',
  deepTeal: '#214E5D',
  sapphire: '#275DAD',
};

type Idea = {
  id: number;
  name: string;
  description: string;
  tags: string[];
  createdAt: string;
};

export default function IdeasPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [ideaName, setIdeaName] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [ideaTags, setIdeaTags] = useState('');
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

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

  const filteredIdeas = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return ideas;
    }

    return ideas.filter((idea) => {
      const haystack = `${idea.name} ${idea.description} ${idea.tags.join(' ')}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [ideas, searchQuery]);

  const hasIdeas = ideas.length > 0;
  const hasResults = filteredIdeas.length > 0;
  const trimmedQuery = searchQuery.trim();

  const openModal = () => {
    setIsModalVisible(true);
    setTimeout(() => setIsModalActive(true), 15);
  };

  const closeModal = () => {
    setIsModalActive(false);
    setTimeout(() => setIsModalVisible(false), 280);
  };

  const handleIdeaSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = ideaName.trim();

    if (!trimmedName) {
      return;
    }

    const nextIdea: Idea = {
      id: Date.now(),
      name: trimmedName,
      description: ideaDescription.trim(),
      tags: ideaTags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    setIdeas((prev) => [nextIdea, ...prev]);
    setIdeaName('');
    setIdeaDescription('');
    setIdeaTags('');
    closeModal();
  };

  const handleDeleteIdea = (id: number) => {
    setIdeas((prev) => prev.filter((idea) => idea.id !== id));
  };

  const handleEditIdea = (_id: number) => {};

  const IdeaDisplay = ({ idea }: { idea: Idea }) => {
    const [isHovered, setIsHovered] = useState(false);

    const baseCardStyle = {
      position: 'relative' as const,
      border: '1px solid rgba(147, 183, 190, 0.35)',
      borderRadius: '22px',
      boxShadow: '0 18px 34px rgba(33, 93, 109, 0.14)',
      backgroundImage:
        layoutMode === 'grid'
          ? 'linear-gradient(145deg, #D4F5F5 0%, #EDEBD7 100%)'
          : 'linear-gradient(145deg, #EDEBD7 0%, #D4F5F5 100%)',
      color: '#1F3A40',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.9rem',
      padding: '1.55rem',
      width: layoutMode === 'grid' ? 'min(260px, 100%)' : '100%',
      minHeight: layoutMode === 'grid' ? '210px' : 'auto',
    };

    return (
      <article
        style={baseCardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            display: 'flex',
            gap: '0.35rem',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            pointerEvents: isHovered ? 'auto' : 'none',
          }}
        >
          <button
            type="button"
            aria-label="Edit idea"
            onClick={() => handleEditIdea(idea.id)}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '9999px',
              border: '1px solid rgba(147, 183, 190, 0.5)',
              background: 'rgba(212, 245, 245, 0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1F3A40',
              cursor: 'pointer',
              transition: 'background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 8px 16px rgba(33, 93, 109, 0.12)',
            }}
          >
            <PencilIcon />
          </button>
          <button
            type="button"
            aria-label="Delete idea"
            onClick={() => handleDeleteIdea(idea.id)}
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '9999px',
              border: '1px solid rgba(147, 183, 190, 0.5)',
              background: 'rgba(237, 235, 215, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7C2D12',
              cursor: 'pointer',
              transition: 'background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 8px 16px rgba(33, 93, 109, 0.12)',
            }}
          >
            <TrashIcon />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '1.2rem',
              letterSpacing: '0.04em',
              color: '#1A2C2F',
            }}
          >
            {idea.name}
          </h3>
          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(31, 58, 64, 0.6)',
            }}
          >
            {new Date(idea.createdAt).toLocaleDateString()}
          </span>
        </div>

        {idea.description && (
          <p
            style={{
              margin: 0,
              lineHeight: 1.5,
              color: 'rgba(31, 58, 64, 0.82)',
              fontSize: '0.94rem',
            }}
          >
            {idea.description}
          </p>
        )}

        {idea.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            {idea.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  background: 'rgba(147, 183, 190, 0.22)',
                  color: '#1F3A40',
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    );
  };

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
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
        onNavigate={handleNavigate}
        activePath={pathname}
        palette={sidebarPalette}
      />

      <button
        type="button"
        onClick={() => setSidebarOpen((prev) => !prev)}
        style={{
          position: 'absolute',
          top: '1.25rem',
          left: '1.25rem',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.85)',
          color: '#214E5D',
          boxShadow: '0 10px 24px rgba(33, 78, 93, 0.25)',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          zIndex: 60,
        }}
        onMouseEnter={(event) => {
          const target = event.currentTarget;
          target.style.transform = 'scale(1.05)';
          target.style.boxShadow = '0 14px 32px rgba(33, 78, 93, 0.28)';
        }}
        onMouseLeave={(event) => {
          const target = event.currentTarget;
          target.style.transform = 'scale(1)';
          target.style.boxShadow = '0 10px 24px rgba(33, 78, 93, 0.25)';
        }}
        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        <MenuIcon size={20} className="" style={{}} />
      </button>

      <div
        style={{
          marginLeft: !isMobile && sidebarOpen ? '260px' : '0',
          transition: 'margin-left 0.3s ease',
          width: '100%',
          position: 'relative',
        }}
      >
        <Link
          href="/"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: isMobile ? '1.25rem' : '2.5rem',
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
            zIndex: 60,
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
            onClick={openModal}
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
            marginLeft: 'auto',
            marginRight: 'auto',
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
          {!hasResults ? (
            <>
              <span>
                {hasIdeas && trimmedQuery
                  ? `No ideas match "${trimmedQuery}".`
                  : 'No ideas yet. Start by adding your first spark.'}
              </span>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.65)',
                  letterSpacing: '0.08em',
                }}
              >
                {hasIdeas && trimmedQuery
                  ? 'Try adjusting your keywords or filters to reveal more sparks.'
                  : `Currently viewing the ${layoutMode === 'grid' ? 'grid' : 'list'} layout.`}
              </span>
            </>
          ) : (
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: layoutMode === 'grid' ? 'row' : 'column',
                flexWrap: layoutMode === 'grid' ? 'wrap' : 'nowrap',
                gap: layoutMode === 'grid' ? '1.5rem' : '1.1rem',
                justifyContent: layoutMode === 'grid' ? 'center' : 'flex-start',
                alignItems: 'stretch',
                textAlign: 'left',
              }}
            >
              {filteredIdeas.map((idea) => (
                <IdeaDisplay key={idea.id} idea={idea} />
              ))}
            </div>
          )}
        </div>
      </section>

      </div>

      {isModalVisible && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="idea-modal-heading"
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            background:
              'linear-gradient(135deg, rgba(11, 10, 7, 0.35) 0%, rgba(33, 93, 109, 0.55) 50%, rgba(189, 237, 224, 0.28) 100%)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            opacity: isModalActive ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '440px',
              background: 'linear-gradient(145deg, rgba(189, 237, 224, 0.95), rgba(33, 93, 109, 0.92))',
              border: '1px solid rgba(187, 219, 209, 0.55)',
              borderRadius: '28px',
              padding: '2.25rem',
              boxShadow: '0 34px 68px rgba(11, 10, 7, 0.32)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              transform: isModalActive ? 'translateY(0)' : 'translateY(24px)',
              opacity: isModalActive ? 1 : 0,
              transition: 'opacity 0.35s ease, transform 0.35s ease',
              color: '#214E5D',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}
            >
              <h2
                id="idea-modal-heading"
                style={{
                  margin: 0,
                  fontSize: '1.65rem',
                  letterSpacing: '0.05em',
                  color: '#0B0A07',
                }}
              >
                Capture a fresh spark
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em',
                  color: 'rgba(11, 10, 7, 0.65)',
                }}
              >
                Quick draft the headline, a short note, and a tag to keep it organised.
              </p>
            </div>

            <form
              onSubmit={handleIdeaSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.15rem',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(11, 10, 7, 0.6)',
                }}
              >
                Idea name
                <input
                  value={ideaName}
                  onChange={(event) => setIdeaName(event.target.value)}
                  placeholder="Catchy idea title"
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(33, 93, 109, 0.28)',
                    background: 'rgba(255, 255, 255, 0.85)',
                    color: '#0B0A07',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                  }}
                  required
                />
              </label>

              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(11, 10, 7, 0.6)',
                }}
              >
                Quick note
                <textarea
                  value={ideaDescription}
                  onChange={(event) => setIdeaDescription(event.target.value)}
                  placeholder="Add a short description to expand the spark"
                  rows={3}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(33, 93, 109, 0.28)',
                    background: 'rgba(255, 255, 255, 0.85)',
                    color: '#0B0A07',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'none',
                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                  }}
                />
              </label>

              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(11, 10, 7, 0.6)',
                }}
              >
                Tags
                <input
                  value={ideaTags}
                  onChange={(event) => setIdeaTags(event.target.value)}
                  placeholder="e.g. design, concept, inspiration"
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(33, 93, 109, 0.28)',
                    background: 'rgba(255, 255, 255, 0.85)',
                    color: '#0B0A07',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                  }}
                />
              </label>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '0.75rem',
                }}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    padding: '0.85rem 1.4rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(33, 93, 109, 0.35)',
                    background: 'transparent',
                    color: '#0B0A07',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.85rem 1.6rem',
                    borderRadius: '16px',
                    border: 'none',
                    backgroundImage: 'linear-gradient(135deg, #214E5D 0%, #275DAD 100%)',
                    color: '#BDEDE0',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    boxShadow: '0 18px 32px rgba(11, 10, 7, 0.28)',
                  }}
                >
                  Save Idea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
