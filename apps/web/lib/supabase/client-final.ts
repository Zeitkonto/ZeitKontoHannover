import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // Si las variables son placeholders o no existen
  if (!supabaseUrl || !supabaseAnonKey || 
      supabaseUrl.includes('[PROJECT-REF]') || 
      supabaseAnonKey.includes('example-token')) {
    
    console.log('🔧 Modo desarrollo: usando cliente mock de Supabase')
    
    // Cliente mock para desarrollo
    return {
      auth: {
        signInWithPassword: (credentials: any) => {
          console.log('🔐 Mock signInWithPassword:', credentials.email)
          return Promise.resolve({ 
            data: { 
              user: { 
                id: 'mock-user-id', 
                email: credentials.email,
                created_at: new Date().toISOString()
              }, 
              session: { 
                access_token: 'mock-token',
                refresh_token: 'mock-refresh-token'
              } 
            }, 
            error: null 
          })
        },
        signUp: (credentials: any) => {
          console.log('🔐 Mock signUp:', credentials.email)
          return Promise.resolve({ 
            data: { 
              user: { 
                id: 'mock-user-id', 
                email: credentials.email 
              }, 
              session: null 
            }, 
            error: null 
          })
        },
        signOut: () => {
          console.log('🔐 Mock signOut')
          return Promise.resolve({ error: null })
        },
        getSession: () => {
          return Promise.resolve({ 
            data: { session: null }, 
            error: null 
          })
        },
        onAuthStateChange: (callback: any) => {
          console.log('🔐 Mock onAuthStateChange')
          // Simular subscription
          const subscription = {
            unsubscribe: () => console.log('🔐 Mock unsubscribe')
          }
          return { data: { subscription } }
        },
      },
      from: (table: string) => ({
        select: (query?: string) => {
          console.log(`📊 Mock select from ${table}`, query || '')
          return Promise.resolve({ 
            data: [], 
            error: null 
          })
        },
        insert: (data: any) => {
          console.log(`📊 Mock insert into ${table}`, data)
          return Promise.resolve({ 
            data: [data], 
            error: null 
          })
        },
        update: (data: any) => {
          console.log(`📊 Mock update ${table}`, data)
          return Promise.resolve({ 
            data: [data], 
            error: null 
          })
        },
        delete: () => {
          console.log(`📊 Mock delete from ${table}`)
          return Promise.resolve({ 
            data: [], 
            error: null 
          })
        },
      }),
    } as any
  }
  
  // Si las variables son reales, crear cliente real
  console.log('⚡ Creando cliente Supabase REAL con URL:', supabaseUrl.substring(0, 30) + '...')
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
