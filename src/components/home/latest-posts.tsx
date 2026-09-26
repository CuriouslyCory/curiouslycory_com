import Image from "next/image";
import Link from "next/link";
import { unstable_rethrow } from "next/navigation";

import { SectionHeading } from "~/components/home/section-heading";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import { formatDay } from "~/lib/date-utils";
import { readingTimeMinutes } from "~/lib/reading-time";
import { api } from "~/trpc/server";

/** One lead story plus a short list alongside it */
const POST_COUNT = 4;
const FALLBACK_COVER = "/images/blog/default.png";
const MAX_LEAD_TAGS = 4;

type PostSummary = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  content: string | null;
};

function PostMeta({ post }: { post: PostSummary }) {
  const date = post.publishedAt ?? post.createdAt;
  return (
    <p className="text-muted-foreground font-mono text-xs">
      <time dateTime={date.toISOString()}>{formatDay(date)}</time> ·{" "}
      {readingTimeMinutes(post.content)} min read
    </p>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface-sunken border-y">
      <section id="blog" className="mx-auto max-w-6xl px-8 py-24">
        <SectionHeading
          title="Latest Transmissions"
          subtitle="Build logs, lessons learned, and the occasional rabbit hole."
          action={{ label: "Read all posts", href: "/blog" }}
          className="mb-10"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-10">
          {children}
        </div>
      </section>
    </div>
  );
}

export async function LatestPosts() {
  let posts;
  try {
    ({ posts } = await api.blog.getAll({ page: 1, perPage: POST_COUNT }));
  } catch (error) {
    // Let Next's own control-flow errors (dynamic bailout, redirects) through
    unstable_rethrow(error);
    // Degrade to hiding the section rather than taking down the homepage.
    console.error("Failed to load latest posts", error);
    return null;
  }
  const [lead, ...rest] = posts;
  if (!lead) return null;

  return (
    <Section>
      <Link
        href={`/blog/${lead.slug}`}
        className="group flex flex-col gap-5 hover:text-inherit"
      >
        <div className="bg-muted relative aspect-video overflow-hidden rounded-xl border">
          <Image
            src={lead.coverImage ?? FALLBACK_COVER}
            alt=""
            fill
            sizes="(min-width: 1152px) 524px, (min-width: 760px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div>
          <PostMeta post={lead} />
          <h3 className="font-oswald group-hover:text-primary mt-2.5 text-[28px] leading-[1.15] font-semibold tracking-tight text-balance transition-colors">
            {lead.title}
          </h3>
          {lead.excerpt && (
            <p className="text-muted-foreground mt-3 leading-relaxed text-pretty">
              {lead.excerpt}
            </p>
          )}
          {lead.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
              {lead.tags.slice(0, MAX_LEAD_TAGS).map((tag) => (
                <li key={tag.id}>
                  <Badge variant="outline">{tag.name}</Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Link>

      <ul className="flex flex-col">
        {rest.map((post) => (
          <li key={post.slug} className="border-b">
            <Link
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-[minmax(0,1fr)_140px] items-start gap-5 py-6 hover:text-inherit"
            >
              <div>
                <PostMeta post={post} />
                <h3 className="font-oswald group-hover:text-primary mt-2 text-xl leading-tight font-semibold tracking-tight text-pretty transition-colors">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-[1.55]">
                    {post.excerpt}
                  </p>
                )}
              </div>
              <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-lg border">
                <Image
                  src={post.coverImage ?? FALLBACK_COVER}
                  alt=""
                  fill
                  sizes="140px"
                  className="object-cover"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function LatestPostsSkeleton() {
  return (
    <Section>
      <div className="flex flex-col gap-5">
        <Skeleton className="aspect-video rounded-xl" />
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-16 w-full" />
      </div>
      <div className="flex flex-col">
        {Array.from({ length: POST_COUNT - 1 }, (_, i) => (
          <div
            key={i}
            className="grid grid-cols-[minmax(0,1fr)_140px] gap-5 border-b py-6"
          >
            <div className="space-y-3">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="aspect-[4/3] rounded-lg" />
          </div>
        ))}
      </div>
    </Section>
  );
}
