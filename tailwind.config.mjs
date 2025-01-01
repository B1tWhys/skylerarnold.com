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
  plugins: [require("@tailwindcss/typography")],
};
