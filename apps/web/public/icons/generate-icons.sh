#!/bin/bash
# Script para generar iconos PWA simples

# Icono base en SVG (un reloj/tiempo - tema ZeitKonto)
cat > /tmp/icon.svg << 'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="256" fill="#3b82f6"/>
  <circle cx="256" cy="256" r="180" fill="white"/>
  <circle cx="256" cy="256" r="160" fill="#3b82f6" stroke="white" stroke-width="8"/>
  <path d="M256 120v136l80 80" stroke="white" stroke-width="24" stroke-linecap="round" fill="none"/>
  <circle cx="256" cy="256" r="24" fill="white"/>
</svg>
SVG

# Tamaños para iconos PWA
sizes=(72 96 128 144 152 192 384 512)

echo "🎨 Generando iconos PWA..."
for size in "${sizes[@]}"; do
  # Convertir SVG a PNG (usando convert si está disponible, si no crear placeholder)
  if command -v convert &> /dev/null; then
    convert -background none -resize ${size}x${size} /tmp/icon.svg public/icons/icon-${size}x${size}.png
    echo "✅ Icono ${size}x${size} generado"
  else
    # Crear placeholder simple
    echo "Icono PWA ${size}px - ZeitKonto Hannover" > public/icons/icon-${size}x${size}.png
    echo "⚠️  Placeholder ${size}x${size} (instala ImageMagick para iconos reales)"
  fi
done

echo "🎯 Iconos PWA listos en public/icons/"
