export const colors = {
  light: {
    primary: "#2b6777",
    secondary: "#c8d8e4",
    background: "#ffffff",
    surface: "#f2f2f2",
    accent: "#52ab98",
    text: {
      primary: "#1f2937",
      secondary: "#64748b",
      muted: "#94a3b8",
      inverse: "#ffffff",
    },
    border: {
      light: "#e2e8f0",
      medium: "#cbd5e1",
      dark: "#94a3b8",
    },
    state: {
      hover: "#f8fafc",
      active: "#f1f5f9",
      focus: "#3b82f6",
      disabled: "#e2e8f0",
    },
  },
  dark: {
    primary: "#1e40af",
    secondary: "#1e3a8a",
    background: "#0f172a",
    surface: "#334155",
    accent: "#22d3ee",
    text: {
      primary: "#f1f5f9",
      secondary: "#e2e8f0",
      muted: "#9ca3af",
      inverse: "#0f172a",
    },
    border: {
      light: "#4b5563",
      medium: "#6b7280",
      dark: "#1f2937",
    },
    state: {
      hover: "#374151",
      active: "#1f2937",
      focus: "#38bdf8",
      disabled: "#4b5563",
    },
  },
};

export type ColorTheme = typeof colors.light | typeof colors.dark;

export function getColor(theme: "light" | "dark") {
  return colors[theme];
}
