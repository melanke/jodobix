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
          primary: "#7700FF", // botões principais
          "primary-content": "#FFFFFF",
          secondary: "#DDCCFF", // botões secundários, sombras e selecionados
          accent: "#7700FF", // placeholders
          neutral: "#000000",
          "base-100": "#FFFFFF", // header e paineis principais
          "base-200": "#FFFFFF", // bg
          "base-300": "#DDCCFF", // bordas, abas e paineis secundários
          "base-content": "#000000",
          info: "#7700FF",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "#DDCCFF",
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
          primary: "#7700FF", // botões principais
          "primary-content": "#000000",
          secondary: "#443366", // botões secundários, sombras e selecionados
          accent: "#7700FF", // placeholders
          neutral: "#FFFFFF",
          "base-100": "#090919", // header e paineis principais
          "base-200": "#050511", // bg
          "base-300": "#443366", // bordas, abas e paineis secundários
          "base-content": "#FFFFFF",
          info: "#7700FF",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "#443366",
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
        "encode-sans": ["var(--font-encode-sans)", "sans-serif"],
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
