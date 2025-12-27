/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production'

let nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configuración para desarrollo
  experimental: {
    turbo: undefined, // Evitar conflictos
  }
}

// Aplicar PWA SOLO en producción
if (isProduction) {
  console.log('🔧 Configurando PWA para producción...')
  const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: false, // Habilitado en producción
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 24 * 60 * 60, // 24 horas
          },
        },
      },
    ],
  })
  module.exports = withPWA(nextConfig)
} else {
  console.log('🔧 Modo desarrollo - PWA deshabilitado')
  module.exports = nextConfig
}
