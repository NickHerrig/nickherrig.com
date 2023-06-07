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

      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={post.slug}
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
  }