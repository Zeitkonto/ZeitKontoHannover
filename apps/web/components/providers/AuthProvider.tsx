'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'

type User = {
  id: string
  email: string
  name?: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ error: string | null }>
  register: (email: string, password: string, name: string) => Promise<{ error: string | null }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ error: 'No configurado' }),
  register: async () => ({ error: 'No configurado' }),
  logout: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Verificar sesión al cargar
  useEffect(() => {
    checkSession()
  }, [])

  // Redirigir si no está autenticado y necesita estarlo
  useEffect(() => {
    const publicPaths = ['/', '/login', '/register', '/test-pwa', '/pwa-install']
    const isPublicPath = publicPaths.includes(pathname)
    
    if (!isLoading && !user && !isPublicPath && pathname !== '/dashboard') {
      router.push('/login')
    }
  }, [user, isLoading, pathname, router])

  const checkSession = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      console.log('🔍 Verificando sesión...')
      
      // Primero intentar con getSession (más común)
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.warn('Error en getSession:', sessionError)
        // Si falla getSession, intentar con getUser
        const { data: userData, error: userError } = await supabase.auth.getUser()
        
        if (userError) {
          console.warn('Error en getUser:', userError)
          setUser(null)
        } else if (userData.user) {
          setUser({
            id: userData.user.id,
            email: userData.user.email!,
            name: userData.user.user_metadata?.name || 'Usuario',
          })
        }
      } else if (sessionData.session?.user) {
        setUser({
          id: sessionData.session.user.id,
          email: sessionData.session.user.email!,
          name: sessionData.session.user.user_metadata?.name || 'Usuario',
        })
      }
    } catch (error) {
      console.error('Error checking session:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      console.log('🔐 Intentando login:', email)
      const supabase = createClient()
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Error en login:', error)
        throw error
      }

      // Actualizar usuario con los datos retornados
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.name || email.split('@')[0] || 'Usuario',
        })
      } else {
        // Fallback: obtener usuario por separado
        const { data: userData } = await supabase.auth.getUser()
        if (userData.user) {
          setUser({
            id: userData.user.id,
            email: userData.user.email!,
            name: userData.user.user_metadata?.name || 'Usuario',
          })
        }
      }

      router.push('/dashboard')
      router.refresh()
      
      return { error: null }
    } catch (error: any) {
      console.error('Login error:', error)
      return { 
        error: error.message || 'Error al iniciar sesión. Usa: demo@zeitkonto.de / demo123' 
      }
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      console.log('📝 Intentando registro:', email)
      const supabase = createClient()
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      })

      if (error) {
        console.error('Error en registro:', error)
        throw error
      }

      // En desarrollo, simular éxito inmediato
      setUser({
        id: data.user?.id || 'temp-' + Date.now(),
        email,
        name,
      })

      router.push('/dashboard')
      router.refresh()
      
      return { error: null }
    } catch (error: any) {
      console.error('Register error:', error)
      return { 
        error: error.message || 'Error al registrarse. Intenta con otro email.' 
      }
    }
  }

  const logout = async () => {
    try {
      console.log('🚪 Cerrando sesión...')
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      // Aún así, limpiar estado local
      setUser(null)
      router.push('/')
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
