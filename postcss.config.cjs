module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    "postcss-preset-env": {
      features: { "nesting-rules": false },
    },
    "postcss-flexbugs-fixes": {},
    autoprefixer: {},
  },
};
