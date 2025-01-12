import { PropsWithChildren } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
} 