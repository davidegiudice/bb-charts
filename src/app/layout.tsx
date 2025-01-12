import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <Providers>
          <header className="bg-black py-4">
            <div className="max-w-7xl mx-auto px-4">
              <img 
                src="/billboard-logo.png" 
                alt="Billboard Italia" 
                className="h-8 mx-auto"
              />
            </div>
          </header>
          <nav className="border-b">
            <div className="max-w-7xl mx-auto px-4">
              <ul className="flex space-x-8 py-4">
                <li>
                  <a href="/hot-100-italia" className="hover:text-gray-600">
                    HOT 100 ITALIA
                  </a>
                </li>
                <li>
                  <a href="/album-top-100" className="hover:text-gray-600">
                    ALBUM TOP 100
                  </a>
                </li>
                <li>
                  <a href="/vinyl-top-20" className="hover:text-gray-600">
                    VINYL TOP 20
                  </a>
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