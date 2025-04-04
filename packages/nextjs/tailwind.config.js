/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#622902", // botões principais
          "primary-content": "#FFF5C8",
          secondary: "#F0DD8D", // botões secundários, sombras e selecionados
          "secondary-content": "#844208",
          accent: "#622902", // placeholders
          "accent-content": "#FFFBE9",
          neutral: "#844208",
          "base-100": "#FFFCF0", // header e paineis principais
          "base-200": "#F0EBD9", // bg
          "base-300": "#FFF5C8", // bordas, abas e paineis secundários
          "base-content": "#844208",
          info: "#622902",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "#FFF5C8",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      {
        dark: {
          primary: "#F4E7B0", // botões principais
          "primary-content": "#1A0801",
          secondary: "#110000", // botões secundários, sombras e selecionados
          "secondary-content": "#FFFBE9",
          accent: "#FFDD99", // placeholders
          "accent-content": "#1A0801",
          neutral: "#FFFBE9",
          "base-100": "#200E02", // header e paineis principais
          "base-200": "#150500", // bg
          "base-300": "#331B04", // bordas, abas e paineis secundários
          "base-content": "#FFFBE9",
          info: "#F4E7B0",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "#331B04",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-content)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-content)",
        },
        destructive: {
          DEFAULT: "var(--error)",
          foreground: "var(--primary-content)",
        },
        muted: {
          DEFAULT: "var(--base-200)",
          foreground: "var(--base-content)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-content)",
        },
        popover: {
          DEFAULT: "var(--base-100)",
          foreground: "var(--base-content)",
        },
        card: {
          DEFAULT: "var(--base-100)",
          foreground: "var(--base-content)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
