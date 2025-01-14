'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ChartRowProps {
  rank: number
  title: string
  artist: string
  imageUrl: string | null
  lastWeek: number | null
  peakPosition: number
  weeksOnChart: number
  isNew?: boolean
}

export default function ChartRow({
  rank,
  title,
  artist,
  imageUrl,
  lastWeek,
  peakPosition,
  weeksOnChart,
  isNew
}: ChartRowProps) {
  const [imageError, setImageError] = useState(false)
  
  const getMovementIndicator = () => {
    if (isNew) return <span className="movement-new">NUOVO</span>
    if (!lastWeek) return "-"
    if (lastWeek === rank) return "="
    if (lastWeek > rank) return <span className="movement-up">▲</span>
    return <span className="movement-down">▼</span>
  }

  return (
    <div className="chart-row">
      <div className="rank">{rank}</div>
      
      <div className="track-info">
        <Image
          src={imageError ? '/placeholder.jpg' : (imageUrl || '/placeholder.jpg')}
          alt={`${title} by ${artist}`}
          width={80}
          height={80}
          className="artwork"
          onError={() => setImageError(true)}
        />
        
        <div className="track-details">
          <div className="track-title">{title}</div>
          <div className="track-artist">{artist}</div>
        </div>
      </div>

      <div className="chart-stats">
        <div className="movement">
          {getMovementIndicator()}
          <span>{lastWeek || '-'}</span>
        </div>
        <div className="peak-position">
          {peakPosition}
        </div>
        <div className="weeks-on-chart">
          {weeksOnChart}
        </div>
      </div>
    </div>
  )
} 