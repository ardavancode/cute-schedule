// Theme Configuration for Cute Schedule
export const theme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#FFD93D', 
    background: 'rgba(255, 255, 255, 0.8)',
    cardBackground: 'rgba(255, 245, 225, 0.9)',
    textPrimary: '#333333',
    textSecondary: '#666666'
  },
  
  // Helper functions for color variations
  alpha: (color, opacity) => `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
  
  // Pre-defined alpha variations for common use
  alphaColors: {
    primary10: '#FF6B6B1A',   // 10% opacity
    primary20: '#FF6B6B33',   // 20% opacity
    primary40: '#FF6B6B66',   // 40% opacity
    secondary10: '#FFD93D1A',
    secondary20: '#FFD93D33',
    secondary40: '#FFD93D66',
    background90: '#FFFFFFF0', // 90% opacity
    backgroundF5: '#FFFFFFF5', // 95% opacity
  },
  
  // Shadows with theme colors
  shadows: {
    primary: '0 4px 12px #FF6B6B40',
    secondary: '0 4px 12px #FFD93D40',
    card: '0 8px 32px rgba(255, 107, 107, 0.15)',
    cardSecondary: '0 8px 32px rgba(255, 217, 61, 0.15)',
    small: '0 2px 8px #FF6B6B40',
  },
  
  // Border radius values
  radius: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    card: '16px',
    button: '50%'
  },
  
  // Spacing values
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  
  // Typography
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem'
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },
  
  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  }
};

// Dark theme (for future implementation)
export const darkTheme = {
  ...theme,
  colors: {
    primary: '#FF8A8A',
    secondary: '#FFE066',
    background: '#1A1A1A',
    cardBackground: '#2D2D2D',
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0'
  }
};