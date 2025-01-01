import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
  const blog = await getCollection("blog");

  return rss({
    title: "Skyler's blog",
    description: "Skyler's blog",
    site: context.site!,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
      author: "Skyler Arnold",
    })),
  });
};
