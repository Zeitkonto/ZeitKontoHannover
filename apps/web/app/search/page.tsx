'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'

type Activity = {
  id: string
  title: string
  type: 'offer' | 'request'
  category: string
  description: string
  hours: number
  user: {
    name: string
    rating: number
    completedExchanges: number
  }
  location: string
  distance: number
  postedDate: string
  status: 'active' | 'pending' | 'completed'
}

type Filters = {
  type: 'all' | 'offer' | 'request'
  categories: string[]
  maxDistance: number
  minHours: number
  maxHours: number
  availability: string[]
  sortBy: 'recent' | 'distance' | 'hours' | 'rating'
}

const categories = [
  'Jardinería',
  'Cocina y Alimentación',
  'Idiomas y Enseñanza',
  'Reparaciones Domésticas',
  'Cuidado de Personas',
  'Transporte y Logística',
  'Tecnología e Informática',
  'Arte y Manualidades',
  'Deportes y Ejercicio',
  'Otros Servicios'
]

const availabilityOptions = [
  { id: 'weekdays_morning', label: 'Mañanas entre semana' },
  { id: 'weekdays_afternoon', label: 'Tardes entre semana' },
  { id: 'weekends', label: 'Fines de semana' },
  { id: 'evenings', label: 'Tardes-noches' },
  { id: 'urgent', label: 'Disponibilidad inmediata' }
]

const sortOptions = [
  { id: 'recent', label: 'Más recientes' },
  { id: 'distance', label: 'Más cercanos' },
  { id: 'hours', label: 'Menor tiempo' },
  { id: 'rating', label: 'Mejor valorados' }
]

const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Clases de español para principiantes',
    type: 'offer',
    category: 'Idiomas y Enseñanza',
    description: 'Ofrezco clases de español básico para adultos. Enfoque conversacional y práctico.',
    hours: 2,
    user: {
      name: 'María González',
      rating: 4.8,
      completedExchanges: 12
    },
    location: 'Centro, Hannover',
    distance: 1.2,
    postedDate: 'Hoy',
    status: 'active'
  },
  {
    id: '2',
    title: 'Ayuda con jardín comunitario',
    type: 'request',
    category: 'Jardinería',
    description: 'Necesito ayuda para organizar y mantener nuestro jardín comunitario los fines de semana.',
    hours: 3,
    user: {
      name: 'Carlos Meyer',
      rating: 4.9,
      completedExchanges: 24
    },
    location: 'Nordstadt',
    distance: 2.5,
    postedDate: 'Ayer',
    status: 'active'
  },
  {
    id: '3',
    title: 'Reparación de computadoras básicas',
    type: 'offer',
    category: 'Tecnología e Informática',
    description: 'Puedo ayudar con problemas básicos de software, instalación de programas y limpieza.',
    hours: 1.5,
    user: {
      name: 'Anna Schmidt',
      rating: 4.7,
      completedExchanges: 8
    },
    location: 'Südstadt',
    distance: 3.1,
    postedDate: 'Hace 2 días',
    status: 'active'
  },
  {
    id: '4',
    title: 'Clases de cocina vegetariana',
    type: 'offer',
    category: 'Cocina y Alimentación',
    description: 'Aprende a cocinar platos vegetarianos saludables y deliciosos. Trae tu propio ingredientes.',
    hours: 2.5,
    user: {
      name: 'Thomas Weber',
      rating: 4.6,
      completedExchanges: 15
    },
    location: 'Linden',
    distance: 4.2,
    postedDate: 'Hace 3 días',
    status: 'active'
  },
  {
    id: '5',
    title: 'Necesito ayuda con mudanza',
    type: 'request',
    category: 'Transporte y Logística',
    description: 'Busco 2-3 personas para ayudar con mudanza pequeña dentro de Hannover. Solo muebles ligeros.',
    hours: 4,
    user: {
      name: 'Sophie Müller',
      rating: 4.5,
      completedExchanges: 6
    },
    location: 'List',
    distance: 5.0,
    postedDate: 'Hace 1 semana',
    status: 'pending'
  },
  {
    id: '6',
    title: 'Enseñanza de guitarra básica',
    type: 'offer',
    category: 'Arte y Manualidades',
    description: 'Clases de guitarra para principiantes. Trae tu propia guitarra. Paciente y con experiencia enseñando.',
    hours: 1,
    user: {
      name: 'David Hoffman',
      rating: 4.9,
      completedExchanges: 18
    },
    location: 'Vahrenwald',
    distance: 6.3,
    postedDate: 'Hace 5 días',
    status: 'active'
  }
]

export default function SearchPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [filters, setFilters] = useState<Filters>({
    type: 'all',
    categories: [],
    maxDistance: 10,
    minHours: 0.5,
    maxHours: 10,
    availability: [],
    sortBy: 'recent'
  })
  
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>(mockActivities)

  useEffect(() => {
    applyFilters()
  }, [filters, searchQuery])

  const applyFilters = () => {
    setIsLoading(true)
    
    // Simular delay de filtrado
    setTimeout(() => {
      let results = [...mockActivities]
      
      // Filtro por búsqueda de texto
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        results = results.filter(activity =>
          activity.title.toLowerCase().includes(query) ||
          activity.description.toLowerCase().includes(query) ||
          activity.category.toLowerCase().includes(query)
        )
      }
      
      // Filtro por tipo
      if (filters.type !== 'all') {
        results = results.filter(activity => activity.type === filters.type)
      }
      
      // Filtro por categorías
      if (filters.categories.length > 0) {
        results = results.filter(activity =>
          filters.categories.includes(activity.category)
        )
      }
      
      // Filtro por distancia
      results = results.filter(activity => activity.distance <= filters.maxDistance)
      
      // Filtro por horas
      results = results.filter(activity =>
        activity.hours >= filters.minHours && activity.hours <= filters.maxHours
      )
      
      // Ordenar
      results.sort((a, b) => {
        switch (filters.sortBy) {
          case 'distance':
            return a.distance - b.distance
          case 'hours':
            return a.hours - b.hours
          case 'rating':
            return b.user.rating - a.user.rating
          case 'recent':
          default:
            return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        }
      })
      
      setFilteredActivities(results)
      setIsLoading(false)
    }, 300)
  }

  const handleCategoryToggle = (category: string) => {
    if (filters.categories.includes(category)) {
      setFilters({
        ...filters,
        categories: filters.categories.filter(c => c !== category)
      })
    } else {
      setFilters({
        ...filters,
        categories: [...filters.categories, category]
      })
    }
  }

  const handleAvailabilityToggle = (availabilityId: string) => {
    if (filters.availability.includes(availabilityId)) {
      setFilters({
        ...filters,
        availability: filters.availability.filter(id => id !== availabilityId)
      })
    } else {
      setFilters({
        ...filters,
        availability: [...filters.availability, availabilityId]
      })
    }
  }

  const resetFilters = () => {
    setFilters({
      type: 'all',
      categories: [],
      maxDistance: 10,
      minHours: 0.5,
      maxHours: 10,
      availability: [],
      sortBy: 'recent'
    })
    setSearchQuery('')
  }

  const getActivityTypeIcon = (type: string) => {
    return type === 'offer' ? '📢' : '🔍'
  }

  const getActivityTypeColor = (type: string) => {
    return type === 'offer' ? 'blue' : 'green'
  }

  return (
    <div className="min-h-screen-safe bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <header className="mb-6">
          <div className="mb-4">
            <Link 
              href="/dashboard"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <span className="mr-2">←</span>
              Volver al dashboard
            </Link>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Buscar ayuda en la comunidad
              </h1>
              <p className="text-gray-600">
                Encuentra ofertas y solicitudes cerca de ti
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <span className="mr-2">⚙️</span>
                {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
              </button>
              
              <Link
                href="/offer"
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                + Crear publicación
              </Link>
            </div>
          </div>

          {/* Barra de búsqueda principal */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por palabra clave, categoría, habilidad..."
              className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <span className="text-gray-400">×</span>
              </button>
            )}
          </div>
        </header>

        {/* Filtros desplegables */}
        {showFilters && (
          <div className="mb-8 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Filtros avanzados</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Restablecer todos
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tipo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'Todo' },
                    { id: 'offer', label: 'Ofertas' },
                    { id: 'request', label: 'Solicitudes' }
                  ].map((option) => (
                    <div key={option.id} className="flex items-center">
                      <button
                        onClick={() => setFilters({...filters, type: option.id as any})}
                        className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                          filters.type === option.id
                            ? 'bg-blue-500'
                            : 'border border-gray-300'
                        }`}
                      >
                        {filters.type === option.id && (
                          <span className="w-2 h-2 bg-white rounded-full"></span>
                        )}
                      </button>
                      <span className="text-gray-700">{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categorías */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categorías
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <button
                        onClick={() => handleCategoryToggle(category)}
                        className={`w-5 h-5 rounded mr-2 flex items-center justify-center ${
                          filters.categories.includes(category)
                            ? 'bg-blue-500'
                            : 'border border-gray-300'
                        }`}
                      >
                        {filters.categories.includes(category) && (
                          <span className="text-white text-xs">✓</span>
                        )}
                      </button>
                      <span className="text-gray-700 text-sm">{category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distancia y horas */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Distancia máxima: {filters.maxDistance} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={filters.maxDistance}
                    onChange={(e) => setFilters({...filters, maxDistance: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Horas: {filters.minHours} - {filters.maxHours}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="0.5"
                      max="24"
                      step="0.5"
                      value={filters.minHours}
                      onChange={(e) => setFilters({...filters, minHours: parseFloat(e.target.value)})}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <span className="text-gray-500">a</span>
                    <input
                      type="number"
                      min="0.5"
                      max="24"
                      step="0.5"
                      value={filters.maxHours}
                      onChange={(e) => setFilters({...filters, maxHours: parseFloat(e.target.value)})}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Ordenar y disponibilidad */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Ordenar por
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Disponibilidad
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {availabilityOptions.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <button
                          onClick={() => handleAvailabilityToggle(option.id)}
                          className={`w-4 h-4 rounded mr-2 flex items-center justify-center ${
                            filters.availability.includes(option.id)
                              ? 'bg-green-500'
                              : 'border border-gray-300'
                          }`}
                        >
                          {filters.availability.includes(option.id) && (
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                          )}
                        </button>
                        <span className="text-gray-700 text-sm">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resultados y estadísticas */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-gray-600">
            {isLoading ? (
              'Buscando...'
            ) : (
              <>
                Mostrando <span className="font-bold">{filteredActivities.length}</span> de{' '}
                <span className="font-bold">{mockActivities.length}</span> actividades
              </>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            {filters.type !== 'all' && (
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                {filters.type === 'offer' ? 'Solo ofertas' : 'Solo solicitudes'}
              </span>
            )}
            {filters.categories.length > 0 && (
              <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded mr-2">
                {filters.categories.length} categorías
              </span>
            )}
            {filters.maxDistance < 50 && (
              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">
                ≤ {filters.maxDistance} km
              </span>
            )}
          </div>
        </div>

        {/* Grid de actividades */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Buscando actividades...</p>
          </div>
        ) : filteredActivities.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              No se encontraron actividades
            </h3>
            <p className="text-gray-600 mb-6">
              Prueba ajustando tus filtros o ampliando la búsqueda
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Restablecer búsqueda
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow"
              >
                {/* Header de la tarjeta */}
                <div className={`p-6 rounded-t-xl ${
                  activity.type === 'offer' ? 'bg-blue-50' : 'bg-green-50'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">
                        {getActivityTypeIcon(activity.type)}
                      </span>
                      <div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          activity.type === 'offer'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {activity.type === 'offer' ? 'Oferta' : 'Solicitud'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800">
                        {activity.hours}
                      </div>
                      <div className="text-sm text-gray-600">horas</div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {activity.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-3">📍 {activity.location}</span>
                    <span>•</span>
                    <span className="ml-3">📅 {activity.postedDate}</span>
                  </div>
                </div>
                
                {/* Cuerpo de la tarjeta */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {activity.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {activity.category}
                    </span>
                  </div>
                  
                  {/* Información del usuario */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-gray-600">
                          {activity.user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{activity.user.name}</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span>{activity.user.rating}</span>
                          <span className="mx-1">•</span>
                          <span>{activity.user.completedExchanges} intercambios</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">
                        {activity.distance} km de ti
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sugerencias de búsqueda */}
        {!searchQuery && filteredActivities.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              🔍 También podrías buscar...
            </h2>
            <div className="flex flex-wrap gap-3">
              {['Jardinería urbana', 'Clases de alemán', 'Reparar bicicleta', 
                'Cocina saludable', 'Yoga para principiantes', 'Ayuda con tecnología'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
          <p>Sistema de búsqueda avanzada con filtros en tiempo real ✅</p>
          <p className="mt-1">Próximo paso: Sistema de intercambios y confirmaciones</p>
        </div>
      </div>
    </div>
  )
}
