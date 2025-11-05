const ideaPalette = {
  emerald: '#037971',
  deepTeal: '#214E5D',
  sapphire: '#275DAD',
  sky: '#BDEDE0',
  mist: '#D4F5F5',
  sand: '#F0EAD6',
  linen: '#EDEBD7',
  charcoal: '#0B0A07',
  snow: '#FFFFFF',
  stone: '#93B7BE',
  foam: '#BBDCD1',
  ink: '#1F3A40',
  deepInk: '#1A2C2F',
  ember: '#7C2D12',
  sea: '#215D6D',
};

const hexToRgba = (hex: string, alpha: number) => {
  const normalized = hex.replace('#', '');
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ideaGradients = {
  pageBackground: `linear-gradient(135deg, ${ideaPalette.sky} 0%, ${ideaPalette.deepTeal} 100%)`,
  ideaCardGrid: `linear-gradient(145deg, ${ideaPalette.mist} 0%, ${ideaPalette.linen} 100%)`,
  ideaCardList: `linear-gradient(145deg, ${ideaPalette.linen} 0%, ${ideaPalette.mist} 100%)`,
  heroButton: `linear-gradient(135deg, ${ideaPalette.deepTeal} 0%, ${ideaPalette.sapphire} 100%)`,
  searchToggle: `linear-gradient(135deg, ${ideaPalette.sapphire} 0%, ${ideaPalette.charcoal} 100%)`,
  layoutToggleInactive: 'linear-gradient(135deg, rgba(189, 237, 224, 0.65) 0%, rgba(187, 219, 209, 0.55) 100%)',
  profileButton: `linear-gradient(145deg, ${ideaPalette.emerald} 0%, ${ideaPalette.sapphire} 85%)`,
};

const ideaSurfaces = {
  overlaySoft: 'rgba(255, 255, 255, 0.85)',
  overlayStrong: 'rgba(255, 255, 255, 0.92)',
  toolbarGlass: 'rgba(189, 237, 224, 0.15)',
  toolbarBorder: 'rgba(187, 219, 209, 0.35)',
  toolbarBorderStrong: 'rgba(187, 219, 209, 0.45)',
  searchContainer: 'rgba(189, 237, 224, 0.18)',
  searchPanel: 'rgba(189, 237, 224, 0.12)',
  ideaCardBorder: 'rgba(147, 183, 190, 0.35)',
  ideaCardBorderStrong: 'rgba(147, 183, 190, 0.5)',
  ideaCardBackgroundAlt: 'rgba(237, 235, 215, 0.9)',
  ideaCardBackground: 'rgba(212, 245, 245, 0.85)',
  tagBackground: 'rgba(147, 183, 190, 0.22)',
  emptyStateBackground: 'rgba(189, 237, 224, 0.12)',
  emptyStateBorder: 'rgba(187, 219, 209, 0.45)',
  modalOverlay:
    'linear-gradient(135deg, rgba(11, 10, 7, 0.35) 0%, rgba(33, 93, 109, 0.55) 50%, rgba(189, 237, 224, 0.28) 100%)',
  modalPanel: 'linear-gradient(145deg, rgba(189, 237, 224, 0.95), rgba(33, 93, 109, 0.92))',
  modalBorder: 'rgba(187, 219, 209, 0.55)',
};

const ideaShadows = {
  floatingButton: '0 10px 24px rgba(33, 78, 93, 0.25)',
  floatingButtonHover: '0 14px 32px rgba(33, 78, 93, 0.28)',
  toolbar: '0 12px 24px rgba(33, 93, 109, 0.15)',
  searchToggle: '0 16px 34px rgba(11, 10, 7, 0.32)',
  layoutToggleActive: '0 16px 32px rgba(11, 10, 7, 0.32)',
  layoutToggleInactive: '0 10px 24px rgba(33, 93, 109, 0.18)',
  ideaCard: '0 18px 34px rgba(33, 93, 109, 0.14)',
  ideaCardButton: '0 8px 16px rgba(33, 93, 109, 0.12)',
  heroButton: '0 18px 36px rgba(11, 10, 7, 0.28)',
  primaryButton: '0 18px 32px rgba(11, 10, 7, 0.28)',
  emptyState: '0 14px 30px rgba(33, 93, 109, 0.12)',
  modal: '0 34px 68px rgba(11, 10, 7, 0.32)',
};

export const ideaTheme = {
  palette: ideaPalette,
  gradients: ideaGradients,
  surfaces: ideaSurfaces,
  shadows: ideaShadows,
  sidebarPalette: {
    emerald: ideaPalette.emerald,
    deepTeal: ideaPalette.deepTeal,
    sapphire: ideaPalette.sapphire,
  },
  utils: {
    rgba: (key: keyof typeof ideaPalette, alpha: number) => hexToRgba(ideaPalette[key], alpha),
  },
} as const;

export type IdeaTheme = typeof ideaTheme;
