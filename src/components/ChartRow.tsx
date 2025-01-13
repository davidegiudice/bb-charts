'use client'

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
    <div className="flex items-center px-4 py-3 hover:bg-gray-50 border-b border-gray-200 group">
      <div className="w-16 text-3xl font-bold text-center">{rank}</div>
      
      <div className="flex flex-1 items-center">
        <div className="w-20 h-20 relative mr-4 bg-gray-100">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={`${title} cover`}
              fill
              className="object-cover"
              sizes="80px"
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

      <div className="w-28 text-center">
        {lastPosition ? (
          <span className="inline-flex items-center">
            {lastPosition < rank ? (
              <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
            ) : lastPosition > rank ? (
              <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
            ) : null}
            {lastPosition}
          </span>
        ) : (
          'NEW'
        )}
      </div>

      <div className="w-36 text-center">{weeksOnChart}</div>
    </div>
  )
} 