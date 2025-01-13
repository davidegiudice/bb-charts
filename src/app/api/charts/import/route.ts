import { NextResponse } from 'next/server'
import { read, utils } from 'xlsx'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const weekDate = formData.get('weekDate') as string
    const chartType = formData.get('chartType') as string

    if (!file || !weekDate || !chartType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const buffer = await file.arrayBuffer()
    const workbook = read(buffer)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = utils.sheet_to_json(worksheet)

    // Validate data structure
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'Invalid file format' }, { status: 400 })
    }

    // Process and insert data
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
        data: data.map((row: any, index) => ({
          weekDate: new Date(weekDate),
          chartType: chartType as any,
          rank: index + 1,
          title: row.TITOLO,
          artist: row.ARTISTA,
          label: row.ETICHETTA,
          distributor: row.DISTRIBUTORE,
        })),
      })
    })

    return NextResponse.json({ 
      success: true,
      message: `Imported ${data.length} entries successfully`
    })

  } catch (error) {
    console.error('Chart import error:', error)
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    )
  }
} 