import { json } from "@remix-run/node"
import { useLoaderData, Link } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";

import createServerSupabase from "~/utils/supabase.server"


export const loader = async ({request}: LoaderArgs) => {

  const response = new Response()
  const supabase = createServerSupabase({request, response})

  const { data: posts, error} = await supabase
      .from('posts')
      .select('title,slug')

  if (error) {
    console.log(error)
  }

  return json({ posts: posts ?? [] }, {headers: response.headers})
}


export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main className="text-center">
      <h1 className="text-xl mt-10">Posts</h1>

      <Link to="admin" className="text-red-700 underline">
        Admin
      </Link>

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