'use client'

import { useRouter } from 'next/navigation'
import { ChartType, Genre } from '@prisma/client'

export default function ChartFilters() {
  const router = useRouter()

  const handleFilterChange = (key: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
    router.push(`/charts?${searchParams.toString()}`)
  }

  return (
    <div className="flex gap-4 mb-6">
      <select
        onChange={(e) => handleFilterChange('chartType', e.target.value)}
        className="form-select"
      >
        <option value="">All Chart Types</option>
        {Object.values(ChartType).map((type) => (
          <option key={type} value={type}>
            {type.replace('_', ' ')}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => handleFilterChange('genre', e.target.value)}
        className="form-select"
      >
        <option value="">All Genres</option>
        {Object.values(Genre).map((genre) => (
          <option key={genre} value={genre}>
            {genre.replace('_', ' ')}
          </option>
        ))}
      </select>
    </div>
  )
} 