import { useQuery } from "@tanstack/react-query";
import { createClient, EntryCollection } from "contentful";
import { useEffect } from "react";
import { BlogPost } from "./types";

export const useBlogPosts = () => {
  const client = createClient({
    space: "r5b2emceg285",
    accessToken: "nEz8-OHLXlkIXIQmTfRCogcnAuNdhRKkLNUjUx2uqQQ",
  });

  const getBlogPosts = () =>
    client
      .getEntries<BlogPost>({
        order: "-sys.createdAt",
        content_type: "blogPost",
      })
      .then((response) => response.items);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["blogPosts"],
    queryFn: getBlogPosts,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  return { posts: data, isLoading, isError, isSuccess };
};
