import Image from "next/image";
import { Badge } from "../ui/badge";

export default function BlogHero({
  title,
  subtitle,
  image,
  tags,
}: {
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
}) {
  return (
    <div className="relative">
      <Image
        src={image}
        alt={`${title} ${subtitle}`}
        width={1000}
        height={500}
        className="rounded-xl object-cover shadow-lg"
      />
      <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        {tags.map((tag) => (
          <Badge key={tag} className="mr-1 mb-2" variant="outline">
            {tag}
          </Badge>
        ))}
        <h1 className="text-4xl font-bold text-white md:text-5xl">
          {title}
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            {subtitle}
          </span>
        </h1>
      </div>
    </div>
  );
}
