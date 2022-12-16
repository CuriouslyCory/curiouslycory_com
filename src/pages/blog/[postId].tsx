import { SectionTitle } from "../../components/section-title";
import { BlogPostFull } from "../../features/blog/blog-post-full";
import { useBlogPosts } from "../../features/blog/use-blog-posts";

export const BlogPostPage = (): JSX.Element => {
  const { posts } = useBlogPosts();

  if (!posts?.[0]) return <div>Loading...</div>;

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="hidden md:block fixed inset-x-0 top-0 -z-10">
        <h1 className="text-[400px] text-gray-50">Blog</h1>
      </div>
      <section className="md:flex-row justify-between items-center mt-10 md:mt-20 mx-2 md:mx-20">
        <SectionTitle size="4xl">{posts[0].fields.title}</SectionTitle>
        <div className="grid grid-rows-3 md:grid-rows-none grid-cols-none md:grid-cols-3 justify-between items-center gap-5">
          <BlogPostFull
            key={`post-${posts[0].fields.title}`}
            blogPost={posts[0]}
          />
        </div>
      </section>
    </main>
  );
};

export default BlogPostPage;
