'use client'

import { useState, useEffect } from 'react'

interface Stats {
  exchanges: number
  rating: number
  responseRate: number
  communityRank: string
}

export default function QuickStats() {
  const [stats, setStats] = useState<Stats>({
    exchanges: 12,
    rating: 4.7,
    responseRate: 95,
    communityRank: 'Activo'
  })

  const [isLoading, setIsLoading] = useState(false)

  const refreshStats = async () => {
    setIsLoading(true)
    // Simular carga
    await new Promise(resolve => setTimeout(resolve, 300))
    setIsLoading(false)
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Tus Estadísticas</h2>
        <button
          onClick={refreshStats}
          disabled={isLoading}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {isLoading ? 'Actualizando...' : '🔄'}
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-800">{stats.exchanges}</div>
          <div className="text-sm text-gray-600">Intercambios</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-800">{stats.rating.toFixed(1)}</div>
          <div className="text-sm text-gray-600">Valoración</div>
          <div className="flex justify-center mt-1">
            {'★'.repeat(5).split('').map((star, i) => (
              <span 
                key={i} 
                className={`text-sm ${i < Math.floor(stats.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                {star}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-800">{stats.responseRate}%</div>
          <div className="text-sm text-gray-600">Respuesta</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-gray-800">{stats.communityRank}</div>
          <div className="text-sm text-gray-600">En comunidad</div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-medium text-gray-700 mb-3">Tu próxima meta:</h3>
        <div className="flex items-center">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: '65%' }}
            ></div>
          </div>
          <span className="ml-3 text-sm font-medium text-gray-700">65%</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Completa 5 intercambios más para subir de nivel
        </p>
      </div>
    </div>
  )
}
