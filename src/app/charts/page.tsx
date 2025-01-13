'use client'

import { Suspense } from 'react'
import { ChartType, Genre } from '@prisma/client'
import Layout from '@/components/Layout'
import ChartFilters from '@/components/ChartFilters'
import Loading from '@/components/Loading'
import WeekSelector from '@/components/WeekSelector'
import { useSession } from 'next-auth/react'

type Props = {
  searchParams: {
    page?: string
    chartType?: string
    weekDate?: string
    genre?: string
  }
}

export default function ChartsPage({ searchParams }: Props) {
  const { data: session } = useSession()

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Charts</h1>
        
        <Suspense fallback={<Loading />}>
          <WeeksLoader>
            {(weeks) => (
              <WeekSelector 
                weeks={weeks} 
                selectedWeek={searchParams.weekDate} 
              />
            )}
          </WeeksLoader>
        </Suspense>

        <ChartFilters />

        <Suspense fallback={<Loading />}>
          <ChartsList searchParams={searchParams} />
        </Suspense>
      </div>
    </Layout>
  )
} 