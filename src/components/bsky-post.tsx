import Link from "next/link";
import {
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  type AppBskyFeedDefs,
  AppBskyFeedPost,
  AppBskyRichtextFacet,
  RichText,
} from "@atproto/api";
import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "~/lib/utils";
import { Button } from "./ui/button";

function BskyPost({ fvPost }: { fvPost: AppBskyFeedDefs.FeedViewPost }) {
  const { post } = fvPost;
  // extract the record from the post
  const record = useMemo(() => {
    if (AppBskyFeedPost.isRecord(post?.record)) {
      return post.record;
    }
    return null;
  }, [post]);

  // extract the rich text from the record
  const richText = useMemo(() => {
    if (record) {
      return new RichText({
        text: record.text,
        facets: record.facets,
      });
    }
    return new RichText({
      text: "",
      facets: [],
    });
  }, [record]);

  const { text, facets } = richText;

  const uri = useMemo(() => {
    const postHash = post?.uri.split("/").pop();
    return `https://bsky.app/profile/${post?.author.handle}/post/${postHash}`;
  }, [post]);

  // render the rich text
  const els = [];
  if (facets && facets.length > 0) {
    let key = 0;
    for (const segment of richText.segments()) {
      const link = segment.link;
      const mention = segment.mention;
      const tag = segment.tag;

      if (mention && AppBskyRichtextFacet.validateMention(mention).success) {
        els.push(
          <Link href={mention.did} key={key} target="_blank">
            {mention.did}
          </Link>,
        );
      } else if (link && AppBskyRichtextFacet.validateLink(link).success) {
        els.push(
          <Link href={link.uri} key={key} target="_blank">
            {segment.text}
          </Link>,
        );
      } else if (tag && AppBskyRichtextFacet.validateTag(tag).success) {
        els.push(<span key={key}>{segment.text}</span>);
      } else {
        els.push(segment.text);
      }

      key++;
    }
  }

  const embed = useMemo(() => {
    // if this has embed, determine the type and render it
    // known types: record, recordWithMedia, image, video, defs, external,

    // Embedded record (probably a repost)
    if (record && AppBskyEmbedRecord.isMain(record.embed)) {
      return <div className="grid grid-cols-2 gap-4">Embedded post</div>;
    }

    if (record && AppBskyEmbedRecordWithMedia.isMain(record.embed)) {
      return (
        <div className="grid grid-cols-2 gap-4">Embedded post with media</div>
      );
    }

    // Embedded image

    if (
      AppBskyEmbedImages.isView(post?.embed) &&
      AppBskyEmbedImages.validateView(post?.embed).success
    ) {
      console.log("Validated image embed");
      const images = post.embed.images;
      return (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.thumb}
              alt={image.alt}
              key={image.thumb}
              className="max-h-32 max-w-32"
            />
          ))}
        </div>
      );
    }
    return null;
  }, [post, record]);

  const [showPre, setShowPre] = useState(false);

  return (
    <article>
      <Link href={uri} target="_blank">
        <Card>
          <CardHeader>
            <CardTitle>{post?.author.displayName}</CardTitle>
            <CardDescription>{post?.author.handle}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Render the text */}
            {els.length > 0 && els}
            {els.length < 1 && <p>{record?.text}</p>}
            {/* Render the embed */}
            {embed}
          </CardContent>
        </Card>
      </Link>
      <Button onClick={() => setShowPre(!showPre)}>(debug)</Button>
      <pre className={cn(showPre ? "block" : "hidden")}>
        {JSON.stringify(fvPost, null, 2)}
      </pre>
    </article>
  );
}

export default BskyPost;
