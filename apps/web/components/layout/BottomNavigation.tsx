'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { 
  HomeIcon, 
  ArrowPathIcon,
  PlusCircleIcon, 
  MagnifyingGlassIcon, 
  UserIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { 
  HomeIcon as HomeIconSolid, 
  ArrowPathIcon as ArrowPathIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  UserIcon as UserIconSolid,
  ClockIcon as ClockIconSolid
} from '@heroicons/react/24/solid'

const navigationItems = [
  {
    name: 'Inicio',
    href: '/',
    icon: HomeIcon,
    activeIcon: HomeIconSolid,
    public: true,
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: ClockIcon,
    activeIcon: ClockIconSolid,
    public: false,
  },
  {
    name: 'Ofrecer',
    href: '/offer',
    icon: PlusCircleIcon,
    activeIcon: PlusCircleIconSolid,
    primary: true,
    public: false,
  },
  {
    name: 'Buscar',
    href: '/search',
    icon: MagnifyingGlassIcon,
    activeIcon: MagnifyingGlassIconSolid,
    public: false,
  },
  {
    name: 'Perfil',
    href: '/profile',
    icon: UserIcon,
    activeIcon: UserIconSolid,
    public: false,
  },
]

// Ítem adicional para Intercambios (no en bottom nav por espacio, pero accesible)
const extraItems = [
  {
    name: 'Intercambios',
    href: '/exchanges',
    icon: ArrowPathIcon,
    activeIcon: ArrowPathIconSolid,
    public: false,
  }
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const { user } = useAuth()
  const isAuthenticated = !!user
  
  // Si no está autenticado, solo mostrar opciones públicas
  const filteredItems = navigationItems.filter(item => 
    isAuthenticated || item.public
  )

  return (
    <>
      {/* Espacio para que el contenido no quede detrás de la barra */}
      <div className="h-16 md:hidden"></div>
      
      {/* Barra de navegación inferior - Solo en móvil */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
        <div className="flex justify-around items-center h-16">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = isActive ? item.activeIcon : item.icon
            
            if (item.primary) {
              if (!isAuthenticated) return null // Ocultar botón principal si no autenticado
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-col items-center -mt-6"
                >
                  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-xs mt-1 text-blue-500 font-medium">
                    {item.name}
                  </span>
                </Link>
              )
            }
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 py-2"
              >
                <Icon className={`h-6 w-6 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
                <span className={`text-xs mt-1 ${isActive ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
        
        {/* Notch para iPhone */}
        <div className="h-safe-bottom bg-white"></div>
      </nav>

      {/* Botón flotante para Intercambios (alternativa si no cabe en bottom nav) */}
      {isAuthenticated && (
        <Link
          href="/exchanges"
          className="fixed right-4 bottom-20 md:hidden z-40"
        >
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <ArrowPathIcon className="h-6 w-6" />
          </div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Intercambios
          </div>
        </Link>
      )}
    </>
  )
}
