import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  async function middleware(req: any) {
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