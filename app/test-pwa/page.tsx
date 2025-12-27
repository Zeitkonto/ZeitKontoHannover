export default function TestPWAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          📱 PWA Test
        </h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Instalar como App</h2>
          <p className="text-gray-600 mb-4">
            Esta web puede instalarse como aplicación en tu dispositivo móvil.
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-700">📲 En Chrome/Edge (Android):</h3>
              <p className="text-sm text-gray-600 mt-1">
                1. Toca el menú (3 puntos)<br/>
                2. Selecciona "Instalar app" o "Añadir a pantalla de inicio"<br/>
                3. Confirma la instalación
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-700">🍎 En Safari (iOS):</h3>
              <p className="text-sm text-gray-600 mt-1">
                1. Toca el ícono de compartir (caja con flecha arriba)<br/>
                2. Desplázate y selecciona "Añadir a pantalla de inicio"<br/>
                3. Toca "Añadir" en la esquina superior derecha
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Características PWA</h2>
          <ul className="space-y-3">
            <li className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600">✓</span>
              </div>
              <span>Instalable en dispositivo</span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600">✓</span>
              </div>
              <span>Funciona offline parcialmente</span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-yellow-600">⏳</span>
              </div>
              <span>Notificaciones push (próximamente)</span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600">✓</span>
              </div>
              <span>Icono en pantalla de inicio</span>
            </li>
          </ul>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            ← Volver al inicio
          </a>
          <div className="mt-4 text-sm text-gray-500">
            <p>Visita esta página desde un dispositivo móvil para probar la instalación.</p>
            <p className="mt-1">URL: <code className="bg-gray-100 px-2 py-1 rounded">/test-pwa</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}
