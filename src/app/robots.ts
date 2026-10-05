import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // internal component playground — not part of the site
      disallow: ["/api/", "/components", "/components1", "/components2", "/components3", "/components-mono"],
    },
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
