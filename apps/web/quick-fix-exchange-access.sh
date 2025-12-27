#!/bin/bash
echo "🔧 Creando acceso temporal a Intercambios..."

# Crear un botón flotante adicional
cat > components/layout/ExchangeFloatButton.tsx << 'FLOATBUTTON'
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
      className="fixed left-4 bottom-20 md:hidden z-40"
    >
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center">
        <ArrowPathIcon className="h-5 w-5 mr-2" />
        <span className="text-sm font-medium">Intercambios</span>
      </div>
    </Link>
  )
}
FLOATBUTTON

echo "✅ Botón flotante creado en components/layout/ExchangeFloatButton.tsx"
echo ""
echo "Ahora agrégalo al layout principal:"
echo "1. Edita app/layout.tsx"
echo "2. Agrega esta línea después de <BottomNavigation />:"
echo "   <ExchangeFloatButton />"
echo "3. Y agrega el import arriba:"
echo "   import ExchangeFloatButton from '@/components/layout/ExchangeFloatButton'"
