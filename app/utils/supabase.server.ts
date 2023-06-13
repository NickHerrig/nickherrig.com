import { createServerClient } from '@supabase/auth-helpers-remix'

import type { Database } from '~/db_types'

// Create a single supabase client for interacting with your database
export default ({ 
    request, 
    response 
}: { 
    request: Request, 
    response: Response
}) => 
{
    return createServerClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        {request, response}
    )
}