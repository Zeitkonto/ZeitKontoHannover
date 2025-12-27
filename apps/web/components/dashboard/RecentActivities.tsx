'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Activity {
  id: string
  title: string
  type: 'offer' | 'request'
  category: string
  hours: number
  user: string
  date: string
  status: 'active' | 'completed' | 'pending'
}

export default function RecentActivities() {
  const [activities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Clases de español básico',
      type: 'offer',
      category: 'Idiomas',
      hours: 2,
      user: 'María G.',
      date: 'Hoy',
      status: 'active'
    },
    {
      id: '2',
      title: 'Ayuda con jardinería',
      type: 'request',
      category: 'Jardinería',
      hours: 3,
      user: 'Carlos M.',
      date: 'Ayer',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Reparación de bicicleta',
      type: 'offer',
      category: 'Reparaciones',
      hours: 1.5,
      user: 'Ana S.',
      date: '15 Mar',
      status: 'completed'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'offer' ? '📢' : '🔍'
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Actividades Recientes</h2>
        <Link 
          href="/activities" 
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Ver todas →
        </Link>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            <div className="mr-4 text-2xl">
              {getTypeIcon(activity.type)}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{activity.title}</h3>
                  <div className="flex items-center mt-1 space-x-3 text-sm text-gray-500">
                    <span>{activity.category}</span>
                    <span>•</span>
                    <span>{activity.hours} horas</span>
                    <span>•</span>
                    <span>{activity.user}</span>
                  </div>
                </div>
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status === 'active' ? 'Activa' : 
                   activity.status === 'pending' ? 'Pendiente' : 'Completada'}
                </span>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm text-gray-500">{activity.date}</span>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <Link 
          href="/offer"
          className="inline-flex items-center justify-center w-full py-3 px-4 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition"
        >
          <span className="mr-2">➕</span>
          Crear nueva oferta o solicitud
        </Link>
      </div>
    </div>
  )
}
