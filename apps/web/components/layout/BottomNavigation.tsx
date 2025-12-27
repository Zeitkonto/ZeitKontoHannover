'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/providers/AuthProvider'
import { 
  HomeIcon, 
  ClockIcon, 
  PlusCircleIcon, 
  MagnifyingGlassIcon, 
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { 
  HomeIcon as HomeIconSolid, 
  ClockIcon as ClockIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
  MagnifyingGlassIcon as MagnifyingGlassIconSolid,
  UserIcon as UserIconSolid
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

export default function BottomNavigation() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
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
          
          {/* Botón de login/logout */}
          {!isAuthenticated ? (
            <Link
              href="/login"
              className="flex flex-col items-center justify-center flex-1 py-2"
            >
              <ArrowRightOnRectangleIcon className={`h-6 w-6 ${pathname === '/login' ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className={`text-xs mt-1 ${pathname === '/login' ? 'text-blue-500 font-medium' : 'text-gray-500'}`}>
                Entrar
              </span>
            </Link>
          ) : (
            <button
              onClick={logout}
              className="flex flex-col items-center justify-center flex-1 py-2"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-gray-400" />
              <span className="text-xs mt-1 text-gray-500">
                Salir
              </span>
            </button>
          )}
        </div>
        
        {/* Notch para iPhone */}
        <div className="h-safe-bottom bg-white"></div>
      </nav>
    </>
  )
}
