import type { LoaderArgs } from "@remix-run/node" 
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { marked } from "marked"

import createServerSupabase from "~/utils/supabase.server"


export const loader = async ({ params, request }: LoaderArgs) => {
    if (!params.slug) {
        return `params.slug is required`
    }

    const response = new Response()
    const supabase = createServerSupabase({request, response})
    const {data: posts, error } = await supabase
        .from('posts')
        .select("*")
        .eq('slug', params.slug)

    if (!posts) {
        return `Posts not found: ${params.slug}`
    }
    const html = marked(posts[0].markdown)
    const post = posts[0]
    return json({ html, post })
}


export default function PostSlug() {
    const { html, post } = useLoaderData<typeof loader>()
    return (
        <main className="mt-8 mx-auto max-w-4xl">
            <h1 className="my-6 border-b-2 text-center text-3xl">
                {post.title}
            </h1>
            <div className="prose" dangerouslySetInnerHTML={{ __html: html }}/>
        </main>
    )
}