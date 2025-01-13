import { prisma } from '@/lib/prisma'

async function getAvailableWeeks() {
  const weeks = await prisma.chart.findMany({
    select: { weekDate: true },
    distinct: ['weekDate'],
    orderBy: { weekDate: 'desc' },
  })
  return weeks.map(w => w.weekDate)
}

export default async function WeeksLoader({ 
  children 
}: { 
  children: (weeks: Date[]) => React.ReactNode 
}) {
  const weeks = await getAvailableWeeks()
  return children(weeks)
} 