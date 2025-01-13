'use client'

import Image from 'next/image'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

interface ChartRowProps {
  rank: number
  title: string
  artist: string
  imageUrl: string | null
  lastPosition: number | null
  weeksOnChart: number
}

export default function ChartRow({
  rank,
  title,
  artist,
  imageUrl,
  lastPosition,
  weeksOnChart
}: ChartRowProps) {
  return (
    <div className="chart-row">
      <div className="rank-cell">{rank}</div>
      
      <div className="title-cell">
        <div className="w-20 h-20 relative mr-4 bg-gray-100">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`${title} cover`}
              fill
              className="object-cover"
              sizes="80px"
              priority={rank <= 10}
            />
          )}
        </div>
        <div>
          <div className="font-bold text-lg group-hover:text-blue-600">
            {title}
          </div>
          <div className="text-gray-600">{artist}</div>
        </div>
      </div>

      <div className="movement-cell">
        {lastPosition ? (
          <span className="inline-flex items-center">
            {lastPosition < rank && (
              <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
            )}
            {lastPosition > rank && (
              <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
            )}
            {lastPosition}
          </span>
        ) : (
          <span className="text-green-500 font-medium">NEW</span>
        )}
      </div>

      <div className="weeks-cell">{weeksOnChart}</div>
    </div>
  )
} 