'use client';

import { ideaTheme } from '../../app/ideas/theme';

type AddIdeaButtonProps = {
  onClick: () => void;
};

const {
  palette: ideaPalette,
  gradients: ideaGradients,
  shadows: ideaShadows,
} = ideaTheme;

export function AddIdeaButton({ onClick }: AddIdeaButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
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
        color: ideaPalette.sky,
        backgroundImage: ideaGradients.heroButton,
        backgroundSize: '220% 220%',
        animation: 'ideaButtonPulse 6s ease-in-out infinite',
        boxShadow: ideaShadows.heroButton,
        cursor: 'pointer',
      }}
    >
      Add Idea
    </button>
  );
}
