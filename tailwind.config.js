import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#53629E",
          secondary: "#87BAC3",
          accent: "#87BAC3",
          neutral: "#473472",
          "base-100": "#D6F4ED",
          "base-200": "#87BAC3",
          "base-300": "#53629E",
          "base-content": "#473472",

          info: "#87BAC3",
          success: "#16a34a",
          warning: "#facc15",
          error: "#dc2626",
        },
      },
      "light", // optional fallback theme
    ],
  },
};
