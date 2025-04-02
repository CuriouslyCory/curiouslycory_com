import { api } from "~/trpc/server";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

{
  /* 
---
title: Hello World - My First Custom Blog Post
excerpt: An example of how to create custom blog posts with rich features while still having them indexed.
coverImage: /images/blog/hello-world.jpg
publishedAt: 2025-04-02
featured: true
tags: nextjs,typescript,tutorial
--- 
*/
}

export default async function HelloWorldPost() {
  // Get the post metadata from the database (indexed at build time)
  const post = await api.blog.getBySlug({ slug: "hello-world" });

  return (
    <div className="mx-auto max-w-3xl">
      {/* Custom title section with animation */}
      <div className="mb-12 text-center">
        <h1 className="animate-fade-in from-primary to-secondary bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent">
          Hello World!
        </h1>
        <p className="text-muted-foreground mt-4 text-xl">
          This is a custom blog post with its own unique features
        </p>
      </div>

      {/* Custom content section */}
      <div className="prose prose-lg dark:prose-invert mb-8 max-w-none">
        <p>
          This is a fully custom blog post component. You can add any React
          components, interactive features, or custom styling you want here!
        </p>

        <p>
          The metadata for this post is defined in a special comment at the top
          of the file, which gets extracted and indexed in the database at build
          time.
        </p>

        <h2>Benefits of this approach</h2>

        <ul>
          <li>
            Full freedom to customize each post with its own unique layout and
            features
          </li>
          <li>
            Posts are still indexed and searchable through the main blog
            interface
          </li>
          <li>
            SEO metadata is automatically generated from the post&apos;s
            frontmatter
          </li>
          <li>
            You can include interactive components, custom visualizations, etc.
          </li>
          <li>
            Each post is a proper Next.js page component with full access to
            React features
          </li>
        </ul>

        <h2>How it works</h2>

        <p>
          At build time, a script scans all directories under{" "}
          <code>/app/blog/</code> (except the <code>[slug]</code> directory),
          extracts the metadata from the special comment block, and upserts this
          data to the database.
        </p>

        <p>
          The metadata is then available through the tRPC API, which is used by
          the blog index page to list and filter posts, and by each post to
          display its metadata.
        </p>

        <div className="not-prose my-8 flex justify-center">
          <Button className="animate-pulse">
            This is an interactive component!
          </Button>
        </div>
      </div>

      {/* Display tags from the indexed metadata */}
      {post?.tags && post.tags.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-medium">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
