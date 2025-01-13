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
        <div className="bg-[#1e3a8a] text-white px-4 py-3 flex items-center text-sm font-bold">
          <div className="w-20 text-center">Posizione</div>
          <div className="flex-1 ml-24">Brano</div>
          <div className="w-28 text-center">Settimana Precedente</div>
          <div className="w-36 text-center">Settimane in classifica</div>
        </div>

        <div>
          {charts.map((chart) => (
            <div 
              key={chart.id} 
              className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-200 group"
            >
              <div className="w-20 text-center">
                <span className="text-3xl font-bold">{chart.rank}</span>
              </div>
              
              <div className="flex flex-1 items-center">
                <div className="w-20 h-20 relative mr-4 overflow-hidden">
                  <Image
                    src={chart.imageUrl || '/api/placeholder'}
                    alt={`${chart.title} cover`}
                    fill
                    className="object-cover"
                    sizes="80px"
                    unoptimized={!chart.imageUrl}
                  />
                </div>
                <div>
                  <div className="font-bold text-lg group-hover:text-blue-600">
                    {chart.title}
                  </div>
                  <div className="text-gray-600">{chart.artist}</div>
                </div>
              </div>

              <div className="w-28 text-center">
                {chart.lastPosition ? (
                  <span className="inline-flex items-center">
                    {chart.lastPosition < chart.rank && (
                      <svg className="w-4 h-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                    {chart.lastPosition > chart.rank && (
                      <svg className="w-4 h-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    )}
                    {chart.lastPosition}
                  </span>
                ) : (
                  'NEW'
                )}
              </div>

              <div className="w-36 text-center">{chart.weeksOnChart}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 