// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { targetBlank } from "./src/plugins/targetBlank";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://skylerarnold.com",
  integrations: [
    tailwind(),
    sitemap(),
    expressiveCode({
      plugins: [pluginLineNumbers()],
      defaultProps: {
        showLineNumbers: true,
      },
      themes: ["dracula", "everforest-light"],
    }),
    mdx(),
    icon({
      include: {
        tabler: ["rss"],
      },
    }),
  ],
  experimental: {
    contentIntellisense: true,
  },
  markdown: {
    rehypePlugins: [
      [targetBlank, { ignorePattern: /.*localhost|skylerarnold\.com.*/ }],
    ],
  },
  prefetch: true,
});
