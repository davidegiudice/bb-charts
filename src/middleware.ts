// middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ token }) {
      // Only allow ADMIN or EDITOR
      return !!token && (token.role === 'ADMIN' || token.role === 'EDITOR')
    },
  },
})

export const config = {
  matcher: ['/admin/:path*', '/editor/:path*'],
}
