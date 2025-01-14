import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'
import Providers from '@/components/Providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Billboard Italia',
  description: 'Billboard Charts Italia - Official Music Charts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>
        <Providers>
          <header className="bg-black py-4">
            <div className="max-w-7xl mx-auto px-4">
              <Image 
                src="/billboard-logo.png" 
                alt="Billboard Italia" 
                width={120}
                height={32}
                className="h-8 mx-auto w-auto"
                priority
              />
            </div>
          </header>
          <nav className="border-b">
            <div className="max-w-7xl mx-auto px-4">
              <ul className="flex space-x-8 py-4">
                <li>
                  <Link href="/hot-100-italia" className="nav-link">
                    HOT 100 ITALIA
                  </Link>
                </li>
                <li>
                  <Link href="/album-top-100" className="nav-link">
                    ALBUM TOP 100
                  </Link>
                </li>
                <li>
                  <Link href="/vinyl-top-20" className="nav-link">
                    VINYL TOP 20
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  )
} 