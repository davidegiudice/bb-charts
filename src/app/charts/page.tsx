'use client'

import { Suspense } from 'react'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import WeeksLoader from '@/components/WeeksLoader'
import ChartsList from '@/components/ChartsList'
import ClientChartComponents from '@/components/ClientChartComponents'

type Props = {
  searchParams: {
    page?: string
    chartType?: string
    weekDate?: string
    genre?: string
  }
}

export default function ChartsPage({ searchParams }: Props) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Charts</h1>
        
        <Suspense fallback={<Loading />}>
          <ClientChartComponents searchParams={searchParams}>
            <WeeksLoader>
              {(weeks) => (
                <WeekSelector 
                  weeks={weeks} 
                  selectedWeek={searchParams.weekDate} 
                />
              )}
            </WeeksLoader>
          </ClientChartComponents>
        </Suspense>

        <Suspense fallback={<Loading />}>
          <ChartsList searchParams={searchParams} />
        </Suspense>
      </div>
    </Layout>
  )
} 