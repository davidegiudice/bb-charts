import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token
    const isAdmin = token?.role === 'ADMIN'
    const isEditor = token?.role === 'EDITOR'

    if (!isAdmin && !isEditor) {
      return NextResponse.redirect(new URL('/login', req.url))
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