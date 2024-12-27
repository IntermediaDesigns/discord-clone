import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        discord: {
          // Background colors
          "bg-darkest": "#0E061A", // Main application background
          "bg-darker": "#1A0B2E", // Sidebar background
          "bg-dark": "#2D1B4E", // Channel list background
          "bg-primary": "#392766", // Message input, modals
          "bg-secondary": "#4B3480", // Hover states, active items
          "bg-accent": "#7B4DFF", // Mention badges, links, buttons

          // Accent colors
          "accent-primary": "#7B4DFF", // Primary buttons, links, selections
          "accent-secondary": "#9E7DFF", // Secondary actions, highlights

          // Text colors
          "text-primary": "#FFFFFF", // Primary text
          "text-secondary": "#B8A7D9", // Secondary text, descriptions
          "text-muted": "#7A6B99", // Timestamps, placeholders

          // Additional utility colors
          hover: "#4B3480", // Hover state background
          active: "#392766", // Active state background
          border: "#2D1B4E", // Border colors
          divider: "#2D1B4E", // Divider lines
          input: "#392766", // Input background
          tooltip: "#1A0B2E", // Tooltip background
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundColor: {
        "hover-transparent": "rgba(75, 52, 128, 0.1)",
      },
      borderColor: {
        "discord-border": "#2D1B4E",
      },
      boxShadow: {
        discord: "0 2px 10px 0 rgba(0, 0, 0, 0.2)",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active", "group-hover"],
      textColor: ["group-hover"],
      borderColor: ["focus-visible"],
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
