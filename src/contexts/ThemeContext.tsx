"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getColor } from "@/styles/colors";
import { colors } from "@/styles/colors";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof colors.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const colors = getColor(theme);

    const root = document.documentElement;

    // Set our custom color variables
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-background", colors.background);
    root.style.setProperty("--color-surface", colors.surface);
    root.style.setProperty("--color-accent", colors.accent);

    root.style.setProperty("--color-text-primary", colors.text.primary);
    root.style.setProperty("--color-text-secondary", colors.text.secondary);
    root.style.setProperty("--color-text-muted", colors.text.muted);
    root.style.setProperty("--color-text-inverse", colors.text.inverse);

    root.style.setProperty("--color-border-light", colors.border.light);
    root.style.setProperty("--color-border-medium", colors.border.medium);
    root.style.setProperty("--color-border-dark", colors.border.dark);

    root.style.setProperty("--color-state-hover", colors.state.hover);
    root.style.setProperty("--color-state-active", colors.state.active);
    root.style.setProperty("--color-state-focus", colors.state.focus);
    root.style.setProperty("--color-state-disabled", colors.state.disabled);

    // Also set the global background and foreground variables used by globals.css
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.text.primary);

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, colors: getColor(theme) }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
