// import { retro } from "daisyui/themes/retro";
import daisyui from "daisyui";
import { retro, business } from "daisyui/src/theming/themes";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            '.prose :where(blockquote p:first-of-type):not(:where([class~="not-prose"], [class~="not-prose"] *))::before':
              {
                content: "none",
              },
          },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...retro,
          accent: "#7dd3fc",
        },
        dark: {
          ...business,
          accent: "#84d0f1",
        },
      },
    ],
    // themes: ["retro", "business"],
    // darkTheme: "business",
  },
  plugins: [require("@tailwindcss/typography"), daisyui],
};
