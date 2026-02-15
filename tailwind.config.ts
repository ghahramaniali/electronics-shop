import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        accent: "var(--color-accent)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "text-inverse": "var(--color-text-inverse)",
        "border-light": "var(--color-border-light)",
        "border-medium": "var(--color-border-medium)",
        "border-dark": "var(--color-border-dark)",
        "state-hover": "var(--color-state-hover)",
        "state-active": "var(--color-state-active)",
        "state-focus": "var(--color-state-focus)",
        "state-disabled": "var(--color-state-disabled)",
      },
    },
  },
  plugins: [],
} satisfies Config;
