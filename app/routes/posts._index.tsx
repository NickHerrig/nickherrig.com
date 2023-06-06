import { json } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";

import {getPosts} from "~/models/post.server"


export const loader = async ({}: LoaderArgs) => {
  const posts = await getPosts()
  return json({ posts: posts ?? [] })
}


export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>Posts</h1>
      <h2>
        {JSON.stringify( posts, null, 2)}
      </h2>
    </main>
  );
  }