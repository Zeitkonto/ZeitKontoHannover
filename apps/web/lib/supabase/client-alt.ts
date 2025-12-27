import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase: Variables de entorno no configuradas')
    console.warn('   Usando cliente mock para desarrollo')
    
    return {
      auth: {
        signInWithPassword: () => Promise.resolve({ data: { user: null }, error: new Error('Configura .env.local') }),
        signUp: () => Promise.resolve({ data: { user: null }, error: new Error('Configura .env.local') }),
        signOut: () => Promise.resolve({ error: null }),
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => Promise.resolve({ data: [], error: new Error('Configura .env.local') }),
        insert: () => Promise.resolve({ data: [], error: new Error('Configura .env.local') }),
        update: () => Promise.resolve({ data: [], error: new Error('Configura .env.local') }),
        delete: () => Promise.resolve({ data: [], error: new Error('Configura .env.local') }),
      }),
    } as any
  }
  
  // Usar createClient de @supabase/supabase-js (más compatible)
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
