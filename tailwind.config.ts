import type { Config } from "tailwindcss";

/**
 * Tokens de marca de Harold Pérez con dirección estilo Apple: limpio, pulido,
 * con tipografía sans cohesiva, neutros tintados y el dorado como hilo fino.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1D3563", // primario
          deep: "#14233F", // titulares y texto fuerte
          soft: "#2A4578", // hover
        },
        blue: {
          DEFAULT: "#3F5F9D", // iconos y acentos secundarios
          soft: "#5A78B3",
        },
        gold: {
          DEFAULT: "#D4A64A", // dorado, siempre como hilo fino
          deep: "#9A7320", // texto y numeración sobre claro
          soft: "#E3C182",
        },
        ink: {
          DEFAULT: "#2E3A4F", // cuerpo
          soft: "#697587", // secundario
          faint: "#9AA4B4", // micro
        },
        surface: "#FFFFFF", // superficie de la card
        cream: "#FCFAF6", // bloques alternativos con peso
        mist: {
          DEFAULT: "#F5F7FA",
          deep: "#ECEFF4",
        },
        sage: { DEFAULT: "#3F7A6B", soft: "#E6EFEC" },
        amber: { DEFAULT: "#B07A2E", soft: "#F6EEDD" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tight: "-0.022em",
        tightish: "-0.015em",
        eyebrow: "0.16em",
      },
      boxShadow: {
        // Sombras suaves, estilo Apple
        card: "0 1px 2px rgba(16,38,63,0.04), 0 20px 50px -16px rgba(16,38,63,0.18), 0 6px 16px -8px rgba(16,38,63,0.06)",
        soft: "0 2px 12px -4px rgba(16,38,63,0.12)",
        lift: "0 14px 30px -12px rgba(16,38,63,0.24)",
        gold: "0 12px 30px -10px rgba(212,166,74,0.5)",
        avatar: "0 0 0 5px #FFFFFF, 0 12px 26px -10px rgba(16,38,63,0.3)",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
