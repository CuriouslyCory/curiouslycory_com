import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { api } from "~/trpc/server";

// Type for the dynamic params
type BlogPostLayoutProps = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

// Generate metadata for the post
export async function generateMetadata({
  params,
}: BlogPostLayoutProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const post = await api.blog.getBySlug({ slug });

    if (!post) return notFound();

    return {
      title: `${post.title} | Blog | CuriouslyCory`,
      description: post.excerpt ?? undefined,
      openGraph: post.coverImage
        ? {
            images: [{ url: post.coverImage }],
          }
        : undefined,
    };
  } catch (error) {
    return {
      title: "Blog Post | CuriouslyCory",
    };
  }
}

// This makes all post data available to the page component
export default async function BlogPostLayout({
  children,
  params,
}: BlogPostLayoutProps) {
  const { slug } = params;

  // Try to fetch post metadata from the database
  const post = await api.blog.getBySlug({ slug }).catch(() => null);

  // If not found in production, return 404
  if (!post && process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      {/* 
        The actual content will be rendered by the page component,
        we're just providing the layout structure here
       */}
      {children}
    </div>
  );
}
