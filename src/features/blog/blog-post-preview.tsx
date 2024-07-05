import { Entry } from "contentful";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { WindowBox } from "../../components/window-box";
import { BlogPost } from "./types";

type BlogPostPreviewProps = { blogPost: Entry<BlogPost> };

export const BlogPostPreview = ({ blogPost }: BlogPostPreviewProps) => {
  useEffect(() => {
    console.log(blogPost);
  }, [blogPost]);

  return (
    <WindowBox>
      <Link href={`/blog/${blogPost.fields?.slug}`}>
        <h1 className="text-4xl mb-2 ">{blogPost.fields.title}</h1>
      </Link>
      <div>
        {blogPost.fields.featuredImage &&
          blogPost.fields.featuredImage?.fields?.file?.url && (
            <Image
              src={`https:${blogPost.fields.featuredImage?.fields?.file?.url}`}
              alt={blogPost.fields.featuredImage?.fields?.title}
              style={{ maxWidth: "90%" }}
              height={
                blogPost.fields.featuredImage?.fields?.file.details.image
                  .height ?? 100
              }
              width={
                blogPost.fields.featuredImage?.fields?.file.details.image
                  .width ?? 100
              }
            />
          )}
      </div>
      <p>{blogPost.fields.description}</p>
    </WindowBox>
  );
};
