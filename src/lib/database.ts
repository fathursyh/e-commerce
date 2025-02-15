import { createClient } from '@supabase/supabase-js'
const options = {}
export const supabase = createClient(import.meta.env.DB_STRING, import.meta.env.DB_API, options);
