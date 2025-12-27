#!/bin/bash
echo "➕ Agregando acceso a Intercambios en Dashboard..."

# Buscar la sección de "Acciones Rápidas" en dashboard/page.tsx
# y agregar una cuarta opción para Intercambios

# Crear backup primero
cp app/dashboard/page.tsx app/dashboard/page.tsx.backup

# Usar sed para insertar después del tercer Link en Acciones Rápidas
# (Esto es un poco complejo, mejor hagámoslo manualmente)

cat > /tmp/dashboard-fix.txt << 'DASHBOARD'
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  href="/offer"
                  className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition">📢</div>
                  <div className="font-medium text-blue-700">Ofrecer ayuda</div>
                  <div className="text-sm text-blue-600 mt-1">Comparte tus habilidades</div>
                </Link>
                
                <Link 
                  href="/search"
                  className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition">🔍</div>
                  <div className="font-medium text-green-700">Buscar ayuda</div>
                  <div className="text-sm text-green-600 mt-1">Encuentra servicios</div>
                </Link>
                
                <Link 
                  href="/exchanges"
                  className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition">🔄</div>
                  <div className="font-medium text-purple-700">Mis intercambios</div>
                  <div className="text-sm text-purple-600 mt-1">Gestiona activos</div>
                </Link>
              </div>
DASHBOARD

echo "✅ Script preparado. Necesitas editar manualmente:"
echo "   Archivo: app/dashboard/page.tsx"
echo "   Busca: 'Acciones Rápidas' y reemplaza el grid de 3 columnas"
echo ""
echo "O ejecuta este comando para reemplazar automáticamente:"
echo "cp /tmp/dashboard-fix.txt app/dashboard/page.tsx"
