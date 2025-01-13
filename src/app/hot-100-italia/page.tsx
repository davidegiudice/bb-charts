import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

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
            Week of {formatDate(weekDate)}
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-billboard-red text-white px-6 py-3 flex items-center text-sm font-bold">
          <div className="w-16">THIS WEEK</div>
          <div className="flex-1">TITLE & ARTIST</div>
          <div className="w-24 text-center">LAST WEEK</div>
          <div className="w-24 text-center">PEAK POS.</div>
          <div className="w-24 text-center">WKS ON CHART</div>
        </div>

        <div className="divide-y divide-gray-200">
          {charts.map((chart) => (
            <div key={chart.id} className="flex items-center px-6 py-4 hover:bg-gray-50">
              <div className="w-16 text-2xl font-bold">{chart.rank}</div>
              <div className="flex-1">
                <div className="font-bold">{chart.title}</div>
                <div className="text-gray-600">{chart.artist}</div>
              </div>
              <div className="w-24 text-center">{chart.lastPosition || '-'}</div>
              <div className="w-24 text-center">{chart.peakRank}</div>
              <div className="w-24 text-center">{chart.weeksOnChart}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 