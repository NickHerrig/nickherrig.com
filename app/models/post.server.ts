import supabase from "~/utils/supabase.server"

export async function getPosts() {
    
    const { data: posts, error} = await supabase
        .from('posts')
        .select('title,slug')

    return posts
}

export async function getPost(slug: string) {
    
    const {data: post, error } = await supabase
        .from('posts')
        .select("*")
        .eq('slug', slug)

    return post
}

export async function createPost(slug: string, title: string, markdown: string) {

    const { data, error } = await supabase
        .from('posts')
        .insert([
            {   slug: slug, 
                title: title,
                markdown:markdown, 
            },
        ])
    
    return data
}