'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'

type UserProfile = {
  name: string
  email: string
  bio: string
  location: string
  phone?: string
  skills: string[]
  languages: string[]
  availability: string[]
  notificationPreferences: {
    email: boolean
    push: boolean
    sms: boolean
  }
}

const allSkills = [
  'Jardinería', 'Cocina', 'Idiomas', 'Reparaciones', 'Informática',
  'Matemáticas', 'Música', 'Deportes', 'Cuidado de niños', 'Cuidado de ancianos',
  'Costura', 'Pintura', 'Carpintería', 'Electricidad', 'Fontanería',
  'Enseñanza', 'Traducción', 'Conducción', 'Organización', 'Meditación'
]

const allLanguages = [
  'Alemán', 'Español', 'Inglés', 'Francés', 'Italiano',
  'Portugués', 'Árabe', 'Turco', 'Polaco', 'Ruso',
  'Chino', 'Japonés', 'Coreano', 'Holandés', 'Sueco'
]

const availabilityOptions = [
  { id: 'weekdays_morning', label: 'Mañanas entre semana' },
  { id: 'weekdays_afternoon', label: 'Tardes entre semana' },
  { id: 'weekends', label: 'Fines de semana' },
  { id: 'evenings', label: 'Tardes-noches' },
  { id: 'flexible', label: 'Horario flexible' },
  { id: 'urgent', label: 'Disponibilidad urgente' }
]

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  const [profile, setProfile] = useState<UserProfile>({
    name: user?.name || 'Usuario',
    email: user?.email || '',
    bio: 'Miembro activo de ZeitKonto Hannover. Me encanta ayudar a la comunidad y aprender nuevas habilidades.',
    location: 'Hannover, Alemania',
    phone: '+49 123 456789',
    skills: ['Jardinería', 'Español', 'Cocina básica'],
    languages: ['Alemán', 'Español', 'Inglés'],
    availability: ['weekends', 'flexible'],
    notificationPreferences: {
      email: true,
      push: true,
      sms: false
    }
  })

  const [newSkill, setNewSkill] = useState('')
  const [newLanguage, setNewLanguage] = useState('')

  useEffect(() => {
    // Cargar perfil del usuario actual
    if (user) {
      setProfile(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email
      }))
    }
  }, [user])

  const handleSaveProfile = async () => {
    setIsLoading(true)
    
    try {
      // Simular guardado en API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Perfil guardado:', profile)
      setSaveSuccess(true)
      setIsEditing(false)
      
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Error guardando perfil:', error)
      alert('Error al guardar. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      })
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    })
  }

  const handleAddLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage.trim())) {
      setProfile({
        ...profile,
        languages: [...profile.languages, newLanguage.trim()]
      })
      setNewLanguage('')
    }
  }

  const handleRemoveLanguage = (languageToRemove: string) => {
    setProfile({
      ...profile,
      languages: profile.languages.filter(lang => lang !== languageToRemove)
    })
  }

  const handleToggleAvailability = (availabilityId: string) => {
    if (profile.availability.includes(availabilityId)) {
      setProfile({
        ...profile,
        availability: profile.availability.filter(id => id !== availabilityId)
      })
    } else {
      setProfile({
        ...profile,
        availability: [...profile.availability, availabilityId]
      })
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
            Debes iniciar sesión para ver tu perfil.
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

  return (
    <div className="min-h-screen-safe bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Mi Perfil
              </h1>
              <p className="text-gray-600">Gestiona tu información y preferencias</p>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                  >
                    {isLoading ? 'Guardando...' : 'Guardar cambios'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Editar perfil
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div>
            <Link 
              href="/dashboard"
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <span className="mr-2">←</span>
              Volver al dashboard
            </Link>
          </div>
        </header>

        {saveSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✅</span>
              <span className="text-green-700">Perfil actualizado correctamente</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Información básica */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjeta de información personal */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">👤</span>
                Información personal
              </h2>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">{profile.name}</div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg">{profile.email}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biografía
                  </label>
                  {isEditing ? (
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Cuéntanos sobre ti, tus intereses, experiencia..."
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg whitespace-pre-line">{profile.bio}</div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ubicación
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">{profile.location}</div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono (opcional)
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profile.phone || ''}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+49 123 456789"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-lg">{profile.phone || 'No proporcionado'}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta de habilidades */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">🛠️</span>
                Mis habilidades
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Habilidades que puedo ofrecer
                </label>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-full"
                    >
                      <span>{skill}</span>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nueva habilidad"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Agregar
                    </button>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Idiomas que hablo
                </label>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.languages.map((language) => (
                    <div
                      key={language}
                      className="flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-full"
                    >
                      <span>{language}</span>
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveLanguage(language)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {isEditing && (
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddLanguage()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nuevo idioma"
                    />
                    <button
                      onClick={handleAddLanguage}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Agregar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha - Configuración */}
          <div className="space-y-6">
            {/* Tarjeta de disponibilidad */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">⏰</span>
                Disponibilidad
              </h2>
              
              <div className="space-y-3">
                {availabilityOptions.map((option) => (
                  <div key={option.id} className="flex items-center">
                    {isEditing ? (
                      <button
                        onClick={() => handleToggleAvailability(option.id)}
                        className={`w-5 h-5 rounded mr-3 flex items-center justify-center ${
                          profile.availability.includes(option.id)
                            ? 'bg-blue-500'
                            : 'border border-gray-300'
                        }`}
                      >
                        {profile.availability.includes(option.id) && (
                          <span className="text-white text-sm">✓</span>
                        )}
                      </button>
                    ) : (
                      <div className="w-5 h-5 rounded mr-3 flex items-center justify-center">
                        {profile.availability.includes(option.id) ? (
                          <span className="text-blue-500 text-sm">✓</span>
                        ) : (
                          <span className="text-gray-300 text-sm">○</span>
                        )}
                      </div>
                    )}
                    <span className="text-gray-700">{option.label}</span>
                  </div>
                ))}
              </div>
              
              {!isEditing && profile.availability.length === 0 && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    No has configurado tu disponibilidad
                  </p>
                </div>
              )}
            </div>

            {/* Tarjeta de preferencias */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">🔔</span>
                Preferencias de notificaciones
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Email</div>
                    <div className="text-sm text-gray-500">Notificaciones por correo</div>
                  </div>
                  {isEditing ? (
                    <button
                      onClick={() => setProfile({
                        ...profile,
                        notificationPreferences: {
                          ...profile.notificationPreferences,
                          email: !profile.notificationPreferences.email
                        }
                      })}
                      className={`w-12 h-6 rounded-full p-1 transition ${
                        profile.notificationPreferences.email
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transform transition ${
                        profile.notificationPreferences.email
                          ? 'translate-x-6'
                          : 'translate-x-0'
                      }`}></div>
                    </button>
                  ) : (
                    <span className={`px-2 py-1 rounded text-sm ${
                      profile.notificationPreferences.email
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {profile.notificationPreferences.email ? 'Activado' : 'Desactivado'}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Notificaciones push</div>
                    <div className="text-sm text-gray-500">En la app PWA</div>
                  </div>
                  {isEditing ? (
                    <button
                      onClick={() => setProfile({
                        ...profile,
                        notificationPreferences: {
                          ...profile.notificationPreferences,
                          push: !profile.notificationPreferences.push
                        }
                      })}
                      className={`w-12 h-6 rounded-full p-1 transition ${
                        profile.notificationPreferences.push
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transform transition ${
                        profile.notificationPreferences.push
                          ? 'translate-x-6'
                          : 'translate-x-0'
                      }`}></div>
                    </button>
                  ) : (
                    <span className={`px-2 py-1 rounded text-sm ${
                      profile.notificationPreferences.push
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {profile.notificationPreferences.push ? 'Activado' : 'Desactivado'}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">SMS</div>
                    <div className="text-sm text-gray-500">Mensajes de texto</div>
                  </div>
                  {isEditing ? (
                    <button
                      onClick={() => setProfile({
                        ...profile,
                        notificationPreferences: {
                          ...profile.notificationPreferences,
                          sms: !profile.notificationPreferences.sms
                        }
                      })}
                      className={`w-12 h-6 rounded-full p-1 transition ${
                        profile.notificationPreferences.sms
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transform transition ${
                        profile.notificationPreferences.sms
                          ? 'translate-x-6'
                          : 'translate-x-0'
                      }`}></div>
                    </button>
                  ) : (
                    <span className={`px-2 py-1 rounded text-sm ${
                      profile.notificationPreferences.sms
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {profile.notificationPreferences.sms ? 'Activado' : 'Desactivado'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Tarjeta de estadísticas */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-lg font-bold mb-4">Mis Estadísticas</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Tiempo donado:</span>
                  <span className="font-bold">12.5 horas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tiempo recibido:</span>
                  <span className="font-bold">8.0 horas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Intercambios:</span>
                  <span className="font-bold">7 completados</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Miembro desde:</span>
                  <span className="font-bold">Feb 2024</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/30">
                <div className="text-center">
                  <div className="text-2xl font-bold">4.8/5</div>
                  <div className="text-sm text-purple-200">Valoración promedio</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
          <p>Sistema de perfil completo con edición en tiempo real ✅</p>
          <p className="mt-1">Próximo paso: Búsqueda y filtros de actividades</p>
        </div>
      </div>
    </div>
  )
}
