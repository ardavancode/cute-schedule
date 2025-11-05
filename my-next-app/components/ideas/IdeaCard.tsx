'use client';

import { useState } from 'react';
import { ideaTheme } from '../../app/ideas/theme';

const {
  gradients: ideaGradients,
  surfaces: ideaSurfaces,
  shadows: ideaShadows,
  palette: ideaPalette,
  utils: ideaUtils,
} = ideaTheme;

type Idea = {
  id: number;
  name: string;
  description: string;
  tags: string[];
  createdAt: string;
};

type IdeaCardProps = {
  idea: Idea;
  layout: 'grid' | 'list';
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const PencilIcon = ({ size = 16 }: { size?: number }) => (
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
    <path d="M18 2 22 6 8 20H4V16L18 2Z" />
    <path d="M15 5 19 9" />
  </svg>
);

const TrashIcon = ({ size = 16 }: { size?: number }) => (
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
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export function IdeaCard({ idea, layout, onEdit, onDelete }: IdeaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    position: 'relative' as const,
    border: `1px solid ${ideaSurfaces.ideaCardBorder}`,
    borderRadius: '22px',
    boxShadow: ideaShadows.ideaCard,
    backgroundImage:
      layout === 'grid' ? ideaGradients.ideaCardGrid : ideaGradients.ideaCardList,
    color: ideaPalette.ink,
    backdropFilter: 'blur(8px)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.9rem',
    padding: '1.55rem',
    width: layout === 'grid' ? 'min(260px, 100%)' : '100%',
    minHeight: layout === 'grid' ? '210px' : 'auto',
  };

  const actionButtonStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: ideaShadows.ideaCardButton,
  };

  return (
    <article
      style={cardStyle}
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
          onClick={() => onEdit(idea.id)}
          style={{
            ...actionButtonStyle,
            border: `1px solid ${ideaSurfaces.ideaCardBorderStrong}`,
            background: ideaSurfaces.ideaCardBackground,
            color: ideaPalette.ink,
          }}
        >
          <PencilIcon size={16} />
        </button>
        <button
          type="button"
          aria-label="Delete idea"
          onClick={() => onDelete(idea.id)}
          style={{
            ...actionButtonStyle,
            border: `1px solid ${ideaSurfaces.ideaCardBorderStrong}`,
            background: ideaSurfaces.ideaCardBackgroundAlt,
            color: ideaPalette.ember,
          }}
        >
          <TrashIcon size={16} />
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
            color: ideaPalette.deepInk,
          }}
        >
          {idea.name}
        </h3>
        <span
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: ideaUtils.rgba('ink', 0.6),
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
            color: ideaUtils.rgba('ink', 0.82),
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
                background: ideaSurfaces.tagBackground,
                color: ideaPalette.ink,
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
}
