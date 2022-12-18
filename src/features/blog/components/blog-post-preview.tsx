import { Entry } from "contentful";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "../types/contentful";

type BlogPostPreviewProps = { blogPost: Entry<BlogPost> };

export const BlogPostPreview = ({ blogPost }: BlogPostPreviewProps) => {
  return (
    <Link href={`/blog/${blogPost.sys.id}`}>
      <div className="card bg-base-100 shadow-xl glass h-full">
        <figure>
          <Image
            src={`https:${blogPost.fields.featuredImage?.fields?.file?.url}`}
            alt={blogPost.fields.featuredImage?.fields?.title}
            className="w-full cursor-pointer"
            height={
              blogPost.fields.featuredImage?.fields?.file.details.image
                .height ?? 100
            }
            width={
              blogPost.fields.featuredImage?.fields?.file.details.image.width ??
              100
            }
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{blogPost.fields.title}</h2>
          <p>{blogPost.fields.description}</p>
        </div>
      </div>
    </Link>
  );
};
