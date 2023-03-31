import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://stevendcoffey.com",
  experimental: {
    assets: true,
  },
  markdown: {
    draft: true,
  },
  integrations: [
    mdx({
      drafts: true,
    }),
    sitemap(),
    tailwind(),
  ],
});
