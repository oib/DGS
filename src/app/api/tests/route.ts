import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const levelParam = searchParams.get('level')

  try {
    const whereClause: any = {
      isActive: true
    }

    if (levelParam) {
      const level = parseInt(levelParam)
      if (!isNaN(level)) {
        whereClause.level = level
      }
    }

    const tests = await prisma.test.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            questions: true
          }
        }
      },
      orderBy: [
        { level: 'asc' },
        { title: 'asc' }
      ]
    })

    const formattedTests = tests.map(test => ({
      id: test.id,
      title: test.title,
      description: test.description,
      level: test.level,
      category: test.category ? test.category.charAt(0).toUpperCase() + test.category.slice(1).replace(/_/g, ' ') : null,
      passingScore: test.passingScore,
      timeLimit: test.timeLimit,
      isActive: test.isActive,
      _count: test._count
    }))

    return NextResponse.json(formattedTests)
  } catch (error) {
    console.error('Error fetching tests:', error)
    return NextResponse.json({ error: 'Failed to fetch tests' }, { status: 500 })
  }
}
