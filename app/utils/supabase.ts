import { createClient } from '@supabase/supabase-js'

import type { Database } from '../models/db_types'

// Create a single supabase client for interacting with your database
export default createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
)