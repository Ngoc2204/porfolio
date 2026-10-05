import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { getBlogPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const posts = getBlogPosts().map((post) => ({
    url: `${site}/blogs/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: site,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site}/resume`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...posts,
  ];
}
