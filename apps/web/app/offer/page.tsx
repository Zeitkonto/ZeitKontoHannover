import Link from 'next/link'

export default function OfferPage() {
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
            Ofrecer tu ayuda
          </h1>
          <p className="text-gray-600 mb-6">
            Comparte tus habilidades con la comunidad
          </p>
          
          <div className="space-y-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <div className="text-4xl mb-2">➕</div>
              <p className="text-gray-500">Formulario en construcción</p>
            </div>
            
            <div className="text-sm text-gray-500 space-y-2">
              <p>✅ Podrás ofrecer servicios como:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Clases de cocina</li>
                <li>Ayuda con jardinería</li>
                <li>Reparaciones básicas</li>
                <li>Enseñar idiomas</li>
                <li>Y mucho más...</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Próximo paso: Formulario completo de ofertas</p>
        </div>
      </div>
    </div>
  )
}
