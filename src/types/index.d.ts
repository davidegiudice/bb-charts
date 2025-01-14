import { Chart, User, Role } from '@prisma/client'

// React types
import type { ChangeEvent, FormEvent } from 'react'

export interface ChartData extends Chart {
  id: string
  rank: number
  title: string
  artist: string
  imageUrl: string | null
  lastPosition: number | null
  peakRank: number
  weeksOnChart: number
  chartType: ChartType
  weekDate: Date
}

export interface ChartRowProps {
  rank: number
  title: string
  artist: string
  imageUrl: string | null
  lastWeek: number | null
  peakPosition: number
  weeksOnChart: number
  isNew: boolean
}

export type ChartType = 'TOP_100' | 'TOP_ALBUM' | 'TOP_VINYL' | 'TOP_ROCK' | 'TOP_ELECTRONIC' | 'TOP_HIPHOP'

// Form event types
export type InputChangeEvent = ChangeEvent<HTMLInputElement>
export type SelectChangeEvent = ChangeEvent<HTMLSelectElement>
export type FormSubmitEvent = FormEvent<HTMLFormElement>

// User types
export interface UserData extends User {
  id: string
  email: string
  name: string | null
  role: Role
  createdAt: Date
}

// Add React component types
declare global {
  namespace React {
    interface FC<P = {}> {
      (props: P & { children?: ReactNode }, context?: any): ReactElement<any, any> | null
    }
  }
} 