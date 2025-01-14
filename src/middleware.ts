import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import type { Role } from '@prisma/client'
import type { WithAuthArgs } from 'next-auth/middleware'

export default withAuth(
  function middleware(req: WithAuthArgs) {
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