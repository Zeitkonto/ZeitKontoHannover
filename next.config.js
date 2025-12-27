/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production'

let nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

// Solo aplicar PWA en producción para evitar conflictos
if (isProduction) {
  const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
  })
  nextConfig = withPWA(nextConfig)
}

module.exports = nextConfig
