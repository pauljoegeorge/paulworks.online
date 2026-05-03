// All values reference CSS variables defined in index.css.
// Chart/data-viz colors that must stay concrete for canvas/SVG rendering:
export const dataColors = {
  primary:       "#3e41a5",
  primaryLight:  "#6366f1",
  purpleGrey:    "#616992",
  lightGrey:     "#f1f5f9",  // used in chart fill + subtle UI surfaces
  cherry:        "#ef4444",
  orange:        "#f97316",
  yellow:        "#f59e0b",
  blue:          "#0ea5e9",
  pastelPurple:  "#a78bfa",
  lavender:      "#c4b5fd",
  lightOrange:   "rgba(249, 115, 22, 0.38)",
};

// Theme-aware tokens — use these in styled-components
export const colors = {
  // Surfaces
  bgPage:    "var(--background)",
  bgCard:    "var(--card)",
  bgSidebar: "var(--bg-sidebar)",

  // Text
  textPrimary:   "var(--foreground)",
  textSecondary: "var(--muted-foreground)",
  textMuted:     "var(--muted-foreground)",

  // Brand
  primary:        "var(--primary)",
  primaryFg:      "var(--primary-foreground)",

  // Borders & shadows
  borderLight:   "var(--border)",
  shadowColor:   "var(--shadow-color)",

  // Semantic
  destructive:   "var(--destructive)",

  // Chart/data-viz passthroughs (concrete values needed for canvas rendering)
  ...dataColors,
};
