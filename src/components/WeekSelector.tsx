'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { formatDate } from '@/lib/utils'

type Props = {
  weeks: Date[]
  selectedWeek?: string
}

export default function WeekSelector({ weeks, selectedWeek }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleWeekChange = (weekDate: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (weekDate) {
      params.set('weekDate', weekDate)
    } else {
      params.delete('weekDate')
    }
    params.delete('page')
    router.push(`/charts?${params.toString()}`)
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Select Week</h2>
      <div className="flex flex-wrap gap-2">
        {weeks.map((week) => {
          const dateStr = week.toISOString().split('T')[0]
          const isSelected = dateStr === selectedWeek
          
          return (
            <button
              key={dateStr}
              onClick={() => handleWeekChange(dateStr)}
              className={`px-4 py-2 rounded-md border ${
                isSelected 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {formatDate(week)}
            </button>
          )
        })}
      </div>
    </div>
  )
} 