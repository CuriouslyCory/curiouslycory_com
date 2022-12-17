import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Block, BLOCKS, Inline } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import Image from "next/image";
import { ReactNode } from "react";
import { SectionTitle } from "../../../components/section-title";
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
    <>
      <Hero
        title={blogPost.fields.title}
        imageUrl={`https:${blogPost.fields.featuredImage?.fields.file.url}`}
      />
      <div className="block mx-2 md:mx-20 my-10">
        {documentToReactComponents(blogPost.fields.body, documentOptions)}
      </div>
    </>
  );
};

type HeroProps = {
  imageUrl?: string;
  title: string;
};

const Hero = ({ imageUrl, title }: HeroProps) => (
  <div className="w-full h-[400px] flex items-center overflow-hidden relative">
    <Image
      src={imageUrl ?? ""}
      alt="Hero image"
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      className="-z-10"
    />
    <div className="bg-[#f7f5f2]/80 p-5 shadow-lg mx-2 md:mx-20">
      <h1 className="text-5xl pb-5">
        {title.split(" ").slice(0, -1).join(" ")}{" "}
        <span className="hero-underline">{title.split(" ").pop()}</span>
      </h1>
    </div>
  </div>
);
