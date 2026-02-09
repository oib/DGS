import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const levelParam = searchParams.get('level')

  if (!levelParam) {
    return NextResponse.json({ error: 'Level parameter is required' }, { status: 400 })
  }

  const level = parseInt(levelParam)
  if (isNaN(level) || level < 1 || level > 10) {
    return NextResponse.json({ error: 'Invalid level parameter' }, { status: 400 })
  }

  try {
    const words = await prisma.word.findMany({
      where: {
        levelId: level
      },
      include: {
        category: true,
        level: true
      },
      orderBy: [
        { category: { name: 'asc' } },
        { german: 'asc' }
      ]
    })

    // Group by category for compatibility
    const grouped: any = {}
    words.forEach(word => {
      const categoryName = word.category.name
      if (!grouped[categoryName]) {
        grouped[categoryName] = []
      }
      grouped[categoryName].push({
        german: word.german,
        english: word.english,
        description: word.description,
        difficulty: word.difficulty,
        category: word.category.name
      })
    })

    return NextResponse.json(grouped)
  } catch (error) {
    console.error('Error fetching vocabulary for level:', error)
    return NextResponse.json({ error: 'Failed to fetch vocabulary' }, { status: 500 })
  }
}
