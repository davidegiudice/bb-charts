'use client'

import { useEffect, useState } from 'react'
import Loading from './Loading'

interface WeeksLoaderProps {
  children: (weeks: string[]) => React.ReactNode
}

export default function WeeksLoader({ children }: WeeksLoaderProps) {
  const [weeks, setWeeks] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWeeks() {
      try {
        const response = await fetch('/api/charts/weeks')
        const data = await response.json()
        setWeeks(data.weeks)
      } catch (error) {
        console.error('Failed to load weeks:', error)
      } finally {
        setLoading(false)
      }
    }

    loadWeeks()
  }, [])

  if (loading) {
    return <Loading />
  }

  return <>{children(weeks)}</>
} 