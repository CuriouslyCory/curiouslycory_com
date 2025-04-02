"use client";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";

import { type Post } from "~/data/blog-schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

type PostCardProps = {
  post: Post & {
    tags?: { id: string; name: string; slug: string }[];
    author?: { name: string | null; image: string | null };
  };
};

export function PostCard({ post }: PostCardProps) {
  const publishDate = post.publishedAt ?? post.createdAt;

  return (
    <Card className="hover:border-primary/50 flex h-full flex-col overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
        {post.coverImage && (
          <div className="relative mb-2 h-48 w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          {post.excerpt && (
            <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <Badge key={tag.id} variant="outline">
                {tag.name}
              </Badge>
            ))}
          </div>
          <div className="flex w-full items-center justify-between">
            {post.author?.name && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <div className="relative h-6 w-6 overflow-hidden rounded-full">
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="text-muted-foreground text-sm">
                  {post.author.name}
                </span>
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
        </CardFooter>
      </Link>
    </Card>
  );
}
