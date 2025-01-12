import 'next-auth'
import { DefaultSession } from 'next-auth'
import { Role } from '@prisma/client'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name?: string | null
    role: Role
  }

  interface Session extends DefaultSession {
    user: User & DefaultSession['user']
  }
} 