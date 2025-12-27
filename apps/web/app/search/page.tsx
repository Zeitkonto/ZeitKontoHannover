import Link from 'next/link'

export default function SearchPage() {
  return (
    <div className="min-h-screen-safe p-4 bg-gray-50">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <span className="mr-2">←</span>
            Volver
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Buscar ayuda
          </h1>
          <p className="text-gray-600 mb-6">
            Encuentra vecinos que puedan ayudarte
          </p>
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Buscar por habilidad, categoría..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {['Jardinería', 'Cocina', 'Idiomas', 'Reparaciones', 'Música', 'Deportes'].map((category) => (
                <button
                  key={category}
                  className="p-4 bg-gray-100 rounded-lg text-center hover:bg-gray-200 active:scale-95 transition"
                  disabled
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Próximo paso: Búsqueda real con filtros</p>
        </div>
      </div>
    </div>
  )
}
