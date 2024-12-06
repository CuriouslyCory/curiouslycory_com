import Link from "next/link";
import {
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  type AppBskyFeedDefs,
  AppBskyFeedPost,
  AppBskyRichtextFacet,
  RichText,
} from "@atproto/api";
import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

function BskyPost({ fvPost }: { fvPost: AppBskyFeedDefs.FeedViewPost }) {
  const { post } = fvPost;
  // extract the record from the post
  const record = useMemo(() => {
    if (
      AppBskyFeedPost.isRecord(post?.record) &&
      AppBskyFeedPost.validateRecord(post.record).success
    ) {
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
  if (!!facets) {
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

    // Embedded record (ideally a post)
    if (
      record &&
      AppBskyEmbedRecord.isMain(record.embed) &&
      AppBskyEmbedRecord.validateMain(record.embed).success
    ) {
      return <div className="grid grid-cols-2 gap-4">Embedded post</div>;
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
            <img src={image.thumb} alt={image.alt} key={image.thumb} />
          ))}
        </div>
      );
    }
    return null;
  }, [post, record]);

  return (
    <article>
      <Link href={uri} target="_blank">
        <Card>
          <CardHeader>
            <CardTitle>{post?.author.displayName}</CardTitle>
            <CardDescription>{post?.author.handle}</CardDescription>
          </CardHeader>
          <CardContent>
            {!facets && <p>{text}</p>}
            {!!facets && els}
            {embed}
          </CardContent>
        </Card>
      </Link>
      <pre>{JSON.stringify(fvPost, null, 2)}</pre>
    </article>
  );
}

export default BskyPost;
