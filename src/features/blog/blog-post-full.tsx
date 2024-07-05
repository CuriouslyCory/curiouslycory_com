import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Block, BLOCKS, Inline, INLINES } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import Image from "next/image";
import { ReactChild, ReactFragment, ReactPortal } from "react";
import { BlogPost } from "./types";

const options = {
  renderText: (text: string) => {
    return text
      .split("\n")
      .reduce((children: any, textSegment: any, index: number) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
  },
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: (
      node: Block | Inline,
      children:
        | boolean
        | ReactChild
        | ReactFragment
        | ReactPortal
        | null
        | undefined
    ) => (
      <a href={`/blog/${node.data["target"].fields.slug}`}>
        {`${(node.content[0] as any)["value"].toString()}`}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
      <Image
        src={`https:${node.data?.target?.fields?.file?.url}`}
        alt={node.data?.target?.fields?.title}
        style={{ maxWidth: "90%" }}
        height={node.data?.target?.fields?.file.details.image.height ?? 100}
        width={node.data?.target?.fields?.file.details.image.width ?? 100}
      />
    ),
  },
};

type BlogPostProps = { blogPost: Entry<BlogPost> };

export const BlogPostFull = ({ blogPost }: BlogPostProps) => {
  return (
    <div className="block">
      <div>{documentToReactComponents(blogPost.fields.body, options)}</div>
    </div>
  );
};
