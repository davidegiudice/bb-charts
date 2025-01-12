import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12">Billboard Italia</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link 
          href="/hot-100-italia"
          className="block group"
        >
          <div className="aspect-square bg-gradient-to-br from-emerald-300 to-sky-300 rounded-lg p-8 flex flex-col justify-center items-center transition-transform group-hover:scale-105">
            <h2 className="text-3xl font-bold text-center">HOT 100</h2>
            <p className="text-xl mt-2">ITALIA</p>
          </div>
        </Link>

        <Link 
          href="/album-top-100"
          className="block group"
        >
          <div className="aspect-square bg-gradient-to-br from-emerald-300 to-sky-300 rounded-lg p-8 flex flex-col justify-center items-center transition-transform group-hover:scale-105">
            <h2 className="text-3xl font-bold text-center">ALBUM TOP 100</h2>
            <p className="text-xl mt-2">ITALIA</p>
          </div>
        </Link>

        <Link 
          href="/vinyl-top-20"
          className="block group"
        >
          <div className="aspect-square bg-gradient-to-br from-emerald-300 to-sky-300 rounded-lg p-8 flex flex-col justify-center items-center transition-transform group-hover:scale-105">
            <h2 className="text-3xl font-bold text-center">VINYL TOP 20</h2>
            <p className="text-xl mt-2">ITALIA</p>
          </div>
        </Link>
      </div>
    </main>
  )
} 