'use client';

import { ideaTheme } from '../../app/ideas/theme';
import { AddIdeaButton } from './AddIdeaButton';

type IdeaHeroProps = {
  onAddIdea: () => void;
};

const {
  palette: ideaPalette,
  gradients: ideaGradients,
  shadows: ideaShadows,
  utils: ideaUtils,
} = ideaTheme;

export function IdeaHero({ onAddIdea }: IdeaHeroProps) {
  return (
    <div
      style={{
        paddingTop: '0.2rem',
        textAlign: 'center',
        color: ideaUtils.rgba('snow', 0.92),
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
          color: ideaUtils.rgba('snow', 0.75),
        }}
      >
        think * write * rise
      </p>
      <AddIdeaButton onClick={onAddIdea} />
    </div>
  );
}
