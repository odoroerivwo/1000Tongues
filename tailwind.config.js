/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // --- Custom screen breakpoints for full responsiveness ---
    screens: {
      xs: "320px",   // Small phones
      sm: "480px",   // Standard phones
      md: "768px",   // Tablets
      lg: "1024px",  // Small laptops
      xl: "1280px",  // Desktops
      "2xl": "1536px",
      "3xl": "1920px", // Extra large screens
    },

    extend: {
      // --- Fonts ---
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
        display: ["Montserrat", "Poppins", "system-ui", "sans-serif"],
        newyork: ["NewYork", "serif"],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },

      // --- Colors ---
      colors: {
        primary: "#ffd700",  // Gold for 1000 Tongues
        secondary: "#007bff", // Blue
        accent: "#0EA5E9",   // Sky
        dark: "#1a1a1a",     // Dark background
        "dark-gray": "#2d2d2d", // Dark gray
        light: "#F8FAFC",    // Soft white
        muted: "#CBD5E1",
      },

      // --- Container ---
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.25rem",
          md: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
          "2xl": "3rem",
        },
        screens: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1440px",
        },
      },

      // --- Font Sizes with responsive scaling ---
      fontSize: {
        'hero': ['clamp(2.5rem, 8vw, 9.375rem)', {
          lineHeight: '1.1',
          letterSpacing: '0px',
        }],
        'hero-sm': ['2.5rem', { lineHeight: '1.2' }],
        'hero-md': ['4rem', { lineHeight: '1.1' }],
        'hero-lg': ['6rem', { lineHeight: '1.1' }],
        'hero-xl': ['9.375rem', { lineHeight: '0.93' }],
      },

      // --- Shadows & Borders ---
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
        medium: "0 4px 16px rgba(0, 0, 0, 0.12)",
        strong: "0 6px 20px rgba(0, 0, 0, 0.16)",
      },
      
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },

      // --- Spacing extensions ---
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },

      // --- Animations ---
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceIn: {
          "0%, 20%, 40%, 60%, 80%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out",
        slideUp: "slideUp 0.6s ease-out",
        bounceIn: "bounceIn 1s ease-in-out",
      },
    },
  },

  // Tailwind v4 doesn't use plugins in the same way
  // Remove the require() statements - they don't work in v4
  plugins: [],
}