export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "warm-cream": "#F5F1ED",
        "saddle-brown": "#8B5A2B",
        "modern-earthy": "#5A6B5B",
        background: "#F5F1ED",
        foreground: "#8B5A2B",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "var(--font-cinzel)"],
        lato: ["var(--font-lato)", "var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};
