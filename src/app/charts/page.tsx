import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import Layout from '@/components/Layout'
import { formatDate } from '@/lib/utils'
import ChartFilters from '@/components/ChartFilters'
import Loading from '@/components/Loading'
import WeekSelector from '@/components/WeekSelector'
import Pagination from '@/components/Pagination'

type Props = {
  searchParams: {
    page?: string
    chartType?: string
    weekDate?: string
    genre?: string
  }
}

async function getAvailableWeeks() {
  const weeks = await prisma.chart.findMany({
    select: { weekDate: true },
    distinct: ['weekDate'],
    orderBy: { weekDate: 'desc' },
  })
  return weeks.map(w => w.weekDate)
}

async function getCharts(params: Props['searchParams']) {
  const page = Number(params.page) || 1
  const perPage = 50
  const skip = (page - 1) * perPage

  const where = {
    ...(params.chartType && { chartType: params.chartType }),
    ...(params.weekDate && { weekDate: new Date(params.weekDate) }),
    ...(params.genre && { genre: params.genre }),
  }

  const [charts, total] = await Promise.all([
    prisma.chart.findMany({
      where,
      orderBy: [
        { weekDate: 'desc' },
        { rank: 'asc' }
      ],
      skip,
      take: perPage,
    }),
    prisma.chart.count({ where })
  ])

  return {
    charts,
    total,
    pages: Math.ceil(total / perPage)
  }
}

export default async function ChartsPage({ searchParams }: Props) {
  const availableWeeks = await getAvailableWeeks()

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Charts</h1>
        
        <WeekSelector weeks={availableWeeks} selectedWeek={searchParams.weekDate} />
        <ChartFilters />

        <Suspense fallback={<Loading />}>
          <ChartsList searchParams={searchParams} />
        </Suspense>
      </div>
    </Layout>
  )
}

async function ChartsList({ searchParams }: Props) {
  const { charts, total, pages } = await getCharts(searchParams)
  const currentPage = Number(searchParams.page) || 1

  return (
    <div>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Artist
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Label
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Week
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {charts.map((chart) => (
              <tr key={chart.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {chart.rank}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {chart.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {chart.artist}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {chart.label}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(chart.weekDate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={pages} />
    </div>
  )
} 