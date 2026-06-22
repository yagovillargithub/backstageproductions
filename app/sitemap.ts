import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`,          lastModified: now, changeFrequency: "weekly",  priority: 1 },
    { url: `${SITE_URL}/artistas`,  lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/sesiones`,  lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/eventos`,   lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/contacto`,  lastModified: now, changeFrequency: "yearly",  priority: 0.7 },
  ];
}
