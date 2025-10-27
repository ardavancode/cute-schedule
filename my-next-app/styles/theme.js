// Theme Configuration for Cute Schedule
export const theme = {
  colors: {
    primary: "#6C8CFF",
    secondary: "#8AD7F4",
    background: "rgba(242, 247, 255, 0.85)",
    cardBackground: "rgba(230, 238, 255, 0.9)",
    textPrimary: "#1F2937",
    textSecondary: "#4B5563",
  },

  // Helper functions for color variations
  alpha: (color, opacity) =>
    `${color}${Math.round(opacity * 255)
      .toString(16)
      .padStart(2, "0")}`,

  // Pre-defined alpha variations for common use
  alphaColors: {
    primary10: "#6C8CFF1A", // 10% opacity
    primary20: "#6C8CFF33", // 20% opacity
    primary40: "#6C8CFF66", // 40% opacity
    secondary10: "#8AD7F41A",
    secondary20: "#8AD7F433",
    secondary40: "#8AD7F466",
    background90: "#FFFFFFF0", // 90% opacity
    backgroundF5: "#FFFFFFF5", // 95% opacity
  },

  // Shadows with theme colors
  shadows: {
    primary: "0 4px 12px rgba(108, 140, 255, 0.25)",
    secondary: "0 4px 12px rgba(138, 215, 244, 0.25)",
    card: "0 8px 32px rgba(108, 140, 255, 0.18)",
    cardSecondary: "0 8px 32px rgba(138, 215, 244, 0.18)",
    small: "0 2px 8px rgba(108, 140, 255, 0.2)",
  },

  // Border radius values
  radius: {
    small: "0.5rem",
    medium: "1rem",
    large: "1.5rem",
    card: "16px",
    button: "50%",
  },

  // Spacing values
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },

  // Typography
  typography: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
    },
    weights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },

  // Transitions
  transitions: {
    fast: "0.15s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
  },
};

// Dark theme (for future implementation)
export const darkTheme = {
  ...theme,
  colors: {
    primary: "#8CA5FF",
    secondary: "#7CD3F3",
    background: "#121826",
    cardBackground: "#1F2A40",
    textPrimary: "#F9FAFB",
    textSecondary: "#9CA3AF",
  },
};
