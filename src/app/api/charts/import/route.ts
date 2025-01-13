import { NextResponse } from 'next/server'
import { parseStringPromise } from 'xml2js'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { ChartType } from '@prisma/client'

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
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const weekDate = formData.get('weekDate') as string
    const chartType = formData.get('chartType') as ChartType

    if (!file || !weekDate || !chartType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Read XML file
    const xmlText = await file.text()
    const result = await parseStringPromise(xmlText)
    
    if (!result.chart_feed?.chart?.[0]?.items?.[0]?.item) {
      return NextResponse.json({ error: 'Invalid XML format' }, { status: 400 })
    }

    const items = result.chart_feed.chart[0].items[0].item as ChartItem[]

    // Transform XML data to chart entries
    const data = items.map((item) => {
      if (!item.title?.[0] || !item.artist_name?.[0]) {
        throw new Error('Missing required fields')
      }

      return {
        weekDate: new Date(weekDate),
        chartType,
        rank: parseInt(item.rank[0]),
        peakRank: parseInt(item.peak_rank[0]),
        weeksOnChart: parseInt(item.weeks_on_chart[0]),
        title: item.title[0].trim(),
        artist: item.artist_name[0].trim(),
        label: item.label?.[0]?.trim() || null,
        distributor: item.imprint?.[0]?.trim() || null,
      }
    })

    await prisma.$transaction(async (tx) => {
      // Delete existing entries for this week and chart type
      await tx.chart.deleteMany({
        where: {
          weekDate: new Date(weekDate),
          chartType,
        },
      })

      // Insert new entries
      await tx.chart.createMany({ data })
    })

    return NextResponse.json({ 
      success: true,
      message: `Imported ${data.length} entries successfully`
    })

  } catch (error) {
    console.error('Chart import error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process file' },
      { status: 500 }
    )
  }
} 