declare module 'next-auth/react'
declare module 'next/server'
declare module 'next/link'
declare module 'next/image'
declare module 'next/navigation'
declare module 'react-hot-toast'
declare module '@prisma/client'
declare module 'bcryptjs'
declare module 'react'

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
  
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
  }

  interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }
} 