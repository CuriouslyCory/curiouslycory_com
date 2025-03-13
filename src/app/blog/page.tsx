import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const blogPosts = [
  {
    title: "My First Blog Post",
    excerpt: "This is a short excerpt from my first blog post.",
    date: "2023-05-01",
    slug: "my-first-blog-post",
  },
  {
    title: "Learning Next.js",
    excerpt: "My journey learning Next.js and building this website.",
    date: "2023-05-15",
    slug: "learning-nextjs",
  },
  // Add more blog posts as needed
];

export default function Blog() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Blog</h1>
      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{post.date}</span>
              <Link
                href={`/blog/${post.slug}`}
                className="text-primary hover:underline"
              >
                Read more
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
