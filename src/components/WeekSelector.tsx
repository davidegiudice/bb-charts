'use client'

import { useRouter } from 'next/navigation'
import { formatDate } from '@/lib/utils'

type Props = {
  weeks: Date[]
  selectedWeek?: string
}

export default function WeekSelector({ weeks, selectedWeek }: Props) {
  const router = useRouter()

  const handleWeekChange = (weekDate: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('weekDate', weekDate)
    router.push(`/charts?${searchParams.toString()}`)
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Week
      </label>
      <select
        value={selectedWeek || ''}
        onChange={(e) => handleWeekChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">All Weeks</option>
        {weeks.map((week) => (
          <option key={week.toISOString()} value={week.toISOString()}>
            {formatDate(week)}
          </option>
        ))}
      </select>
    </div>
  )
} 