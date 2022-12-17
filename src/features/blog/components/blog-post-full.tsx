import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Block, BLOCKS, Inline } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import Image from "next/image";
import { ReactNode } from "react";
import { BlogPost } from "../types/contentful";

const documentOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
      <Image
        src={`https:${node.data?.target?.fields?.file?.url}`}
        alt={node.data?.target?.fields?.title}
        style={{ maxWidth: "90%" }}
        height={node.data?.target?.fields?.file.details.image.height ?? 100}
        width={node.data?.target?.fields?.file.details.image.width ?? 100}
      />
    ),
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => (
      <h2 className="text-4xl pb-4">{children}</h2>
    ),
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: ReactNode) => (
      <p className="pb-4">{children}</p>
    ),
  },
};

type BlogPostProps = { blogPost: Entry<BlogPost> };

export const BlogPostFull = ({ blogPost }: BlogPostProps) => {
  return (
    <div className="block w-full">
      {documentToReactComponents(blogPost.fields.body, documentOptions)}
    </div>
  );
};
