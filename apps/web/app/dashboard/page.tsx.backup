'use client'

import { useAuth } from '@/components/providers/AuthProvider'
import Link from 'next/link'
import BalanceCard from '@/components/dashboard/BalanceCard'
import RecentActivities from '@/components/dashboard/RecentActivities'
import QuickStats from '@/components/dashboard/QuickStats'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen-safe bg-gray-50">
      <div className="p-4 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Hola, {user?.name || 'Vecino'}!
              </h1>
              <p className="text-gray-600">Bienvenido a ZeitKonto Hannover</p>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              Cerrar sesión
            </button>
          </div>
          
          <div className="mt-4">
            <Link 
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <span className="mr-2">←</span>
              Volver al inicio
            </Link>
          </div>
        </header>
        
        {/* Grid de componentes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Saldo y Acciones */}
          <div className="lg:col-span-2 space-y-6">
            <BalanceCard />
            
            {/* Acciones rápidas */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Acciones Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  href="/offer"
                  className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition">📢</div>
                  <div className="font-medium text-blue-700">Ofrecer ayuda</div>
                  <div className="text-sm text-blue-600 mt-1">Comparte tus habilidades</div>
                </Link>
                
                <Link 
                  href="/search"
                  className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition">🔍</div>
                  <div className="font-medium text-green-700">Buscar ayuda</div>
                  <div className="text-sm text-green-600 mt-1">Encuentra servicios</div>
                </Link>
                
                <Link 
                  href="/activities"
                  className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition">��</div>
                  <div className="font-medium text-purple-700">Mis actividades</div>
                  <div className="text-sm text-purple-600 mt-1">Ver historial</div>
                </Link>
              </div>
            </div>
            
            <RecentActivities />
          </div>
          
          {/* Columna derecha - Estadísticas y Comunidad */}
          <div className="space-y-6">
            <QuickStats />
            
            {/* Comunidad cercana */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Comunidad Cercana</h2>
              <div className="space-y-4">
                {['Jardinería', 'Cocina', 'Idiomas', 'Reparaciones', 'Deportes'].map((category) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{category}</span>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      +12 activos
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <Link 
                  href="/community"
                  className="block text-center py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Explorar comunidad completa
                </Link>
              </div>
            </div>
            
            {/* Consejo del día */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="font-bold text-lg mb-2">Consejo del día</h3>
              <p className="text-green-100">
                Ofrece una habilidad que disfrutes hacer. La mejor experiencia de intercambio 
                es cuando ambas partes están entusiasmadas.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer del dashboard */}
        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
          <p>Dashboard mejorado con componentes dinámicos ✅</p>
          <p className="mt-1">Próximo paso: Formulario de ofertas/solicitudes</p>
        </div>
      </div>
    </div>
  )
}
