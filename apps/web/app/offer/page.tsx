'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'

type FormData = {
  type: 'offer' | 'request'
  title: string
  description: string
  category: string
  hours: number
  location: string
  contactMethod: 'app' | 'phone' | 'email'
  phone?: string
  email?: string
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

export default function OfferPage() {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    type: 'offer',
    title: '',
    description: '',
    category: '',
    hours: 1,
    location: 'Hannover',
    contactMethod: 'app'
  })

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNextStep = () => {
    if (step === 1 && (!formData.title || !formData.category)) {
      alert('Por favor completa título y categoría')
      return
    }
    if (step === 2 && !formData.description) {
      alert('Por favor agrega una descripción')
      return
    }
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Formulario enviado:', formData)
      setSubmitSuccess(true)
      
      // Reset después de éxito
      setTimeout(() => {
        setFormData({
          type: 'offer',
          title: '',
          description: '',
          category: '',
          hours: 1,
          location: 'Hannover',
          contactMethod: 'app'
        })
        setStep(1)
        setSubmitSuccess(false)
      }, 3000)
      
    } catch (error) {
      console.error('Error al enviar:', error)
      alert('Error al publicar. Intenta nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen-safe p-4 bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 max-w-md text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Acceso requerido
          </h1>
          <p className="text-gray-600 mb-6">
            Debes iniciar sesión para publicar ofertas o solicitudes.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    )
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen-safe p-4 bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 max-w-md text-center">
          <div className="text-4xl text-green-500 mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Publicado con éxito!
          </h1>
          <p className="text-gray-600 mb-6">
            Tu {formData.type === 'offer' ? 'oferta' : 'solicitud'} ha sido publicada y ya está visible en la comunidad.
          </p>
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
              Volver al dashboard
            </Link>
            <button
              onClick={() => {
                setSubmitSuccess(false)
                setStep(1)
              }}
              className="block px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
            >
              Publicar otra
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen-safe p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/dashboard"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <span className="mr-2">←</span>
              Volver
            </Link>
            <div className="text-sm text-gray-500">
              Paso {step} de 3
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {formData.type === 'offer' ? 'Ofrecer ayuda' : 'Buscar ayuda'}
          </h1>
          <p className="text-gray-600">
            Comparte tus habilidades o encuentra lo que necesitas
          </p>
        </header>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Tipo y categoría</span>
            <span className="text-sm font-medium">Descripción</span>
            <span className="text-sm font-medium">Confirmación</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Tipo y categoría */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              1. ¿Qué quieres hacer?
            </h2>
            
            {/* Tipo: Oferta o Solicitud */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Estoy interesado en:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleInputChange('type', 'offer')}
                  className={`p-6 border-2 rounded-xl text-center transition-all ${
                    formData.type === 'offer'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">📢</div>
                  <div className="font-medium">Ofrecer ayuda</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Compartir mis habilidades
                  </div>
                </button>
                
                <button
                  onClick={() => handleInputChange('type', 'request')}
                  className={`p-6 border-2 rounded-xl text-center transition-all ${
                    formData.type === 'request'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">🔍</div>
                  <div className="font-medium">Buscar ayuda</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Encontrar lo que necesito
                  </div>
                </button>
              </div>
            </div>

            {/* Título */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título (máx. 50 caracteres)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                maxLength={50}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  formData.type === 'offer' 
                    ? 'Ej: Clases de español para principiantes'
                    : 'Ej: Necesito ayuda con mi jardín'
                }
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {formData.title.length}/50
              </div>
            </div>

            {/* Categoría */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleInputChange('category', cat)}
                    className={`p-3 border rounded-lg text-center transition ${
                      formData.category === cat
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Horas */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiempo estimado (horas)
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleInputChange('hours', Math.max(0.5, formData.hours - 0.5))}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <span className="text-2xl font-bold">{formData.hours}</span>
                  <span className="ml-2 text-gray-600">horas</span>
                </div>
                <button
                  onClick={() => handleInputChange('hours', formData.hours + 0.5)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Botón siguiente */}
            <button
              onClick={handleNextStep}
              className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Continuar a descripción
            </button>
          </div>
        )}

        {/* Step 2: Descripción y detalles */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              2. Agrega detalles
            </h2>
            
            {/* Descripción */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción detallada
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  formData.type === 'offer'
                    ? 'Describe qué puedes ofrecer, tu experiencia, materiales necesarios, etc.'
                    : 'Explica qué necesitas, cuándo, condiciones especiales, etc.'
                }
              />
              <div className="text-xs text-gray-500 mt-1">
                Sé claro y específico para mejores resultados
              </div>
            </div>

            {/* Ubicación */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: Centro de Hannover, Barrio Nordstadt..."
              />
            </div>

            {/* Método de contacto */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Método de contacto preferido
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => handleInputChange('contactMethod', 'app')}
                  className={`p-4 border-2 rounded-lg text-center ${
                    formData.contactMethod === 'app'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">💬</div>
                  <div className="text-sm font-medium">Por la app</div>
                </button>
                
                <button
                  onClick={() => handleInputChange('contactMethod', 'phone')}
                  className={`p-4 border-2 rounded-lg text-center ${
                    formData.contactMethod === 'phone'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">📱</div>
                  <div className="text-sm font-medium">Teléfono</div>
                </button>
                
                <button
                  onClick={() => handleInputChange('contactMethod', 'email')}
                  className={`p-4 border-2 rounded-lg text-center ${
                    formData.contactMethod === 'email'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">✉️</div>
                  <div className="text-sm font-medium">Email</div>
                </button>
              </div>
            </div>

            {/* Campos adicionales según método */}
            {formData.contactMethod === 'phone' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de teléfono
                </label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+49 123 456789"
                />
              </div>
            )}

            {formData.contactMethod === 'email' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={formData.email || user.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
            )}

            {/* Botones navegación */}
            <div className="flex space-x-4">
              <button
                onClick={handlePrevStep}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
              >
                Atrás
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
              >
                Continuar a revisión
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmación */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              3. Revisa y publica
            </h2>
            
            {/* Resumen */}
            <div className="mb-8 space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-2">Resumen</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">
                      {formData.type === 'offer' ? 'Oferta de ayuda' : 'Solicitud de ayuda'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Título:</span>
                    <span className="font-medium">{formData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Categoría:</span>
                    <span className="font-medium">{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiempo:</span>
                    <span className="font-medium">{formData.hours} horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ubicación:</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contacto:</span>
                    <span className="font-medium">
                      {formData.contactMethod === 'app' && 'Por la app'}
                      {formData.contactMethod === 'phone' && `Teléfono: ${formData.phone}`}
                      {formData.contactMethod === 'email' && `Email: ${formData.email || user.email}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-700 mb-2">Descripción</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {formData.description || '(Sin descripción)'}
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-700 mb-2">Costo en tiempo</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {formData.hours} hora{formData.hours !== 1 ? 's' : ''}
                  </div>
                  <div className="text-sm text-green-700 mt-1">
                    {formData.type === 'offer' 
                      ? 'Ganarás estas horas cuando alguien acepte tu oferta'
                      : 'Dedicarás estas horas a cambio del servicio recibido'}
                  </div>
                </div>
              </div>
            </div>

            {/* Botones finales */}
            <div className="flex space-x-4">
              <button
                onClick={handlePrevStep}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200"
              >
                Atrás
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Publicando...' : '✅ Publicar ahora'}
              </button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700">
                <strong>Nota:</strong> Esta publicación será visible para todos los miembros 
                de ZeitKonto Hannover. Asegúrate de que la información sea correcta.
              </p>
            </div>
          </div>
        )}

        {/* Footer informativo */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Formulario de {formData.type === 'offer' ? 'ofertas' : 'solicitudes'} funcional ✅</p>
          <p className="mt-1">Próximo paso: Integración con Supabase real</p>
        </div>
      </div>
    </div>
  )
}
