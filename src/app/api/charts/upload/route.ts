import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import * as XLSX from 'xlsx'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const weekDate = formData.get('weekDate') as string
    const chartType = formData.get('chartType') as string

    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer)
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const data = XLSX.utils.sheet_to_json(worksheet)

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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error uploading chart:', error)
    return NextResponse.json({ error: 'Failed to process file' }, { status: 500 })
  }
} 