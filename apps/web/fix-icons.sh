#!/bin/bash
echo "🎨 Actualizando imports de iconos..."

# Agregar nuevos iconos si no existen
if ! grep -q "ArrowPathIcon" components/layout/BottomNavigation.tsx; then
  echo "⚠️  Necesitas actualizar manualmente los imports en BottomNavigation.tsx"
  echo "   Agrega estas líneas al inicio del archivo:"
  echo ""
  echo "   import { ArrowPathIcon } from '@heroicons/react/24/outline'"
  echo "   import { ArrowPathIcon as ArrowPathIconSolid } from '@heroicons/react/24/solid'"
  echo ""
  echo "   Y asegúrate de que ClockIcon/ClockIconSolid estén comentados o eliminados"
fi
