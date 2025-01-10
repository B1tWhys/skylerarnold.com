// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { targetBlank } from "./src/plugins/targetBlank";
import remarkMath from "remark-math";

import icon from "astro-icon";
import rehypeKatex from "rehype-katex";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://skylerarnold.com",
  integrations: [
    tailwind(),
    sitemap(),
    expressiveCode({
      plugins: [pluginLineNumbers(), pluginCollapsibleSections()],
      defaultProps: {
        showLineNumbers: true,
      },
      themes: ["dracula", "everforest-light"],
    }),
    mdx(),
    react(),
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
    remarkPlugins: [[remarkMath, {}]],
    rehypePlugins: [
      [targetBlank, { ignorePattern: /.*localhost|skylerarnold\.com.*/ }],
      [rehypeKatex, {}],
    ],
  },
  prefetch: false,
});
