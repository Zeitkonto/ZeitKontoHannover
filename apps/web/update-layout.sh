#!/bin/bash
echo "🏗️ Actualizando layout principal..."

# Crear backup
cp app/layout.tsx app/layout.tsx.backup

# Agregar import y componente
sed -i "/import BottomNavigation/a import ExchangeFloatButton from '@/components/layout/ExchangeFloatButton'" app/layout.tsx

# Buscar BottomNavigation y agregar ExchangeFloatButton después
sed -i '/<BottomNavigation \/>/a\        <ExchangeFloatButton \/>' app/layout.tsx

echo "✅ Layout actualizado"
echo "📱 Ahora verás un botón flotante púrpura que dice 'Intercambios'"
