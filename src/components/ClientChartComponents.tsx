'use client'

import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import ChartFilters from './ChartFilters'

type Props = {
  searchParams: {
    page?: string
    chartType?: string
    weekDate?: string
    genre?: string
  }
  children: React.ReactNode
}

export default function ClientChartComponents({ children, searchParams }: Props) {
  const { data: session } = useSession()
  const params = useSearchParams()

  return (
    <>
      {children}
      <ChartFilters />
    </>
  )
} 