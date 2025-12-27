#!/bin/bash
echo "🔍 VERIFICACIÓN PWA COMPLETA"
echo "============================"
echo ""

echo "1. 📦 Dependencias:"
npm list next-pwa --depth=0 2>/dev/null | grep next-pwa && echo "✅ next-pwa instalado" || echo "❌ next-pwa no instalado"
echo ""

echo "2. ⚙️ Configuración:"
if [ -f "next.config.js" ]; then
  grep -q "next-pwa" next.config.js && echo "✅ next.config.js configurado para PWA" || echo "❌ next.config.js sin PWA"
else
  echo "❌ No existe next.config.js"
fi
echo ""

echo "3. 📄 Manifest:"
if [ -f "public/manifest.json" ]; then
  echo "✅ Manifest existe"
  grep -o '"name":.*' public/manifest.json | head -1
else
  echo "❌ No existe manifest.json"
fi
echo ""

echo "4. 🎨 Iconos:"
if ls public/icons/icon-*.png 2>/dev/null | head -1 > /dev/null; then
  echo "✅ Iconos encontrados:"
  ls public/icons/icon-*.png | head -3
else
  echo "⚠️  Iconos no encontrados o usando placeholders"
fi
echo ""

echo "5. 🚀 Servidor desarrollo:"
if curl -s http://localhost:3000 > /dev/null; then
  echo "✅ Servidor activo en puerto 3000"
  echo ""
  echo "📱 URLs para probar PWA:"
  echo "   • http://localhost:3000 (Principal)"
  echo "   • http://localhost:3000/pwa-install (Instalación)"
  echo "   • http://localhost:3000/test-pwa (Pruebas)"
  echo ""
  echo "💡 Para probar PWA en móvil:"
  echo "   1. Accede desde tu móvil a la IP mostrada arriba"
  echo "   2. En Chrome/Edge: Menú → 'Instalar app'"
  echo "   3. En Safari: Compartir → 'Añadir a pantalla de inicio'"
else
  echo "❌ Servidor no activo. Ejecuta: npm run dev"
fi
