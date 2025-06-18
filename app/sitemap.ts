import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://antique05.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://antique05.vercel.app/shop",
      lastModified: new Date(),
    },
    {
      url: "https://antique05.vercel.app/about",
      lastModified: new Date(),
    },
    {
      url: "https://antique05.vercel.app/contact",
      lastModified: new Date(),
    },
    {
      url: "https://antique05.vercel.app/services",
      lastModified: new Date(),
    },
  ];
}
