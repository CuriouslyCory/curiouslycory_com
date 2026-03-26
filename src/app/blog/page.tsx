import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { api } from "~/trpc/server";
import { PostCard } from "~/components/blog/post-card";
import { Pagination } from "~/components/blog/pagination";
import { BlogSearch } from "~/components/blog/blog-search";
import { ActiveFilters } from "~/components/blog/active-filters";
import { DateFilter } from "~/components/blog/date-filter";
import { getMonthName } from "~/lib/date-utils";
import { ChatBubble } from "~/components/ui/chat-bubble";

export const metadata: Metadata = {
  title: "Blog | CuriouslyCory",
  description: "Read my thoughts on technology, development, and more.",
};

type BlogPageProps = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
    year?: string;
    month?: string;
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
    year: params.year ? Number(params.year) : undefined,
    month: params.month ? Number(params.month) : undefined,
    page,
    perPage,
  };

  // Fetch blog posts and pagination info
  const { posts, pagination } = await api.blog.getAll(query);
  const { posts: featuredPosts } = await api.blog.getAll({
    ...query,
    featured: true,
    perPage: 3,
  });

  if (page > 1 && !posts.length) {
    notFound();
  }

  return (
    <div className="container px-4 py-8 md:mx-auto">
      <div className="mb-8 space-y-4">
        <h1 className="font-oswald text-4xl font-bold">Blog</h1>
        <p className="text-muted-foreground">
          Thoughts, ideas, and explorations on web development and technology.
        </p>
        <BlogSearch />
        <ActiveFilters />
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full flex-shrink-0 md:w-40 md:sticky md:top-20 md:self-start">
          <details className="md:hidden">
            <summary className="cursor-pointer text-sm font-medium">Filter by date</summary>
            <DateFilter />
          </details>
          <div className="hidden md:block">
            <DateFilter />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {featuredPosts.length > 0 && (
            <>
              <h2 className="mb-4 text-2xl font-bold">Featured Posts</h2>
              <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post, index) => (
                  <div key={post.id} className={index === 0 ? "h-full md:col-span-2" : "h-full"}>
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </>
          )}

          {posts.length > 0 && (
            <>
              <h2 className="mb-4 text-2xl font-bold">
                {params.q
                  ? `Search Results for "${params.q}"`
                  : params.tag
                    ? `Posts tagged with #${params.tag}`
                    : params.year
                      ? `Posts from ${params.year}${
                          params.month
                            ? ` - ${getMonthName(Number(params.month))}`
                            : ""
                        }`
                      : "All Posts"}
              </h2>
              <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}

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
              <ChatBubble
                variant="whisper"
                text="No transmissions found on that frequency."
                direction="bottom"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
