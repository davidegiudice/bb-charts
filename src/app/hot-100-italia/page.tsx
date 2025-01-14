import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import ChartRow from '@/components/ChartRow'

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
        <div className="chart-header">
          <div className="w-16 text-center">Posizione</div>
          <div className="flex-1 ml-24">Brano</div>
          <div className="w-28 text-center">Settimana Precedente</div>
          <div className="w-36 text-center">Settimane in classifica</div>
        </div>

        <div>
          {charts.map((chart) => (
            <ChartRow
              key={chart.id}
              rank={chart.rank}
              title={chart.title}
              artist={chart.artist}
              imageUrl={chart.imageUrl}
              lastWeek={chart.lastPosition}
              peakPosition={chart.peakPosition || chart.rank}
              weeksOnChart={chart.weeksOnChart}
              isNew={!chart.lastPosition}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 