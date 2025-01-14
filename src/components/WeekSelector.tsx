'use client'

import { useRouter } from 'next/navigation'
import Select from 'react-select'

interface WeekSelectorProps {
  weeks: string[]
  selectedWeek?: string
}

export default function WeekSelector({ weeks, selectedWeek }: WeekSelectorProps) {
  return (
    <select
      className="w-full p-2 border rounded"
      value={selectedWeek || weeks[0]}
      onChange={(e) => {
        const url = new URL(window.location.href)
        url.searchParams.set('weekDate', e.target.value)
        window.location.href = url.toString()
      }}
    >
      {weeks.map(week => (
        <option key={week} value={week}>
          {new Intl.DateTimeFormat('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }).format(new Date(week))}
        </option>
      ))}
    </select>
  )
} 