import { Chart } from '@prisma/client'

// React types
import type { ChangeEvent, FormEvent } from 'react'

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

// Add React component types
declare global {
  namespace React {
    interface FC<P = {}> {
      (props: P & { children?: ReactNode }, context?: any): ReactElement<any, any> | null
    }
  }
} 