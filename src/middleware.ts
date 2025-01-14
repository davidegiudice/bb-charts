import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import type { NextRequest } from 'next/server'

// Create a local type that includes nextauth.token
type AuthRequest = NextRequest & {
  nextauth?: {
    token?: {
      role?: string
    }
  }
}

export default withAuth(
  async function middleware(req: AuthRequest) {
    const token = req.nextauth?.token

    if (token?.role !== 'ADMIN' && token?.role !== 'EDITOR') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Basic check that token exists
        return !!token
      }
    }
  }
)

export const config = {
  matcher: ['/admin/:path*', '/editor/:path*'],
} 