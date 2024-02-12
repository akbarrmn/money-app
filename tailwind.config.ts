import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "2rem",
          lg: "3rem",
          xl: "4rem",
          "2xl": "6rem",
        },
        screens: {
          sm: "100%",
          md: "1024px",
          lg: "1360px",
          xl: "1600px",
          "2xl": "1980px",
        },
      },
    },
  },
  plugins: [],
};
