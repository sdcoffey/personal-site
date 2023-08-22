import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://stevendcoffey.com",
  experimental: {
    assets: true,
  },
  integrations: [
    mdx({
      drafts: true,
    }),
    sitemap(),
    tailwind(),
  ],
});
