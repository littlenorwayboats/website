import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export const colors = {
  norse: {
    700: "#3a4e5c",
    800: "#2c3d4a",
    900: "#243644",
    950: "#1c2832",
  },
  gold: {
    DEFAULT: "#e6d5bc",
    bright: "#f8f2e8",
  },
  parchment: "#f2ebe1",
  rust: {
    DEFAULT: "#9a5234",
    dim: "#7e4229",
  },
  neon: {
    DEFAULT: "#9a5234",
    dim: "#7e4229",
  },
  iron: "#6a6560",
  mist: "#c5beb4",
  charcoal: "#1a1e20",
  walnut: "#2b1d15",
  steel: "#243644",
  ink: "#0e151c",
  leaf: "#1f2324",
} as const;

const boxShadow = {
  stone: "0 14px 42px rgba(14, 21, 28, 0.4)",
  card: "0 8px 24px rgba(14, 21, 28, 0.32)",
  wood: "0 2px 6px rgba(14, 21, 28, 0.45)",
  nav: "0 8px 24px rgba(14, 21, 28, 0.32), inset 0 1px 0 rgba(248, 242, 232, 0.06)",
  neon: "0 2px 8px rgba(154, 82, 52, 0.28)",
  "neon-hover": "0 4px 14px rgba(154, 82, 52, 0.4)",
} as const;

const textShadow = {
  carved: "0 2px 0 rgba(14, 21, 28, 0.35), 0 8px 22px rgba(14, 21, 28, 0.45)",
  etched: "0 1px 0 rgba(14, 21, 28, 0.55), 0 2px 8px rgba(14, 21, 28, 0.35)",
  heading: "0 2px 6px rgba(14, 21, 28, 0.45)",
} as const;

const dropShadow = {
  logo: "0 12px 22px rgba(0, 0, 0, 0.75)",
} as const;

const letterSpacing = {
  nav: "0.18em",
  label: "0.16em",
  cta: "0.14em",
  section: "0.22em",
} as const;

const cssVariables = {
  "--color-norse-700": colors.norse[700],
  "--color-norse-800": colors.norse[800],
  "--color-norse-900": colors.norse[900],
  "--color-norse-950": colors.norse[950],
  "--color-gold": colors.gold.DEFAULT,
  "--color-gold-bright": colors.gold.bright,
  "--color-parchment": colors.parchment,
  "--color-rust": colors.rust.DEFAULT,
  "--color-rust-dim": colors.rust.dim,
  "--color-neon": colors.neon.DEFAULT,
  "--color-neon-dim": colors.neon.dim,
  "--color-iron": colors.iron,
  "--color-mist": colors.mist,
  "--color-charcoal": colors.charcoal,
  "--color-walnut": colors.walnut,
  "--color-steel": colors.steel,
  "--color-ink": colors.ink,
  "--color-leaf": colors.leaf,
  "--shadow-stone": boxShadow.stone,
  "--shadow-card": boxShadow.card,
  "--shadow-wood": boxShadow.wood,
  "--shadow-nav": boxShadow.nav,
  "--shadow-neon": boxShadow.neon,
  "--shadow-neon-hover": boxShadow["neon-hover"],
  "--text-shadow-carved": textShadow.carved,
  "--text-shadow-etched": textShadow.etched,
  "--text-shadow-heading": textShadow.heading,
} as const;

const config = {
  theme: {
    extend: {
      colors,
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-body)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow,
      dropShadow,
      textShadow,
      letterSpacing,
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ":root": cssVariables,
      });
    }),
  ],
} satisfies Config;

export default config;
