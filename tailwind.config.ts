import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        transparent: "transparent",
        "color-white": "#ffffff",
        "color-blue": "#1e97f5",
        "color-black": "#283149",
        "color-dark-gray": "#565e73",
        "color-gray": "#a0a0ae",
        "color-red": "#e52261",
        "color-green": "#8cc44c",
        "color-dark-green": "#24b552",
        "color-yellow": "#fd9901",
        "color-light-yellow": "#fed097",
        "color-light-gray": "#f4f4f5",
        "color-light-blue": "#f1f3fb",
        "color-light-green": "#eefca1",
        "color-light-red": "#fff0f3",
      },
    },
  },
  plugins: [],
} satisfies Config
