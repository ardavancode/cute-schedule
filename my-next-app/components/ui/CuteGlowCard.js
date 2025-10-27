"use client";

import { useRef } from "react";
import { theme } from "../../styles/theme";

// Base Glow Card Component
const GlowCard = ({
  children,
  glowColor = "primary",
  className = "",
  transform,
  hoverTransform,
  onClick,
  colorScheme,
}) => {
  const cardRef = useRef(null);

  const defaultSchemes = {
    primary: {
      accent: theme.colors.primary,
      surface: theme.colors.cardBackground,
      border: theme.colors.primary,
      highlight: "rgba(255, 107, 107, 0.12)",
      shadow: "0 8px 32px rgba(108, 140, 255, 0.18)",
      text: theme.colors.textSecondary,
    },
    secondary: {
      accent: theme.colors.secondary,
      surface: theme.colors.cardBackground,
      border: theme.colors.secondary,
      highlight: "rgba(255, 217, 61, 0.12)",
      shadow: "0 8px 32px rgba(255, 217, 61, 0.18)",
      text: theme.colors.textSecondary,
    },
  };

  const scheme = {
    ...(defaultSchemes[glowColor] || defaultSchemes.primary),
    ...(colorScheme || {}),
  };

  const surfaceColor = scheme.surface || theme.colors.cardBackground;
  const highlightColor =
    scheme.highlight ||
    (glowColor === "primary"
      ? "rgba(255, 107, 107, 0.12)"
      : "rgba(255, 217, 61, 0.12)");
  const borderColor = scheme.border || defaultSchemes.primary.border;
  const shadowColor = scheme.shadow || defaultSchemes.primary.shadow;

  const cardStyle = {
    width: "320px",
    height: "400px",
    backgroundImage: `radial-gradient(320px 320px at 50% 15%, ${highlightColor}, transparent)`,
    backgroundColor: surfaceColor,
    border: `2px solid ${borderColor}`,
    borderRadius: "16px",
    position: "relative",
    padding: "1.5rem",
    boxShadow: shadowColor,
    transform: transform,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  };

  const handleMouseEnter = () => {
    if (cardRef.current && hoverTransform) {
      cardRef.current.style.transform = hoverTransform;
      cardRef.current.style.boxShadow = "0 12px 48px rgba(0,0,0,0.15)";
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && transform) {
      cardRef.current.style.transform = transform;
      cardRef.current.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)";
    }
  };

  return (
    <div
      ref={cardRef}
      style={cardStyle}
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

// Main Cute Glow Card Component
export default function CuteGlowCard({
  title,
  description,
  icon,
  glowColor,
  onClick,
  onAddItem,
  transform,
  hoverTransform,
  cardPalette,
}) {
  const accentColor =
    (cardPalette && cardPalette.accent) ||
    (glowColor === "primary" ? theme.colors.primary : theme.colors.secondary);
  const secondaryText =
    (cardPalette && cardPalette.text) || theme.colors.textSecondary;
  const buttonTextColor =
    (cardPalette && cardPalette.buttonText) || theme.colors.background;
  const buttonShadow =
    (cardPalette && cardPalette.buttonShadow) || `${accentColor}40`;

  return (
    <GlowCard
      glowColor={glowColor}
      transform={transform}
      hoverTransform={hoverTransform}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
          zIndex: 10,
          gap: "1.25rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.25rem",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            {icon && (
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: accentColor,
                }}
              >
                {icon}
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.15rem",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "3px",
                  borderRadius: "9999px",
                  background: accentColor,
                  opacity: 0.35,
                }}
              />
              <h3
                style={{
                  fontSize: "1.45rem",
                  fontWeight: "600",
                  margin: 0,
                  color: theme.colors.textPrimary,
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onAddItem}
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              border: "none",
              background: accentColor,
              color: buttonTextColor,
              cursor: "pointer",
              fontSize: "1.25rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: buttonShadow,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            +
          </button>
        </div>

        {/* Description */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              color: secondaryText,
              lineHeight: "1.6",
              maxWidth: "250px",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </GlowCard>
  );
}
