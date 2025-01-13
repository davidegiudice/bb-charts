import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { parseStringPromise } from 'xml2js'

interface ChartItem {
  rank: string[]
  peak_rank: string[]
  weeks_on_chart: string[]
  title: string[]
  artist_name: string[]
  imprint: string[]
  label: string[]
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const weekDate = formData.get('weekDate') as string
    const chartType = formData.get('chartType') as string

    // Read XML file
    const xmlText = await file.text()
    const result = await parseStringPromise(xmlText)
    
    if (!result.chart_feed?.chart?.[0]?.items?.[0]?.item) {
      return NextResponse.json({ error: 'Invalid XML format' }, { status: 400 })
    }

    const items = result.chart_feed.chart[0].items[0].item as ChartItem[]

    // Begin transaction
    await prisma.$transaction(async (tx) => {
      // Delete existing entries for this week and chart type
      await tx.chart.deleteMany({
        where: {
          weekDate: new Date(weekDate),
          chartType: chartType as any,
        },
      })

      // Insert new entries
      await tx.chart.createMany({
        data: items.map((item) => ({
          weekDate: new Date(weekDate),
          chartType: chartType as any,
          rank: parseInt(item.rank[0]),
          peakRank: parseInt(item.peak_rank[0]),
          weeksOnChart: parseInt(item.weeks_on_chart[0]),
          title: item.title[0].trim(),
          artist: item.artist_name[0].trim(),
          label: item.label?.[0]?.trim() || null,
          distributor: item.imprint?.[0]?.trim() || null,
        })),
      })
    })

    return NextResponse.json({ 
      success: true,
      message: `Imported ${items.length} entries successfully`
    })
  } catch (error) {
    console.error('Error uploading chart:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process file' },
      { status: 500 }
    )
  }
} 