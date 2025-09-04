// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['game_over', 'sans-serif'],
        center: ['zerovelo', 'sans-serif'],
        sub: ['sporty', 'sans-serif'],
        title: ['bayon', 'sans-serif'],
        body: ['hepta', 'sans-serif'],
        presentation: ['blackHan', 'sans-serif'],
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      screens: {
        xs: "480px", 
        sm: "640px",
        md: "768px",
        lg: "1024px", 
        xl: "1280px",
        "2xl": "1536px",
      },

      fontSize: {
        "fluid-xs": "clamp(0.75rem, 1vw, 0.875rem)",   // 12px ~ 14px
        "fluid-sm": "clamp(0.875rem, 1.2vw, 1rem)",    // 14px ~ 16px
        "fluid-md": "clamp(1rem, 1.5vw, 1.25rem)",     // 16px ~ 20px
        "fluid-lg": "clamp(1.25rem, 2vw, 1.5rem)",     // 20px ~ 24px
        "fluid-xl": "clamp(1.5rem, 3vw, 2rem)",        // 24px ~ 32px
        "fluid-2xl": "clamp(2rem, 4vw, 3rem)",         // 32px ~ 48px
      },

      spacing: {
        "fluid-px": "clamp(0.5rem, 1vw, 1rem)",  // 8px ~ 16px
        "fluid-sm": "clamp(1rem, 2vw, 1.5rem)",  // 16px ~ 24px
        "fluid-md": "clamp(1.5rem, 3vw, 2rem)",  // 24px ~ 32px
        "fluid-lg": "clamp(2rem, 4vw, 3rem)",    // 32px ~ 48px
      },
    },
  },
  plugins: [],
};

export default config;
