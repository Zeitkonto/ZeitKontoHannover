'use client'

import Link from 'next/link'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/components/providers/AuthProvider'

export default function ExchangeFloatButton() {
  const { user } = useAuth()
  
  if (!user) return null
  
  return (
    <Link
      href="/exchanges"
      className="fixed left-4 bottom-20 md:hidden z-40 animate-bounce"
    >
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center">
        <ArrowPathIcon className="h-5 w-5 mr-2" />
        <span className="text-sm font-medium">Intercambios</span>
      </div>
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        ¡Nuevo!
      </div>
    </Link>
  )
}
