import type { MetadataRoute } from "next";

const BASE = "https://lunarlogic.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = ["", "/how-it-works", "/use-cases", "/case-studies", "/contact"];

  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
