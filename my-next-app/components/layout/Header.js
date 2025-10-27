"use client";

import { theme } from "../../styles/theme";

const MenuIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
  >
    <path d="M4 7h16" />
    <path d="M7 12h13" />
    <path d="M4 17h16" />
  </svg>
);

const SearchIcon = ({ size = 18 }) => (
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
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-3.4-3.4" />
  </svg>
);

const CalendarIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3.5" y="5" width={17} height={15} rx={2.5} />
    <path d="M8 3.5v3" />
    <path d="M16 3.5v3" />
    <path d="M3.5 10h17" />
    <path d="M9 14h6" />
  </svg>
);

const BellIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18.5 16.5H5.5l1-1.5a5 5 0 0 0 .9-2.9V10a5.6 5.6 0 0 1 11.2 0v2.1a5 5 0 0 0 .9 2.9l1 1.5Z" />
    <path d="M10 18.5a2 2 0 0 0 4 0" />
  </svg>
);

const defaultPalette = {
  emerald: "#037971",
  deepTeal: "#214E5D",
  sapphire: "#275DAD",
};

const defaultActions = [
  { label: "Search schedule", Icon: SearchIcon },
  { label: "Daily planner", Icon: CalendarIcon },
  { label: "Notifications", Icon: BellIcon },
];

export default function Header({
  isMobile,
  sidebarOpen,
  onToggleSidebar,
  headerActions = defaultActions,
  palette = defaultPalette,
}) {
  const iconButtonStyle = (active = false) => ({
    width: isMobile ? "36px" : "42px",
    height: isMobile ? "36px" : "42px",
    borderRadius: "9999px",
    border: "1px solid rgba(33, 78, 93, 0.22)",
    background: active
      ? "linear-gradient(145deg, rgba(3, 121, 113, 0.28) 0%, rgba(39, 93, 173, 0.32) 100%)"
      : "rgba(212, 245, 245, 0.92)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: palette.deepTeal,
    cursor: "pointer",
    transform: "translateY(0)",
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease",
    boxShadow: active
      ? "0 18px 38px rgba(32, 78, 93, 0.28)"
      : "0 12px 28px rgba(33, 78, 93, 0.18)",
  });

  const resetIconButtonStyle = (element, active = false) => {
    if (!element) return;
    const base = iconButtonStyle(active);
    Object.entries(base).forEach(([property, value]) => {
      element.style[property] = value;
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: isMobile ? "0.75rem" : "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "100%",
        maxWidth: isMobile ? "560px" : "720px",
        padding: isMobile ? "0 0.75rem" : "0 1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? "0.75rem" : "1.25rem",
          padding: isMobile ? "0.75rem 1rem" : "0.9rem 1.5rem",
          borderRadius: "26px",
          border: "1px solid rgba(3, 121, 113, 0.18)",
          background:
            "linear-gradient(125deg, rgba(212, 245, 245, 0.9) 0%, rgba(240, 234, 214, 0.92) 55%, rgba(39, 93, 173, 0.22) 100%)",
          boxShadow: "0 28px 52px rgba(3, 121, 113, 0.25)",
          backdropFilter: "blur(28px)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0.55rem" : "0.75rem",
          }}
        >
          <button
            onClick={onToggleSidebar}
            type="button"
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            style={iconButtonStyle(sidebarOpen)}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateY(-2px)";
              event.currentTarget.style.boxShadow =
                "0 20px 40px rgba(3, 121, 113, 0.3)";
            }}
            onMouseLeave={(event) =>
              resetIconButtonStyle(event.currentTarget, sidebarOpen)
            }
          >
            {sidebarOpen ? (
              <span
                style={{ fontSize: "1rem", fontWeight: 600, lineHeight: 1 }}
              >
                ×
              </span>
            ) : (
              <MenuIcon size={isMobile ? 16 : 18} />
            )}
          </button>

          <span
            style={{
              fontSize: isMobile ? "1rem" : "1.25rem",
              fontWeight: 600,
              color: theme.colors.textPrimary,
              letterSpacing: "0.05em",
            }}
          >
            Cute Schedule
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0.6rem" : "0.75rem",
          }}
        >
          {headerActions.map(({ label, Icon }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              style={iconButtonStyle(false)}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateY(-2px)";
                event.currentTarget.style.boxShadow =
                  "0 18px 38px rgba(32, 78, 93, 0.28)";
              }}
              onMouseLeave={(event) =>
                resetIconButtonStyle(event.currentTarget)
              }
            >
              <Icon size={isMobile ? 16 : 18} />
            </button>
          ))}

          <button
            type="button"
            aria-label="Toggle theme"
            style={iconButtonStyle(false)}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateY(-2px)";
              event.currentTarget.style.boxShadow =
                "0 18px 38px rgba(32, 78, 93, 0.28)";
            }}
            onMouseLeave={(event) => resetIconButtonStyle(event.currentTarget)}
          >
            <svg
              width={isMobile ? 16 : 18}
              height={isMobile ? 16 : 18}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="View profile"
            style={{
              width: isMobile ? "36px" : "42px",
              height: isMobile ? "36px" : "42px",
              borderRadius: "50%",
              border: "1px solid rgba(3, 121, 113, 0.18)",
              background: `linear-gradient(145deg, ${palette.emerald} 0%, ${palette.sapphire} 100%)`,
              color: "#FFFFFF",
              fontWeight: 600,
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transform: "translateY(0)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 18px 32px rgba(3, 121, 113, 0.35)",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateY(-2px)";
              event.currentTarget.style.boxShadow =
                "0 22px 38px rgba(39, 93, 173, 0.42)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "translateY(0)";
              event.currentTarget.style.boxShadow =
                "0 18px 32px rgba(3, 121, 113, 0.35)";
            }}
          >
            YOU
          </button>
        </div>
      </div>
    </div>
  );
}
