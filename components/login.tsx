import { useOutletContext } from "@remix-run/react"
import type { SupabaseOutletContext } from "~/root"

export default function Login() {
    const { supabase } = useOutletContext<SupabaseOutletContext>()
    
    const handleLogin = async () => {

        let { data, error } = await supabase.auth.signInWithPassword({
            email: 'neherrig@gmail.com',
            password: 'testtest1234'
          })

        if (error) {
            console.log(error)
        }

    }

    const handleLogout = async () => {

        let { error } = await supabase.auth.signOut()
        if (error) {
            console.log(error)
        }

    }

    return (    
        <>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleLogin}>Login</button>
        </>
    )
}