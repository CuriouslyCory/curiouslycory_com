import { type FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RichText } from "@atproto/api";
import { useMemo } from "react";

function BskyPost({ fvPost }: { fvPost: FeedViewPost }) {
  const richText = useMemo(
    () =>
      new RichText({
        text: fvPost.post.record?.text,
        facets: fvPost.post.record?.facets,
      }),
    [fvPost.post.record],
  );
  return (
    <div>
      <Link
        href={`https://bsky.social/profile/${fvPost.post.author.handle}/post/${fvPost.post.uri}`}
      >
        <Card>
          <CardHeader>
            <CardTitle>{fvPost.post.author.displayName}</CardTitle>
            <CardDescription>{fvPost.post.author.handle}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{richText.text}</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export default BskyPost;
