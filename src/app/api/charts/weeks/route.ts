import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const weeks = await prisma.chart.findMany({
      select: { weekDate: true },
      distinct: ['weekDate'],
      orderBy: { weekDate: 'desc' }
    })

    return NextResponse.json({
      weeks: weeks.map(w => w.weekDate.toISOString().split('T')[0])
    })
  } catch (error) {
    console.error('Error fetching weeks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weeks' },
      { status: 500 }
    )
  }
} 