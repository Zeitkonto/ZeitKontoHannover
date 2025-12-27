'use client'

import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'

export default function Home() {
  const { user, isLoading } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="text-center max-w-2xl w-full">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          {user ? `👋 Hola, ${user.name}` : '✅ ZeitKonto Hannover'}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          {user ? '¡Bienvenido de nuevo!' : 'Intercambio de tiempo comunitario sin dinero'}
        </p>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            {user ? 'Tu Estado' : 'Estado del sistema'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
                <h3 className="text-lg font-medium">
                  {user ? 'Sesión activa' : 'Next.js 14'}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {user ? `Conectado como ${user.email}` : 'Framework funcionando'}
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
                <h3 className="text-lg font-medium">
                  {user ? 'App instalada' : 'Tailwind CSS'}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {user ? 'PWA funcionando en iPhone' : 'v3.4.1 configurado'}
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-xl">📱</span>
                </div>
                <h3 className="text-lg font-medium">PWA Ready</h3>
              </div>
              <p className="text-gray-600 text-sm">
                {user ? 'Navegación móvil activa' : 'App instalada en iPhone ✅'}
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-yellow-600 text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-medium">
                  {user ? 'Próximo paso' : 'Autenticación'}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {user ? 'Conectar con Supabase real' : 'Login/Registro funcional ✅'}
              </p>
            </div>
          </div>
          
          {/* BOTONES DE NAVEGACIÓN */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            {user ? (
              <>
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shadow"
                >
                  🏠 Ir al Dashboard
                </Link>
                
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition shadow"
                >
                  👤 Mi Perfil
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/login"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition shadow"
                >
                  🔐 Iniciar Sesión
                </Link>
                
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition shadow"
                >
                  📝 Registrarse
                </Link>
              </>
            )}
            
            <Link
              href="/test-pwa"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition shadow"
            >
              🧪 Probar PWA
            </Link>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="font-medium mb-3">📱 Desde tu iPhone PWA:</h3>
            <div className="text-sm text-gray-600 space-y-2">
              {user ? (
                <>
                  <p>✅ <strong>Sesión activa como {user.name}</strong></p>
                  <p>Usa la barra inferior para navegar</p>
                  <p>Pulsa "Salir" para cerrar sesión</p>
                </>
              ) : (
                <>
                  <p>1. <strong>Pulsa "Iniciar Sesión"</strong> arriba</p>
                  <p>2. Usa: demo@zeitkonto.de / demo123</p>
                  <p>3. O crea una cuenta nueva</p>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 space-y-2">
          <p>Estado: {isLoading ? 'Cargando...' : user ? `Conectado (${user.email})` : 'No conectado'}</p>
          <div className="mt-4 pt-4 border-t">
            <p>Próximo: Conexión real con Supabase</p>
          </div>
        </div>
      </div>
    </div>
  )
}
