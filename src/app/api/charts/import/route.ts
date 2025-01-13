import { NextResponse } from 'next/server'
import { read, utils } from 'xlsx'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { ChartType } from '@prisma/client'

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

    const buffer = await file.arrayBuffer()
    const workbook = read(buffer)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const rawData = utils.sheet_to_json(worksheet)

    if (!Array.isArray(rawData) || rawData.length === 0) {
      return NextResponse.json({ error: 'Invalid file format' }, { status: 400 })
    }

    // Validate and transform the data
    const data = rawData.map((row: any, index) => {
      if (!row.TITOLO || !row.ARTISTA) {
        throw new Error(`Missing required fields at row ${index + 1}`)
      }

      return {
        weekDate: new Date(weekDate),
        chartType,
        rank: index + 1,
        title: row.TITOLO.trim(),
        artist: row.ARTISTA.trim(),
        label: row.ETICHETTA?.trim() || null,
        distributor: row.DISTRIBUTORE?.trim() || null,
      }
    })

    await prisma.$transaction(async (tx) => {
      await tx.chart.deleteMany({
        where: {
          weekDate: new Date(weekDate),
          chartType,
        },
      })

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