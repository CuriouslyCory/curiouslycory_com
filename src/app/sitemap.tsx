import { type MetadataRoute } from "next";
import { api } from "~/trpc/server";

// Configure this route as static
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: "https://curiouslycory.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://curiouslycory.com/cv",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const blogPosts = await api.blog.getAll({
    page: 1,
    perPage: 100,
  });

  blogPosts.posts.forEach((post) => {
    sitemap.push({
      url: `https://curiouslycory.com/blog/${post.slug}`,
      lastModified: post.publishedAt ?? new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    });
  });

  return sitemap;
}
