export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pb-16"> {/* Espacio para bottom navigation */}
        {children}
      </div>
    </div>
  )
}
