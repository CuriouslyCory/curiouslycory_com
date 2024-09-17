import Image from "next/image";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import { ChevronLeftIcon } from "lucide-react";

import { api } from "~/trpc/server";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;

  // Fetch post data from the database
  const post = await api.blog.getBySlug({ slug }).catch(() => null);

  // If no post found, return 404
  if (!post) {
    notFound();
  }

  const publishDate = post.publishedAt ?? post.createdAt;

  return (
    <article className="mx-auto max-w-3xl">
      {/* Back button */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="pl-0">
          <Link href="/blog">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
        </Button>
      </div>

      {/* Post header */}
      <header className="mb-8">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">{post.title}</h1>

        {post.excerpt && (
          <p className="text-muted-foreground mb-6 text-xl">{post.excerpt}</p>
        )}

        <div className="flex items-center gap-4">
          {post.author?.name && (
            <div className="flex items-center gap-2">
              {post.author.image && (
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span>{post.author.name}</span>
            </div>
          )}

          {publishDate && (
            <span className="text-muted-foreground text-sm">
              {formatDistance(new Date(publishDate), new Date(), {
                addSuffix: true,
              })}
            </span>
          )}
        </div>
      </header>

      {/* Featured image */}
      {post.coverImage && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Post content - this will be empty in the default template */}
      {/* In custom blog posts, you'll replace this with your actual content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post.content && (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
        {!post.content && (
          <div className="bg-muted rounded-md p-4 text-center">
            <p>
              This is a custom blog post template. The actual content should be
              defined in the individual page component at{" "}
              <code>/app/blog/{slug}/page.tsx</code>.
            </p>
          </div>
        )}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              <a href={`/blog?tag=${tag.slug}`} className="hover:underline">
                {tag.name}
              </a>
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
