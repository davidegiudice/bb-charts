'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface WeekSelectorProps {
  weeks: string[]
  selectedWeek?: string
}

export default function WeekSelector({ weeks, selectedWeek }: WeekSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleWeekChange = (week: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('weekDate', week)
    router.push(`?${params.toString()}`)
  }

  return (
    <select
      value={selectedWeek || weeks[0]}
      onChange={(e) => handleWeekChange(e.target.value)}
      className="block w-full rounded-md border-gray-300 shadow-sm p-2"
    >
      {weeks.map((week) => (
        <option key={week} value={week}>
          Week of {new Date(week).toLocaleDateString()}
        </option>
      ))}
    </select>
  )
} 