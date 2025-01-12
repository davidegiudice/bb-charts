import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Sidebar() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4">
      <nav className="space-y-2">
        <Link 
          href="/charts"
          className="block px-4 py-2 rounded hover:bg-gray-100"
        >
          Charts
        </Link>
        <Link 
          href="/artists"
          className="block px-4 py-2 rounded hover:bg-gray-100"
        >
          Artists
        </Link>
        {isAdmin && (
          <>
            <Link 
              href="/admin/charts"
              className="block px-4 py-2 rounded hover:bg-gray-100"
            >
              Manage Charts
            </Link>
            <Link 
              href="/admin/users"
              className="block px-4 py-2 rounded hover:bg-gray-100"
            >
              Manage Users
            </Link>
          </>
        )}
      </nav>
    </aside>
  )
} 