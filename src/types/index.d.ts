import { Chart } from '@prisma/client'

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

// Add React component types
declare global {
  namespace React {
    interface FC<P = {}> {
      (props: P & { children?: ReactNode }, context?: any): ReactElement<any, any> | null
    }
  }
} 