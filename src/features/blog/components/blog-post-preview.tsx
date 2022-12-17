import { Entry } from "contentful";
import Image from "next/image";
import Link from "next/link";
import { WindowBox } from "../../../components/window-box";
import { BlogPost } from "../types/contentful";

type BlogPostPreviewProps = { blogPost: Entry<BlogPost> };

export const BlogPostPreview = ({ blogPost }: BlogPostPreviewProps) => {
  return (
    <WindowBox>
      <Link href={`/blog/${blogPost.sys.id}`}>
        <h1 className="text-4xl mb-4 cursor-pointer">
          {blogPost.fields.title}
        </h1>
      </Link>
      <div className="w-full h-64">
        {blogPost.fields.featuredImage &&
          blogPost.fields.featuredImage?.fields?.file?.url && (
            <Link href={`/blog/${blogPost.sys.id}`}>
              <Image
                src={`https:${blogPost.fields.featuredImage?.fields?.file?.url}`}
                alt={blogPost.fields.featuredImage?.fields?.title}
                className="w-full cursor-pointer"
                height={
                  blogPost.fields.featuredImage?.fields?.file.details.image
                    .height ?? 100
                }
                width={
                  blogPost.fields.featuredImage?.fields?.file.details.image
                    .width ?? 100
                }
              />
            </Link>
          )}
      </div>
      <p className="mt-4">{blogPost.fields.description}</p>
    </WindowBox>
  );
};
