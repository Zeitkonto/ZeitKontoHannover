// Cliente Supabase COMPLETO para desarrollo
// Incluye todos los métodos que usa AuthProvider

export const createClient = () => {
  console.log('🔧 Usando cliente Supabase MOCK (desarrollo)')
  
  // Datos de usuario mock para desarrollo
  const mockUser = {
    id: 'mock-user-id-' + Date.now(),
    email: 'demo@zeitkonto.de',
    user_metadata: {
      name: 'Usuario Demo'
    }
  }
  
  const mockSession = {
    user: mockUser,
    access_token: 'mock-token-' + Date.now(),
    refresh_token: 'mock-refresh-token'
  }
  
  // Retornar cliente con TODOS los métodos que necesita AuthProvider
  return {
    auth: {
      // Método que estaba FALTANDO
      getUser: async () => {
        console.log('📝 Mock: getUser() llamado')
        return {
          data: { user: mockUser },
          error: null
        }
      },
      
      // Método que ya existía
      getSession: async () => {
        console.log('📝 Mock: getSession() llamado')
        return {
          data: { session: mockSession },
          error: null
        }
      },
      
      // Métodos de autenticación
      signInWithPassword: async ({ email, password }: any) => {
        console.log('🔐 Mock: signInWithPassword(', email, ')')
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500))
        
        return {
          data: {
            user: { 
              ...mockUser, 
              email: email || mockUser.email 
            },
            session: mockSession
          },
          error: null
        }
      },
      
      signUp: async ({ email, password, options }: any) => {
        console.log('🔐 Mock: signUp(', email, ')')
        
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const newUser = {
          id: 'new-user-' + Date.now(),
          email: email,
          user_metadata: options?.data || {}
        }
        
        return {
          data: {
            user: newUser,
            session: null
          },
          error: null
        }
      },
      
      signOut: async () => {
        console.log('🔐 Mock: signOut()')
        await new Promise(resolve => setTimeout(resolve, 300))
        return { error: null }
      },
      
      onAuthStateChange: (callback: any) => {
        console.log('📡 Mock: onAuthStateChange configurado')
        // Simular subscription
        const subscription = {
          unsubscribe: () => console.log('📡 Mock: unsubscribe')
        }
        return { data: { subscription } }
      }
    },
    
    // Métodos para base de datos (placeholder)
    from: (table: string) => ({
      select: (query?: string) => {
        console.log(`📊 Mock: select from ${table}`, query || '')
        return Promise.resolve({ 
          data: [], 
          error: null 
        })
      },
      insert: (data: any) => {
        console.log(`📊 Mock: insert into ${table}`, data)
        return Promise.resolve({ 
          data: [data], 
          error: null 
        })
      },
      update: (data: any) => {
        console.log(`📊 Mock: update ${table}`, data)
        return Promise.resolve({ 
          data: [data], 
          error: null 
        })
      },
      delete: () => {
        console.log(`📊 Mock: delete from ${table}`)
        return Promise.resolve({ 
          data: [], 
          error: null 
        })
      }
    })
  }
}
