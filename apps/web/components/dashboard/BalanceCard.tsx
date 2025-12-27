'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface BalanceData {
  balance: number
  earned: number
  spent: number
  lastUpdated: string
}

export default function BalanceCard() {
  const [balanceData, setBalanceData] = useState<BalanceData>({
    balance: 5.5,
    earned: 3,
    spent: 1.5,
    lastUpdated: new Date().toLocaleDateString('de-DE')
  })
  const [isLoading, setIsLoading] = useState(false)

  const refreshBalance = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      
      // Simular llamada a API (en desarrollo usa datos mock)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Datos mock para desarrollo
      setBalanceData({
        balance: 5.5 + Math.random(),
        earned: 3 + Math.random(),
        spent: 1.5 + Math.random(),
        lastUpdated: new Date().toLocaleDateString('de-DE')
      })
    } catch (error) {
      console.error('Error cargando saldo:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tu Saldo de Tiempo</h2>
        <button
          onClick={refreshBalance}
          disabled={isLoading}
          className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition disabled:opacity-50"
        >
          {isLoading ? 'Actualizando...' : '🔄 Actualizar'}
        </button>
      </div>
      
      <div className="text-center mb-6">
        <div className="text-5xl font-bold mb-2">
          {balanceData.balance.toFixed(1)}
        </div>
        <div className="text-blue-100">horas disponibles</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 p-3 rounded-lg">
          <div className="text-2xl font-bold">+{balanceData.earned.toFixed(1)}</div>
          <div className="text-sm text-blue-100">ganadas</div>
        </div>
        <div className="bg-white/20 p-3 rounded-lg">
          <div className="text-2xl font-bold">-{balanceData.spent.toFixed(1)}</div>
          <div className="text-sm text-blue-100">usadas</div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-blue-200 text-center">
        Actualizado: {balanceData.lastUpdated}
      </div>
    </div>
  )
}
