declare module 'next-auth/react'
declare module 'next/server'
declare module 'next/link'
declare module 'next/image'
declare module 'next/navigation'
declare module 'react-hot-toast'
declare module '@prisma/client'
declare module 'bcryptjs'

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string
      email: string
      name?: string | null
      role?: Role
    }
  }
}

declare module 'next-auth/next' {
  import type { NextAuthOptions } from 'next-auth'
  import type { Session } from 'next-auth'
  export function getServerSession(options: NextAuthOptions): Promise<Session | null>
}

declare module 'react' {
  type SetStateAction<S> = S | ((prevState: S) => S)
  type Dispatch<A> = (value: A) => void

  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
  }

  function useState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>];
  function useState<T = undefined>(): [T | undefined, Dispatch<SetStateAction<T | undefined>>];
}

// Add JSX namespace for intrinsic elements
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Add React namespace with proper types
declare namespace React {
  interface ReactNode {
    [key: string]: any;
  }
} 