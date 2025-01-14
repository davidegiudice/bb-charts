'use client'

import { Suspense } from 'react'
import WeekSelector from '@/components/WeekSelector'
import WeeksLoader from '@/components/WeeksLoader'
import Loading from '@/components/Loading'

const CHART_TYPES = [
  { id: 'hot100', name: 'Hot 100 Italia' },
  { id: 'album100', name: 'Album Top 100 Italia' },
  { id: 'vinyl20', name: 'Vinyl Top 20 Italia' },
  { id: 'rock50', name: 'Top 50 Rock' },
  { id: 'dance50', name: 'Top 50 Electronic & Dance' },
  { id: 'hiphop50', name: 'Top 50 Hip-Hop' },
]

interface PageProps {
  searchParams: { 
    weekDate?: string
    chartType?: string 
  }
}

function formatDateToItalian(date: Date): string {
  return new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default function ChartsPage({ searchParams }: PageProps) {
  const weekDate = searchParams.weekDate ? new Date(searchParams.weekDate) : new Date()
  const formattedDate = formatDateToItalian(weekDate)
  const selectedChart = CHART_TYPES.find(c => c.id === searchParams.chartType) || CHART_TYPES[0]

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <h1 className="chart-header-title">{selectedChart.name}</h1>
          <div className="chart-header-date">
            Settimana del {formattedDate}
          </div>
        </div>
        
        <div className="flex gap-4">
          <select 
            className="bg-white text-black px-4 py-2 rounded"
            value={searchParams.chartType || CHART_TYPES[0].id}
            onChange={(e) => {
              const url = new URL(window.location.href)
              url.searchParams.set('chartType', e.target.value)
              window.location.href = url.toString()
            }}
          >
            {CHART_TYPES.map(chart => (
              <option key={chart.id} value={chart.id}>
                {chart.name}
              </option>
            ))}
          </select>

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

      <div className="chart-column-headers">
        <div className="px-6 py-3 bg-gray-100 flex">
          <div className="w-24">Posizione</div>
          <div className="flex-1">Brano</div>
          <div className="chart-stats">
            <div className="w-20 text-center">Precedente</div>
            <div className="w-20 text-center">Picco</div>
            <div className="w-20 text-center">Settimane</div>
          </div>
        </div>
      </div>

      <Suspense fallback={<Loading />}>
        {/* Chart content will be loaded here */}
      </Suspense>
    </div>
  )
} 