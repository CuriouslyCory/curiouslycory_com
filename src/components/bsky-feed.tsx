"use client";

import { api } from "~/trpc/react";
import BskyPost from "./bsky-post";

function BskyFeed() {
  const { data } = api.bsky.getFeed.useQuery();

  return (
    <div>
      {data?.map((fvPost) => (
        <BskyPost key={fvPost.post.uri} fvPost={fvPost} />
      ))}
      {/* <pre>{JSON.stringify(data)}</pre> */}
    </div>
  );
}

export default BskyFeed;
