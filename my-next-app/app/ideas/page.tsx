'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IdeaCard } from '../../components/ideas/IdeaCard';
import { IdeaHero } from '../../components/ideas/IdeaHero';
import { FloatingHomeButton } from '../../components/ideas/FloatingHomeButton';
import { IdeaSidebar } from '../../components/ideas/IdeaSidebar';
import { ideaTheme } from './theme';

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

const {
  palette: ideaPalette,
  gradients: ideaGradients,
  surfaces: ideaSurfaces,
  shadows: ideaShadows,
  utils: ideaUtils,
} = ideaTheme;

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
    background: ideaSurfaces.searchContainer,
    border: `1px solid ${ideaSurfaces.toolbarBorderStrong}`,
    boxShadow: ideaShadows.emptyState,
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
      ? ideaGradients.searchToggle
      : ideaGradients.layoutToggleInactive,
    color: active ? ideaPalette.sky : ideaPalette.deepTeal,
    boxShadow: active
      ? ideaShadows.layoutToggleActive
      : ideaShadows.layoutToggleInactive,
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

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: ideaGradients.pageBackground,
        backgroundSize: '260% 260%',
        animation: 'ideasGradientShift 22s ease-in-out infinite alternate',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '6rem',
      }}
    >
      <IdeaSidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        activePath={pathname}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleNavigate}
      />

      <div
        style={{
          marginLeft: !isMobile && sidebarOpen ? '260px' : '0',
          transition: 'margin-left 0.3s ease',
          width: '100%',
          position: 'relative',
        }}
      >
        <FloatingHomeButton
          isMobile={isMobile}
          leftDesktop="calc(1.25rem + 52px)"
          leftMobile="calc(1.25rem + 52px)"
        />
        <IdeaHero onAddIdea={openModal} />

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
            background: ideaSurfaces.toolbarGlass,
            border: `1px solid ${ideaSurfaces.toolbarBorder}`,
            boxShadow: ideaShadows.toolbar,
            backdropFilter: 'blur(10px)',
            gap: '1.25rem',
          }}
        >
          <select
            style={{
              padding: '0.6rem 1.1rem',
              borderRadius: '18px',
              border: `1px solid ${ideaSurfaces.toolbarBorderStrong}`,
              background: ideaUtils.rgba('snow', 0.7),
              color: ideaPalette.deepTeal,
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
                backgroundImage: ideaGradients.searchToggle,
                color: ideaPalette.sky,
                boxShadow: ideaShadows.searchToggle,
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
                border: `1px solid ${ideaSurfaces.toolbarBorderStrong}`,
                background: ideaUtils.rgba('snow', 0.82),
                color: ideaPalette.deepTeal,
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
                background: ideaPalette.deepTeal,
                color: ideaPalette.sky,
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
            background: ideaSurfaces.emptyStateBackground,
            border: `1px dashed ${ideaSurfaces.emptyStateBorder}`,
            color: ideaUtils.rgba('snow', 0.8),
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
                  color: ideaUtils.rgba('snow', 0.65),
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
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  layout={layoutMode}
                  onEdit={handleEditIdea}
                  onDelete={handleDeleteIdea}
                />
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
            background: ideaSurfaces.modalOverlay,
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
              background: ideaSurfaces.modalPanel,
              border: `1px solid ${ideaSurfaces.modalBorder}`,
              borderRadius: '28px',
              padding: '2.25rem',
              boxShadow: ideaShadows.modal,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              transform: isModalActive ? 'translateY(0)' : 'translateY(24px)',
              opacity: isModalActive ? 1 : 0,
              transition: 'opacity 0.35s ease, transform 0.35s ease',
              color: ideaPalette.deepTeal,
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
                  color: ideaPalette.charcoal,
                }}
              >
                Capture a fresh spark
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em',
                  color: ideaUtils.rgba('charcoal', 0.65),
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
                  color: ideaUtils.rgba('charcoal', 0.6),
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
                    border: `1px solid ${ideaUtils.rgba('sea', 0.28)}`,
                    background: ideaUtils.rgba('snow', 0.85),
                    color: ideaPalette.charcoal,
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
                  color: ideaUtils.rgba('charcoal', 0.6),
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
                    border: `1px solid ${ideaUtils.rgba('sea', 0.28)}`,
                    background: ideaUtils.rgba('snow', 0.85),
                    color: ideaPalette.charcoal,
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
                  color: ideaUtils.rgba('charcoal', 0.6),
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
                    border: `1px solid ${ideaUtils.rgba('sea', 0.28)}`,
                    background: ideaUtils.rgba('snow', 0.85),
                    color: ideaPalette.charcoal,
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
                    border: `1px solid ${ideaUtils.rgba('sea', 0.35)}`,
                    background: 'transparent',
                    color: ideaPalette.charcoal,
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
                    backgroundImage: ideaGradients.heroButton,
                    color: ideaPalette.sky,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    boxShadow: ideaShadows.primaryButton,
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

