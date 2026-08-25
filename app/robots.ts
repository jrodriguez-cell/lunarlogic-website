import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://lunarlogic.ai/sitemap.xml",
    host: "https://lunarlogic.ai",
  };
}
