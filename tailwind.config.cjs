/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
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
        "scrollbar-hidden": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
