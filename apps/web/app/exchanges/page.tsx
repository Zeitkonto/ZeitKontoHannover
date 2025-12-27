'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'

type ExchangeStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'

type Exchange = {
  id: string
  activityId: string
  activityTitle: string
  type: 'offer' | 'request'
  otherUser: {
    id: string
    name: string
    avatar?: string
  }
  hours: number
  status: ExchangeStatus
  scheduledDate?: string
  location?: string
  createdAt: string
  confirmedAt?: string
  completedAt?: string
  verificationCode?: string
}

type TabType = 'active' | 'pending' | 'completed' | 'all'

export default function ExchangesPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>('active')
  const [exchanges, setExchanges] = useState<Exchange[]>([
    {
      id: '1',
      activityId: '101',
      activityTitle: 'Clases de español para principiantes',
      type: 'offer',
      otherUser: {
        id: 'u2',
        name: 'Carlos Meyer',
      },
      hours: 2,
      status: 'confirmed',
      scheduledDate: '2024-03-20 16:00',
      location: 'Biblioteca central, Hannover',
      createdAt: '2024-03-15',
      confirmedAt: '2024-03-16',
      verificationCode: 'A7B9'
    },
    {
      id: '2',
      activityId: '102',
      activityTitle: 'Ayuda con jardín comunitario',
      type: 'request',
      otherUser: {
        id: 'u3',
        name: 'Anna Schmidt',
      },
      hours: 3,
      status: 'in_progress',
      scheduledDate: '2024-03-18 10:00',
      location: 'Parque Nordstadt',
      createdAt: '2024-03-10',
      confirmedAt: '2024-03-11'
    },
    {
      id: '3',
      activityId: '103',
      activityTitle: 'Reparación de computadoras básicas',
      type: 'offer',
      otherUser: {
        id: 'u4',
        name: 'Thomas Weber',
      },
      hours: 1.5,
      status: 'pending',
      createdAt: '2024-03-17'
    },
    {
      id: '4',
      activityId: '104',
      activityTitle: 'Clases de cocina vegetariana',
      type: 'request',
      otherUser: {
        id: 'u5',
        name: 'Sophie Müller',
      },
      hours: 2.5,
      status: 'completed',
      scheduledDate: '2024-03-05 18:00',
      location: 'Cocina comunitaria Linden',
      createdAt: '2024-02-28',
      confirmedAt: '2024-03-01',
      completedAt: '2024-03-05'
    },
    {
      id: '5',
      activityId: '105',
      activityTitle: 'Necesito ayuda con mudanza',
      type: 'request',
      otherUser: {
        id: 'u6',
        name: 'David Hoffman',
      },
      hours: 4,
      status: 'cancelled',
      createdAt: '2024-03-12',
      confirmedAt: '2024-03-13'
    }
  ])

  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [actionMessage, setActionMessage] = useState('')

  const filteredExchanges = exchanges.filter(exchange => {
    switch (activeTab) {
      case 'active':
        return ['confirmed', 'in_progress'].includes(exchange.status)
      case 'pending':
        return exchange.status === 'pending'
      case 'completed':
        return ['completed', 'cancelled'].includes(exchange.status)
      default:
        return true
    }
  })

  const getStatusInfo = (status: ExchangeStatus) => {
    switch (status) {
      case 'pending':
        return { color: 'yellow', label: 'Pendiente', icon: '⏳' }
      case 'confirmed':
        return { color: 'blue', label: 'Confirmado', icon: '✅' }
      case 'in_progress':
        return { color: 'purple', label: 'En progreso', icon: '🔄' }
      case 'completed':
        return { color: 'green', label: 'Completado', icon: '🎉' }
      case 'cancelled':
        return { color: 'red', label: 'Cancelado', icon: '❌' }
    }
  }

  const handleConfirmExchange = async (exchangeId: string) => {
    setIsLoading(true)
    try {
      // Simular confirmación
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setExchanges(prev => prev.map(ex => 
        ex.id === exchangeId 
          ? { 
              ...ex, 
              status: 'confirmed',
              confirmedAt: new Date().toISOString().split('T')[0],
              verificationCode: Math.random().toString(36).substring(2, 6).toUpperCase()
            }
          : ex
      ))
      
      setActionMessage('✅ Intercambio confirmado exitosamente')
      setTimeout(() => setActionMessage(''), 3000)
    } catch (error) {
      console.error('Error confirmando intercambio:', error)
      setActionMessage('❌ Error al confirmar el intercambio')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartExchange = async (exchangeId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      
      setExchanges(prev => prev.map(ex => 
        ex.id === exchangeId 
          ? { ...ex, status: 'in_progress' }
          : ex
      ))
      
      setActionMessage('🚀 Intercambio iniciado')
      setTimeout(() => setActionMessage(''), 3000)
    } catch (error) {
      console.error('Error iniciando intercambio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompleteExchange = async (exchangeId: string) => {
    setShowVerificationModal(true)
    const exchange = exchanges.find(ex => ex.id === exchangeId)
    setSelectedExchange(exchange || null)
  }

  const handleVerifyAndComplete = async () => {
    if (!selectedExchange) return
    
    if (verificationCode !== selectedExchange.verificationCode) {
      setActionMessage('❌ Código incorrecto')
      setTimeout(() => setActionMessage(''), 3000)
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setExchanges(prev => prev.map(ex => 
        ex.id === selectedExchange.id
          ? { 
              ...ex, 
              status: 'completed',
              completedAt: new Date().toISOString().split('T')[0]
            }
          : ex
      ))
      
      setShowVerificationModal(false)
      setVerificationCode('')
      setActionMessage('🎉 ¡Intercambio completado! Horas transferidas')
      setTimeout(() => setActionMessage(''), 4000)
    } catch (error) {
      console.error('Error completando intercambio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelExchange = async (exchangeId: string) => {
    if (!confirm('¿Estás seguro de que quieres cancelar este intercambio?')) return
    
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      
      setExchanges(prev => prev.map(ex => 
        ex.id === exchangeId 
          ? { ...ex, status: 'cancelled' }
          : ex
      ))
      
      setActionMessage('🗑️ Intercambio cancelado')
      setTimeout(() => setActionMessage(''), 3000)
    } catch (error) {
      console.error('Error cancelando intercambio:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getActionButtons = (exchange: Exchange) => {
    switch (exchange.status) {
      case 'pending':
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleConfirmExchange(exchange.id)}
              disabled={isLoading}
              className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Confirmar
            </button>
            <button
              onClick={() => handleCancelExchange(exchange.id)}
              disabled={isLoading}
              className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Rechazar
            </button>
          </div>
        )
      case 'confirmed':
        return (
          <button
            onClick={() => handleStartExchange(exchange.id)}
            disabled={isLoading}
            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
          >
            Iniciar intercambio
          </button>
        )
      case 'in_progress':
        return (
          <button
            onClick={() => handleCompleteExchange(exchange.id)}
            disabled={isLoading}
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            Completar intercambio
          </button>
        )
      default:
        return null
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen-safe p-4 bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 max-w-md text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Acceso requerido
          </h1>
          <p className="text-gray-600 mb-6">
            Debes iniciar sesión para gestionar intercambios.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen-safe bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-6">
            <Link 
              href="/dashboard"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <span className="mr-2">←</span>
              Volver al dashboard
            </Link>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Mis Intercambios
              </h1>
              <p className="text-gray-600">
                Gestiona tus intercambios activos, pendientes y completados
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-600">Intercambios activos</div>
            </div>
          </div>

          {actionMessage && (
            <div className={`mb-6 p-4 rounded-lg ${
              actionMessage.includes('✅') || actionMessage.includes('🎉')
                ? 'bg-green-50 border border-green-200 text-green-700'
                : actionMessage.includes('❌')
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-blue-50 border border-blue-200 text-blue-700'
            }`}>
              {actionMessage}
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow mb-8">
            <div className="flex border-b">
              {[
                { id: 'active', label: 'Activos', count: exchanges.filter(e => ['confirmed', 'in_progress'].includes(e.status)).length },
                { id: 'pending', label: 'Pendientes', count: exchanges.filter(e => e.status === 'pending').length },
                { id: 'completed', label: 'Historial', count: exchanges.filter(e => ['completed', 'cancelled'].includes(e.status)).length },
                { id: 'all', label: 'Todos', count: exchanges.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex-1 py-4 text-center font-medium transition ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold text-blue-600">12.5</div>
            <div className="text-sm text-gray-600">Horas donadas total</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold text-green-600">8.0</div>
            <div className="text-sm text-gray-600">Horas recibidas total</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold text-purple-600">7</div>
            <div className="text-sm text-gray-600">Intercambios completados</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-2xl font-bold text-yellow-600">4.8</div>
            <div className="text-sm text-gray-600">Valoración promedio</div>
          </div>
        </div>

        {/* Lista de intercambios */}
        {filteredExchanges.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-4xl mb-4">
              {activeTab === 'active' ? '🤝' : activeTab === 'pending' ? '⏳' : '📋'}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {activeTab === 'active' 
                ? 'No tienes intercambios activos'
                : activeTab === 'pending'
                ? 'No tienes intercambios pendientes'
                : 'No hay historial de intercambios'
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'active'
                ? 'Busca actividades y comienza nuevos intercambios'
                : activeTab === 'pending'
                ? 'Espera a que alguien confirme tus solicitudes'
                : 'Los intercambios completados aparecerán aquí'
              }
            </p>
            <Link
              href="/search"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Buscar actividades
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredExchanges.map((exchange) => {
              const statusInfo = getStatusInfo(exchange.status)
              
              return (
                <div
                  key={exchange.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-xl mr-2">{statusInfo.icon}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {exchange.activityTitle}
                        </h3>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">
                          {exchange.hours}
                        </div>
                        <div className="text-sm text-gray-600">horas</div>
                      </div>
                    </div>

                    {/* Detalles */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Con</div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                            <span className="text-gray-600">
                              {exchange.otherUser.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium">{exchange.otherUser.name}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Tipo</div>
                        <div className={`px-3 py-1 rounded-full text-sm inline-block ${
                          exchange.type === 'offer'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {exchange.type === 'offer' ? 'Oferta' : 'Solicitud'}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Creado</div>
                        <div className="font-medium">{exchange.createdAt}</div>
                      </div>
                    </div>

                    {/* Información adicional según estado */}
                    {exchange.scheduledDate && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center text-gray-700">
                          <span className="mr-2">📅</span>
                          <div>
                            <div className="font-medium">Programado para:</div>
                            <div>{exchange.scheduledDate}</div>
                            {exchange.location && (
                              <div className="text-sm">📍 {exchange.location}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {exchange.verificationCode && exchange.status === 'confirmed' && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center text-blue-700">
                          <span className="mr-2">🔐</span>
                          <div>
                            <div className="font-medium">Código de verificación:</div>
                            <div className="text-2xl font-bold tracking-wider">
                              {exchange.verificationCode}
                            </div>
                            <div className="text-sm mt-1">
                              Comparte este código para completar el intercambio
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Acciones */}
                    <div className="pt-4 border-t">
                      {getActionButtons(exchange)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Modal de verificación */}
        {showVerificationModal && selectedExchange && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Completar intercambio
              </h3>
              
              <p className="text-gray-600 mb-6">
                Para completar el intercambio con {selectedExchange.otherUser.name}, 
                ingresa el código de verificación que te proporcionaron.
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código de verificación (4 dígitos)
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                  maxLength={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-bold tracking-wider focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="A7B9"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowVerificationModal(false)
                    setVerificationCode('')
                  }}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleVerifyAndComplete}
                  disabled={isLoading || verificationCode.length !== 4}
                  className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                >
                  {isLoading ? 'Completando...' : 'Completar intercambio'}
                </button>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>El código fue enviado a {selectedExchange.otherUser.name} al confirmar el intercambio.</p>
              </div>
            </div>
          </div>
        )}

        {/* Información del sistema */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">💡 ¿Cómo funcionan los intercambios?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">1️⃣</div>
              <div className="font-medium">Encuentra actividad</div>
              <div className="text-sm text-blue-200 mt-1">Busca ofertas o publica una</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-3">2️⃣</div>
              <div className="font-medium">Confirma intercambio</div>
              <div className="text-sm text-blue-200 mt-1">Ambas partes aceptan</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-3">3️⃣</div>
              <div className="font-medium">Realiza el servicio</div>
              <div className="text-sm text-blue-200 mt-1">En la fecha acordada</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-3">4️⃣</div>
              <div className="font-medium">Verifica y completa</div>
              <div className="text-sm text-blue-200 mt-1">Con código de verificación</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
          <p>Sistema de intercambios con confirmación por código de verificación ✅</p>
          <p className="mt-1">Próximo paso: Panel de administración básico</p>
        </div>
      </div>
    </div>
  )
}
