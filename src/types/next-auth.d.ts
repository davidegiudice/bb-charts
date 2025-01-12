import 'next-auth'
import { DefaultSession, DefaultUser } from 'next-auth'
import { Role } from '@prisma/client'

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: Role
  }

  interface Session extends DefaultSession {
    user: User & {
      role: Role
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role
  }
} 