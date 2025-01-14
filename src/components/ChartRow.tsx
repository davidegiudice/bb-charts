'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ChartRowProps } from '@/types'

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

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="flex items-center px-6 py-4 hover:bg-billboard-lightGray transition-colors duration-200">
      <div className="w-16 text-3xl font-bold font-display text-billboard-darkGray">{rank}</div>
      <div className="flex-1 flex items-center">
        <div className="relative w-[60px] h-[60px] mr-4">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={`${title} by ${artist}`}
              width={60}
              height={60}
              className="rounded-lg object-cover"
              onError={handleImageError}
              priority={rank <= 10}
            />
          ) : (
            <div className="w-full h-full bg-billboard-lightGray rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-billboard-darkGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="font-bold text-lg font-display text-billboard-black">{title}</div>
          <div className="text-billboard-darkGray">{artist}</div>
        </div>
      </div>
      <div className="w-24 text-center font-display">
        {isNew ? (
          <span className="bg-billboard-red text-white px-2 py-1 rounded text-sm font-bold">
            NEW
          </span>
        ) : (
          <div className="flex items-center justify-center gap-1">
            <span>{lastWeek || '-'}</span>
            {lastWeek && lastWeek < rank && (
              <span className="text-red-500">↓</span>
            )}
            {lastWeek && lastWeek > rank && (
              <span className="text-green-500">↑</span>
            )}
          </div>
        )}
      </div>
      <div className="w-24 text-center font-display">{peakPosition}</div>
      <div className="w-24 text-center font-display">{weeksOnChart}</div>
    </div>
  )
} 