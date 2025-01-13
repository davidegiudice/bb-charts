'use client'

import { Suspense } from 'react'
import WeekSelector from '@/components/WeekSelector'
import WeeksLoader from '@/components/WeeksLoader'
import Loading from '@/components/Loading'

interface PageProps {
  searchParams: { weekDate?: string }
}

export default function ChartsPage({ searchParams }: PageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Charts</h1>
        <div className="w-64">
          <WeeksLoader>
            {(weeks) => (
              <WeekSelector 
                weeks={weeks} 
                selectedWeek={searchParams.weekDate} 
              />
            )}
          </WeeksLoader>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        {/* Chart content here */}
      </Suspense>
    </div>
  )
} 