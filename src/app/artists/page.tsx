import { prisma } from '@/lib/prisma'

export default async function ArtistsPage() {
  const artists = await prisma.artist.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <div key={artist.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{artist.name}</h2>
            {artist.bio && <p className="text-gray-600">{artist.bio}</p>}
          </div>
        ))}
      </div>
    </div>
  )
} 