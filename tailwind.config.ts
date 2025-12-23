import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "var(--brand-purple)",
          magenta: "var(--brand-magenta)",
          navy: "var(--brand-navy)",
          blue: "var(--brand-blue)",
          green: "var(--brand-green)",
          orange: "var(--brand-orange)",
          red: "var(--brand-red)"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
