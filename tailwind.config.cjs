const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        peachi: ["Peachi", ...defaultTheme.fontFamily.serif],
      },
      typography: ({ theme }) => ({
        indigo: {
          css: {
            "--tw-prose-headings": theme("colors.indigo[800]"),
            "--tw-prose-body": theme("colors.indigo[900]"),
            "--tw-prose-bold": theme("colors.indigo[900]"),
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addComponents }) {
      addComponents({
        ".image-noselect": {
          "-webkit-touch-callout": "none !important",
          "-webkit-user-select": "none !important",
          "pointer-events": "none",
        },
        ".max-h-available": {
          "max-height": "stretch",
        },
        ".min-h-available": {
          "min-height": "stretch",
        },
        ".h-available": {
          "min-height": "stretch",
        },
        ".scrollbar-hidden::-webkit-scrollbar": {
          display: "none",
        },
        ".scrollbar-hidden": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
