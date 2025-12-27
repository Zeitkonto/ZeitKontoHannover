#!/bin/bash
echo "🔍 Verificando instalación de Tailwind CSS..."
echo ""

echo "1. Versión de Node.js:"
node --version
echo ""

echo "2. Versión de npm:"
npm --version
echo ""

echo "3. Tailwind instalado:"
npm list tailwindcss 2>/dev/null | grep tailwind || echo "❌ No instalado"
echo ""

echo "4. Archivos de configuración:"
ls -la tailwind.config.js postcss.config.js 2>/dev/null || echo "⚠️ Faltan archivos de configuración"
echo ""

echo "5. Permisos de binarios:"
if [ -f "node_modules/.bin/tailwindcss" ]; then
  ls -la node_modules/.bin/tailwindcss
  echo "✅ Binario existe"
else
  echo "❌ Binario no encontrado"
fi
echo ""

echo "6. Probando comando tailwind:"
npx tailwindcss --version 2>&1 || echo "⚠️ Error al ejecutar tailwind"
