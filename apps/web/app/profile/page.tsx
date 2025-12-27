import Link from 'next/link'

export default function ProfilePage() {
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
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Usuario Demo</h1>
              <p className="text-gray-600">Hannover, Alemania</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">Mi Reputación</h3>
              <div className="flex items-center">
                <div className="w-full bg-blue-200 rounded-full h-2 mr-3">
                  <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                </div>
                <span className="font-bold">7.8/10</span>
              </div>
              <p className="text-sm text-blue-600 mt-2">5 intercambios completados</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">5.5</div>
                <div className="text-sm text-gray-600">Horas disponible</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-sm text-gray-600">Intercambios</div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Mis habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {['Jardinería', 'Español', 'Cocina básica', 'Matemáticas', 'Informática'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Próximo paso: Perfil editable real</p>
        </div>
      </div>
    </div>
  )
}
