'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'ADMIN'

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link href="/charts" className="nav-link flex items-center">
              Charts
            </Link>
            <Link href="/artists" className="nav-link flex items-center">
              Artists
            </Link>
            {isAdmin && (
              <>
                <Link href="/admin/charts" className="nav-link flex items-center">
                  Manage Charts
                </Link>
                <Link href="/admin/users" className="nav-link flex items-center">
                  Users
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 