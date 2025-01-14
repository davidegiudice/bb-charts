// middleware.ts
import { withAuth } from 'next-auth/middleware'
import type { JWT } from 'next-auth/jwt'

export default withAuth({
  callbacks: {
    authorized({ token }: { token: JWT }) {
      // Only allow ADMIN or EDITOR
      return !!token && (token.role === 'ADMIN' || token.role === 'EDITOR')
    },
  },
})

export const config = {
  matcher: ['/admin/:path*', '/editor/:path*'],
}
