import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'

async function getLatestCharts() {
  const latestWeek = await prisma.chart.findFirst({
    where: { chartType: 'TOP_100' },
    select: { weekDate: true },
    orderBy: { weekDate: 'desc' }
  })

  if (!latestWeek) return []

  return prisma.chart.findMany({
    where: {
      chartType: 'TOP_100',
      weekDate: latestWeek.weekDate
    },
    orderBy: { rank: 'asc' }
  })
}

export default async function Hot100Page() {
  const charts = await getLatestCharts()
  const weekDate = charts[0]?.weekDate

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">HOT 100 ITALIA</h1>
        {weekDate && (
          <div className="text-lg">
            Settimana del {formatDate(weekDate)}
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-billboard-red text-white px-6 py-3 flex items-center text-sm font-bold">
          <div className="w-16">Posizione</div>
          <div className="flex-1 pl-24">Brano</div>
          <div className="w-32 text-center">Settimana Precedente</div>
          <div className="w-40 text-center">Settimane in classifica</div>
        </div>

        <div className="divide-y divide-gray-200">
          {charts.map((chart) => (
            <div key={chart.id} className="flex items-center px-6 py-4 hover:bg-gray-50">
              <div className="w-16 text-3xl font-bold">{chart.rank}</div>
              <div className="flex flex-1 items-center">
                <div className="w-20 h-20 relative mr-4">
                  <Image
                    src={chart.imageUrl || '/placeholder-album.png'}
                    alt={`${chart.title} cover`}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <div className="font-bold text-lg">{chart.title}</div>
                  <div className="text-gray-600">{chart.artist}</div>
                </div>
              </div>
              <div className="w-32 text-center">{chart.lastPosition || '-'}</div>
              <div className="w-40 text-center">{chart.weeksOnChart}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 