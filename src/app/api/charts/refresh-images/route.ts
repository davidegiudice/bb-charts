import { NextResponse } from 'next/server'
import { getTrackImage } from '@/lib/spotify'
import prisma from '@/lib/prisma'

export async function POST() {
  try {
    // Get all charts that need images
    const charts = await prisma.chart.findMany({
      where: {
        OR: [
          { imageUrl: null },
          { imageUrl: '' }
        ]
      },
      select: {
        id: true,
        title: true,
        artist: true
      }
    })

    // Update images in batches
    for (const chart of charts) {
      const imageUrl = await getTrackImage(chart.title, chart.artist)
      if (imageUrl) {
        await prisma.chart.update({
          where: { id: chart.id },
          data: { imageUrl }
        })
      }
    }

    return NextResponse.json({ message: 'Images refreshed successfully' })
  } catch (error) {
    console.error('Error refreshing images:', error)
    return NextResponse.json(
      { error: 'Failed to refresh images' },
      { status: 500 }
    )
  }
} 