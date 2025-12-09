import { createClient } from "@supabase/supabase-js";


const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqbGxldHdpb2hhbWt1cHl0anJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MDM5MjYsImV4cCI6MjA3OTM3OTkyNn0.bcf8fr-H1pF8gM_lft7kWLnA4h3CmSS9EgVN8-LJyEQ'
const supabaseURL = 'https://ljlletwiohamkupytjrj.supabase.co'

export const supabase = createClient(supabaseURL, anonKey)
