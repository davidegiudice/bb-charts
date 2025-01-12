'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { ChartType, Genre } from '@prisma/client'

const CHART_TYPES = ['TOP_100', 'TOP_ALBUM', 'TOP_VINYL', 'TOP_50_GENRE'] as const
const GENRES = ['ITALIAN', 'HIP_HOP', 'ROCK', 'ELECTRONIC_DANCE'] as const

export default function ChartFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset pagination when filters change
    router.push(`/charts?${params.toString()}`)
  }

  const showGenreFilter = searchParams.get('chartType') === 'TOP_50_GENRE'

  return (
    <div className="mb-6 space-y-4">
      <div className="flex gap-4">
        <select
          className="rounded-md border-gray-300 shadow-sm p-2"
          onChange={(e) => handleFilterChange('chartType', e.target.value)}
          value={searchParams.get('chartType') || ''}
        >
          <option value="">All Chart Types</option>
          {CHART_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.replace(/_/g, ' ')}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="rounded-md border-gray-300 shadow-sm p-2"
          onChange={(e) => handleFilterChange('weekDate', e.target.value)}
          value={searchParams.get('weekDate') || ''}
        />
      </div>

      {showGenreFilter && (
        <div className="flex gap-4">
          <select
            className="rounded-md border-gray-300 shadow-sm p-2"
            onChange={(e) => handleFilterChange('genre', e.target.value)}
            value={searchParams.get('genre') || ''}
          >
            <option value="">All Genres</option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
} 