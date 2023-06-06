import supabase from "~/utils/supabase"


export async function getPosts() {
    
    const { data } = await supabase
        .from('posts')
        .select('*')

    return data
}