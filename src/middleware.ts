import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import type { NextRequest } from 'next/server'

export default withAuth(
  function middleware(req: NextRequest & { nextauth: { token: any } }) {
    const token = req.nextauth?.token
    const isAdmin = token?.role === 'ADMIN'
    const isEditor = token?.role === 'EDITOR'

    if (!isAdmin && !isEditor) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: ['/admin/:path*', '/editor/:path*'],
} 