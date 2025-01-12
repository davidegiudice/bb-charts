declare module 'next-auth/middleware' {
  import type { NextMiddleware } from 'next/server'
  export function withAuth(middleware?: NextMiddleware): NextMiddleware
}

declare module '@auth/prisma-adapter' {
  import type { Adapter } from 'next-auth/adapters'
  import type { PrismaClient } from '@prisma/client'
  export function PrismaAdapter(prisma: PrismaClient): Adapter
} 