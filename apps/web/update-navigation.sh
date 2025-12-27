#!/bin/bash
echo "🔄 Actualizando navegación para incluir intercambios..."

# Buscar y reemplazar en BottomNavigation.tsx
sed -i 's/"Dashboard",/"Intercambios",/g' components/layout/BottomNavigation.tsx
sed -i 's|href: .dashboard.|href: .exchanges.|g' components/layout/BottomNavigation.tsx
sed -i "s|ClockIcon|ArrowPathIcon|g" components/layout/BottomNavigation.tsx
sed -i "s|ClockIconSolid|ArrowPathIconSolid|g" components/layout/BottomNavigation.tsx

echo "✅ Navegación actualizada"
echo "📱 Ahora el segundo ícono en la barra inferior llevará a Intercambios"
