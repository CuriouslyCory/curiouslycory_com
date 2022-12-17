import { useRouter } from "next/router";
import { SectionTitle } from "../../components/section-title";
import { BlogPostFull } from "../../features/blog/components/blog-post-full";
import { trpc } from "../../utils/trpc";

export const BlogPostPage = (): JSX.Element => {
  const router = useRouter();
  const { postId } = router.query;
  if (typeof postId !== "string") return <div>Loading...</div>;
  const { data: post } = trpc.contentful.getBlogPost.useQuery({ postId });

  if (!post) return <div>Loading...</div>;

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="hidden md:block fixed inset-x-0 top-0 -z-10">
        <h1 className="text-[400px] text-gray-50">Blog</h1>
      </div>
      <section className="md:flex-row justify-between items-center mt-10 md:mt-20">
        <BlogPostFull key={`post-${post.fields.title}`} blogPost={post} />
      </section>
    </main>
  );
};

export default BlogPostPage;
