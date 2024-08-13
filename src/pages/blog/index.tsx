import { SectionTitle } from "../../components/section-title";

export const BlogPage = (): JSX.Element => {
  return (
    <main className="flex flex-col justify-center items-center">
      <div className="hidden md:block fixed inset-x-0 top-0 -z-10">
        <h1 className="text-[400px] text-gray-50">Blog</h1>
      </div>
      <section className="mx-2 md:mx-20 md:flex-row justify-between items-center mt-10 md:mt-20">
        <SectionTitle size="5xl">Featured Posts</SectionTitle>
      </section>
    </main>
  );
};

export default BlogPage;
