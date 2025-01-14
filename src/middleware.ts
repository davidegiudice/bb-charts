import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(request: NextRequest) {
    const token = request.nextauth.token
    const isAdmin = token?.role === 'ADMIN'
    const isEditor = token?.role === 'EDITOR'

    if (!isAdmin && !isEditor) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/editor/:path*'],
} 