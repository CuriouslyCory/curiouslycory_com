import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "~/components/ui/code-block";
import { Button } from "~/components/ui/button";
import { BlogExampleCounter } from "~/components/blog-example";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

/* 
---bm
title: The Best of Both Worlds
excerpt: How to build a blog with fully custom pages while keeping database features
coverImage: /images/blog/the-best-of-both-worlds.png
publishedAt: 2025-04-02
featured: false
published: true
tags: nextjs,typescript,tutorial,react
--- 
*/

export const metadata = {
  title: "The Best of Both Worlds",
  description:
    "How to build a blog with fully custom pages while keeping database features",
  openGraph: {
    images: [
      {
        url: "/images/blog/the-best-of-both-worlds.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Best of Both Worlds",
    description:
      "How to build a blog with fully custom pages while keeping database features",
    images: ["/images/blog/the-best-of-both-worlds.png"],
  },
};

export default async function CustomDeveloperBlog() {
  return (
    <article className="mx-4 flex max-w-3xl flex-col gap-6 md:mx-auto">
      {/* Header */}
      <Image
        src="/images/blog/the-best-of-both-worlds.png"
        alt="Image of an astronaut space suit holding a string attached to the helmet that is floating like a helium balloon. The space suit is empty, floating in space, overlooking the earth below."
        width={1000}
        height={1000}
        className="mb-2 rounded-lg shadow-md"
      />
      <div className="mb-6 text-center">
        <h1 className="animate-fade-in from-primary to-secondary bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent">
          The Best of Both Worlds
        </h1>
        <p className="text-muted-foreground mt-4 text-xl">
          How to build a blog with fully custom pages while keeping database
          features
        </p>
      </div>

      {/* Article Body */}
      <div className="prose prose-lg dark:prose-invert flex max-w-none flex-col gap-12">
        {/* Introduction */}
        <section className="flex flex-col gap-4">
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
            The Challenge
          </h2>

          <p>When building a developer blog, we often face a dilemma:</p>

          <div className="flex flex-col gap-4 md:flex-row">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Traditional CMS Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Content stored in database</li>
                  <li>Easy to search and filter</li>
                  <li>Limited interactive components</li>
                  <li>Difficult to add custom code demos</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Custom Page Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Full React component freedom</li>
                  <li>Can include interactive elements</li>
                  <li>Hard to maintain a central index</li>
                  <li>Difficult to implement search/filtering</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="">
            But what if we could have the best of both worlds? This blog
            implements exactly that:{" "}
            <strong>
              fully custom React components with database indexing
            </strong>
            .
          </p>
        </section>

        {/* How It Works */}
        <section className="flex flex-col gap-2">
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
            How It Works
          </h2>

          <h3 className="mt-4 text-xl">1. The Post Architecture</h3>

          <p>
            Each blog post is a standard Next.js page component in the App
            Router. For example, this post lives at:
          </p>

          <pre className="bg-secondary/10 overflow-auto rounded-md p-4 text-sm">
            src/app/blog/custom-developer-blog/page.tsx
          </pre>

          <p>
            The magic happens with a special frontmatter-style comment at the
            top of each page:
          </p>

          <CodeBlock language="tsx">
            {`/* 
---bm title: Custom Developer 
Blog excerpt: How to create custom blog posts with rich features... 
coverImage: /images/blog/default.png
publishedAt: 2025-04-02 
featured: true 
published: true 
tags:
nextjs,typescript,tutorial 
--- 
*/`}
          </CodeBlock>

          <h3 className="mt-6 text-xl">2. Build-Time Indexing</h3>

          <p>
            At build time, a custom script scans through all directories in the{" "}
            <code>src/app/blog/</code>
            folder, reads this metadata, and upserts it to the database:
          </p>

          <CodeBlock language="typescript">
            {`// From src/scripts/blog-indexer.js

export async function indexBlogPosts() {
  // ... setup code ...
  
  for (const slug of slugDirs) {
    const postDir = path.join(postsDirectory, slug);
    const pageFile = path.join(postDir, "page.tsx");
    
    // Read the page file
    const fileContent = fs.readFileSync(pageFile, "utf8");
    
    // Extract metadata from frontmatter-style comments
    const metadataRegex = /---bm\\s*([\\s\\S]*?)\\s*---/;
    const match = metadataRegex.exec(fileContent);
    
    if (!match?.[1]) continue;
    
    // Extract the YAML content and validate with Zod
    const { data: rawMetadata } = matter(\`---\\n\${match[1]}\\n---\`);
    const result = PostMetadataSchema.safeParse(rawMetadata);
    
    // Upsert post metadata to the database
    await prisma.post.upsert({
      where: { slug },
      update: postData,
      create: postData,
    });
    
    // Also index tags for filtering
    // ...
  }
}
        `}
          </CodeBlock>

          <p className="mt-4">
            This script runs automatically during the prebuild process via this
            NPM script:
          </p>

          <CodeBlock language="json">
            {`// package.json
{
  ...more...
  "scripts": {
    "blog:index": "node src/scripts/index-blog.js",
    "prebuild": "npm run blog:index"
  }
  ...rest...
}`}
          </CodeBlock>

          <h3 className="mt-6 text-xl">3. tRPC API for Data Access</h3>

          <p>
            The data is exposed through tRPC endpoints that allow for filtering,
            pagination, and search features:
          </p>

          <CodeBlock language="typescript">
            {`// From src/server/api/routers/blog.ts
export const blogRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(postSearchParamsSchema)
    .query(async ({ ctx, input }) => {
      const { q, tag, featured, year, month, page, perPage } = input;
      
      // Build complex database query with all filters
      const query: Prisma.PostFindManyArgs = {
        where: {
          published: true,
          ...(featured ? { featured: true } : {}),
          ...(tag ? { tags: { some: { slug: tag } } } : {}),
          ...(q ? {
            OR: [
              { title: { contains: q, mode: "insensitive" }},
              { content: { contains: q, mode: "insensitive" }},
            ],
          } : {}),
          ...(year ? {
            publishedAt: {
              gte: new Date(year, month ?? 0, 1),
              lt: new Date(year, month ?? 12, month ? 32 : 1),
            },
          } : {}),
        },
        // ... other query options
      };
      
      // Return posts with pagination info
      // ...
    }),
  // Other endpoints for tags, dates, etc.
}`}
          </CodeBlock>

          <h3 className="mt-6 text-xl">
            4. Client-Side Components for Filtering
          </h3>

          <p>
            In the blog index page, we use React client components for search,
            filtering, and pagination:
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Badge>Blog Search</Badge>
              <CodeBlock language="tsx">
                {`export function BlogSearch() {
              // Search form with React Hook Form
              function onSubmit(values: FormValues) {
                const params = new URLSearchParams(
                  searchParams.toString()
                );
                params.set("q", values.query);
                router.push(\`/blog?\${params}\`);
              }
              // ...
            }`}
              </CodeBlock>
            </div>
            <div>
              <Badge>Date Filter</Badge>
              <CodeBlock language="tsx">{`export function DateFilter() {
                // Fetch aggregated date data
                const { data: dateAggregations } =
                  api.blog.getDateAggregations.useQuery();
                  
                // Create an accordion UI for year/month
                // ...
              }`}</CodeBlock>
            </div>
          </div>
        </section>

        <section>
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
            Interactive Components
          </h2>

          <p>
            Because each post is a full Next.js page, we can include any React
            component we want — including interactive client components like
            this counter:
          </p>

          {/* Interactive counter example */}
          <div className="my-8">
            <BlogExampleCounter />
          </div>

          <p>
            This component is a standard React client component, with its own
            state:
          </p>

          <CodeBlock language="tsx">{`"use client";

          import { useState } from "react";
          import { Button } from "~/components/ui/button";
          import { PlusIcon, MinusIcon } from "lucide-react";
          
          export function BlogExampleCounter() {
            const [count, setCount] = useState(0);
          
            return (
              <div className="flex flex-col items-center gap-4 rounded-xl 
                            border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">Interactive Counter</h3>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCount((prev) => prev - 1)}
                    aria-label="Decrement counter"
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  
                  <span className="flex h-16 w-16 items-center justify-center 
                                 rounded-full bg-primary/10 text-2xl font-bold">
                    {count}
                  </span>
                  
                  <Button
                    variant="outline" 
                    size="icon"
                    onClick={() => setCount((prev) => prev + 1)}
                    aria-label="Increment counter"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          }`}</CodeBlock>
        </section>

        <section>
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
            Benefits of This Approach
          </h2>

          <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-card flex flex-col gap-2 rounded-xl border p-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/80 flex h-10 w-10 items-center justify-center rounded-full p-3">
                  1
                </div>
                <h3 className="text-xl font-semibold">
                  Full React Component Freedom
                </h3>
              </div>
              <p className="text-muted-foreground">
                Each post is a full React component with complete control over
                its presentation and functionality.
              </p>
            </div>

            <div className="bg-card flex flex-col gap-2 rounded-xl border p-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/80 flex h-10 w-10 items-center justify-center rounded-full p-3">
                  2
                </div>
                <h3 className="text-xl font-semibold">Database Indexing</h3>
              </div>
              <p className="text-muted-foreground">
                Posts are indexed in the database, enabling search, filtering,
                categorization, and pagination.
              </p>
            </div>

            <div className="bg-card flex flex-col gap-2 rounded-xl border p-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/80 flex h-10 w-10 items-center justify-center rounded-full p-3">
                  3
                </div>
                <h3 className="text-xl font-semibold">Automatic Indexing</h3>
              </div>
              <p className="text-muted-foreground">
                The build process automatically extracts metadata and keeps the
                database in sync, no manual curation needed.
              </p>
            </div>

            <div className="bg-card flex flex-col gap-2 rounded-xl border p-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/80 flex h-10 w-10 items-center justify-center rounded-full p-3">
                  4
                </div>
                <h3 className="text-xl font-semibold">Best Dev Experience</h3>
              </div>
              <p className="text-muted-foreground">
                Write code in your IDE with full TypeScript support, no context
                switching to a CMS or markdown files.
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl text-transparent">
            Try It Yourself
          </h2>

          <p>
            This approach offers an excellent solution for developer blogs where
            you want the freedom to create rich, interactive content while
            maintaining standard blog features like search and filtering.
          </p>

          <p>
            Check out the source code on GitHub to see how it&apos;s
            implemented:
          </p>

          <div className="my-8 flex justify-center">
            <Button asChild>
              <Link
                href="https://github.com/CuriouslyCory/curiouslycory_com"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the Source Code
              </Link>
            </Button>
          </div>

          <p>Key files to look at:</p>

          <ul>
            <li>
              <a
                href="https://github.com/CuriouslyCory/curiouslycory_com/blob/master/src/scripts/blog-indexer.js"
                target="_blank"
                rel="noopener noreferrer"
              >
                src/scripts/blog-indexer.js
              </a>{" "}
              - Handles the extraction of metadata from page components
            </li>
            <li>
              <a
                href="https://github.com/CuriouslyCory/curiouslycory_com/blob/master/src/server/api/routers/blog.ts"
                target="_blank"
                rel="noopener noreferrer"
              >
                src/server/api/routers/blog.ts
              </a>{" "}
              - tRPC endpoints for querying blog data
            </li>
            <li>
              <a
                href="https://github.com/CuriouslyCory/curiouslycory_com/blob/master/src/app/blog/page.tsx"
                target="_blank"
                rel="noopener noreferrer"
              >
                src/app/blog/page.tsx
              </a>{" "}
              - The main blog listing page with filters
            </li>
            <li>
              <a
                href="https://github.com/CuriouslyCory/curiouslycory_com/blob/master/src/components/blog/blog-search.tsx"
                target="_blank"
                rel="noopener noreferrer"
              >
                src/components/blog/blog-search.tsx
              </a>{" "}
              - Search component for filtering posts
            </li>
          </ul>
        </section>
      </div>
    </article>
  );
}
