import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { api } from "~/trpc/server";
import { PostCard } from "~/components/blog/post-card";
import { Pagination } from "~/components/blog/pagination";
import { BlogSearch } from "~/components/blog/blog-search";

export const metadata: Metadata = {
  title: "Blog | CuriouslyCory",
  description: "Read my thoughts on technology, development, and more.",
};

type BlogPageProps = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    page?: string;
    featured?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Await searchParams before using its properties
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const perPage = 9;

  // Parse search params
  const query = {
    q: params.q,
    tag: params.tag,
    featured: params.featured === "true",
    page,
    perPage,
  };

  // Fetch blog posts and pagination info
  const { posts, pagination } = await api.blog.getAll(query);

  if (page > 1 && !posts.length) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground">
          Thoughts, ideas, and explorations on web development and technology.
        </p>
        <BlogSearch />
      </div>

      {/* Filters and tags would go here */}

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Show pagination if we have more than one page */}
      {pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            totalPages={pagination.totalPages}
            currentPage={pagination.page}
          />
        </div>
      )}

      {/* Show message if no posts found */}
      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="mb-2 text-2xl font-semibold">No posts found</h2>
          <p className="text-muted-foreground mb-8">
            {params.q
              ? `No posts found matching "${params.q}"`
              : "No posts found. Check back later!"}
          </p>
        </div>
      )}
    </div>
  );
}
