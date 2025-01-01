// Changes external links to open in a new tab
// Courtesy of https://dsalvagni.com/b/astro-plugin-open-external-links-in-new-tab/

import type { RehypePlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Element } from "hast";

export const targetBlank: RehypePlugin = ({ ignorePattern }) => {
  return (tree) => {
    visit(tree, "element", (e: Element) => {
      if (
        e.tagName === "a" &&
        e.properties?.href &&
        !e.properties.href.toString().match(ignorePattern)
      ) {
        e.properties!["target"] = "_blank";
      }
    });
  };
};
