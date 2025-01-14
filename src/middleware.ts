import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import type { NextRequest } from 'next/server'

export default withAuth(
  async function middleware(
    req: NextRequest & { nextauth: { token: { role?: string } } }
  ) {
    const token = req.nextauth?.token

    if (token?.role !== 'ADMIN' && token?.role !== 'EDITOR') {
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