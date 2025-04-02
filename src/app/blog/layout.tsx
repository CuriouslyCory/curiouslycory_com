import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | CuriouslyCory",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-6">{children}</div>;
}
