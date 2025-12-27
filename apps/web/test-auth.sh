#!/bin/bash
echo "🧪 PRUEBA DE AUTENTICACIÓN"
echo "=========================="
echo ""

# Verificar que el cliente funciona
echo "1. Probando cliente Supabase..."
node -e "
const { createClient } = require('./lib/supabase/client');
const client = createClient();

console.log('✅ Cliente creado');

// Probar métodos esenciales
console.log('🔍 Probando getSession...');
client.auth.getSession().then(result => {
  console.log('✅ getSession funciona:', result.data ? 'Sí' : 'No');
}).catch(err => {
  console.log('❌ getSession error:', err.message);
});

console.log('👤 Probando getUser...');
client.auth.getUser().then(result => {
  console.log('✅ getUser funciona:', result.data?.user?.email || 'No user');
}).catch(err => {
  console.log('❌ getUser error:', err.message);
});

console.log('🔐 Probando signInWithPassword...');
client.auth.signInWithPassword({ email: 'test@test.com', password: 'test' })
  .then(result => {
    console.log('✅ signInWithPassword funciona:', result.data?.user?.email || 'No user');
  })
  .catch(err => {
    console.log('❌ signInWithPassword error:', err.message);
  });
"

echo ""
echo "2. Instrucciones para probar en iPhone:"
echo "   - Cierra y reabre la app PWA"
echo "   - Ve a Login"
echo "   - Usa: demo@zeitkonto.de / demo123"
echo "   - Debería redirigir a Dashboard"
echo ""
echo "3. Si aún falla:"
echo "   - En iPhone, Safari → Ajustes → Borrar historial y datos"
echo "   - Reinstala la app PWA"
