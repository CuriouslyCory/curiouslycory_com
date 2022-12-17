import { SectionTitle } from "../../components/section-title";
import { BlogPostPreview } from "../../features/blog/components/blog-post-preview";
import { trpc } from "../../utils/trpc";

export const BlogPage = (): JSX.Element => {
  const { data: posts } = trpc.contentful.getBlogPosts.useQuery();

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="hidden md:block fixed inset-x-0 top-0 -z-10">
        <h1 className="text-[400px] text-gray-50">Blog</h1>
      </div>
      <section className="mx-2 md:mx-20 md:flex-row justify-between items-center mt-10 md:mt-20">
        <SectionTitle size="4xl">Featured Posts</SectionTitle>
        <div className="grid grid-rows-3 md:grid-rows-none grid-cols-none md:grid-cols-3 justify-between items-center gap-5">
          {posts?.map((post) => (
            <BlogPostPreview
              key={`post-${post.fields.title}`}
              blogPost={post}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
