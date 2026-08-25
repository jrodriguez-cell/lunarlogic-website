import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Client-specific demo walkthroughs — kept out of crawler indexes so
      // prospecting tools don't infer the ICP from a single client.
      disallow: [
        "/gualapack",
        "/gualapack.html",
        "/truemixmasters",
        "/truemixmasters.html",
        "/amy",
      ],
    },
    sitemap: "https://lunarlogic.ai/sitemap.xml",
    host: "https://lunarlogic.ai",
  };
}
