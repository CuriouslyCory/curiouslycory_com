import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      animation: {
        float: "float 3s ease-in-out infinite",
        "rotate-15": "rotate-15 0.25s ease-in-out infinite",
        "mirror-rotate-15": "mirror-rotate-15 0.25s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--gradient-color-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
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
      },
      fontFamily: {
        sans: ["var(--font-raleway)", ...fontFamily.sans],
        mono: ["var(--font-oxygen-mono)", ...fontFamily.mono],
        oswald: ["var(--font-oswald)", ...fontFamily.sans],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(3%)" },
          "50%": { transform: "translateY(0)" },
        },
        "rotate-15": {
          "0%": { transform: "rotate(0deg) scaleX(1)" },
          "50%": { transform: "rotate(15deg) scaleX(0.9)" },
          "100%": { transform: "rotate(0deg) scaleX(1)" },
        },
        "mirror-rotate-15": {
          "0%": { transform: "rotate(0deg) scaleX(-1) translateX(-4rem)" },
          "50%": { transform: "rotate(15deg) scaleX(-0.9) translateX(-4rem)" },
          "100%": { transform: "rotate(0deg) scaleX(-1) translateX(-4rem)" },
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
