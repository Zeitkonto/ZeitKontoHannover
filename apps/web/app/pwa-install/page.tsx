'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PWAInstallPage() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Detectar iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(ios)
    
    // Detectar si ya está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true)
    }
    
    // Detectar evento beforeinstallprompt (Chrome/Android)
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDeferredPrompt(null)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            📱 Instalar ZeitKonto como App
          </h1>
          <p className="text-gray-600 text-lg">
            Disfruta de una experiencia mejorada instalando nuestra app PWA
          </p>
        </header>

        {isStandalone ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-green-700">
                ¡Ya está instalada!
              </h2>
            </div>
            <p className="text-green-600">
              ZeitKonto ya está instalada como aplicación en tu dispositivo.
            </p>
            <Link 
              href="/"
              className="inline-block mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              Ir a la app
            </Link>
          </div>
        ) : (
          <>
            {/* Beneficios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow border">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Más rápido</h3>
                <p className="text-gray-600">Carga instantánea y funciona offline</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow border">
                <div className="text-3xl mb-4">📲</div>
                <h3 className="text-xl font-semibold mb-2">Como app nativa</h3>
                <p className="text-gray-600">Icono en pantalla de inicio, notificaciones</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow border">
                <div className="text-3xl mb-4">🆓</div>
                <h3 className="text-xl font-semibold mb-2">Sin descarga</h3>
                <p className="text-gray-600">No ocupa espacio en la tienda de apps</p>
              </div>
            </div>

            {/* Instrucciones por plataforma */}
            <div className="space-y-8">
              {/* Android */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-600 text-white p-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <span className="mr-3">🤖</span>
                    Instalar en Android
                  </h2>
                </div>
                <div className="p-6">
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                      <span>Abre ZeitKonto en Chrome o Edge</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                      <span>Toca el menú (tres puntos en la esquina superior derecha)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                      <span>Selecciona "Instalar app" o "Añadir a pantalla de inicio"</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                      <span>Confirma la instalación. ¡Listo!</span>
                    </li>
                  </ol>
                  
                  {deferredPrompt && (
                    <button
                      onClick={handleInstallClick}
                      className="mt-6 w-full py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 text-lg"
                    >
                      📲 Instalar Ahora
                    </button>
                  )}
                </div>
              </div>

              {/* iOS */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gray-800 text-white p-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    <span className="mr-3">🍎</span>
                    Instalar en iPhone/iPad
                  </h2>
                </div>
                <div className="p-6">
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <span className="bg-gray-100 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                      <span>Abre ZeitKonto en Safari</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-gray-100 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                      <span>Toca el icono de compartir (caja con flecha hacia arriba)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-gray-100 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                      <span>Desplázate y selecciona "Añadir a pantalla de inicio"</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-gray-100 text-gray-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                      <span>Toca "Añadir" en la esquina superior derecha</span>
                    </li>
                  </ol>
                  
                  {isIOS && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-700">
                        <strong>Nota:</strong> En iOS, debes usar Safari. Chrome/Firefox en iOS no permiten instalación PWA.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center text-gray-500">
          <p className="mb-4">
            PWA (Progressive Web App) - Una web que se comporta como una app nativa
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              ← Volver al inicio
            </Link>
            <a href="/test-pwa" className="text-blue-600 hover:text-blue-800">
              Página de prueba PWA →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
