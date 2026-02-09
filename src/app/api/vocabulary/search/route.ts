import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query || query.trim().length === 0) {
    return NextResponse.json([])
  }

  try {
    const lowerQuery = query.toLowerCase()
    const words = await prisma.$queryRaw`
      SELECT
        w.id,
        w.german,
        w.english,
        w.description,
        w.difficulty,
        c.name as category_name,
        vl.id as level_id,
        vl.name as level_name
      FROM words w
      JOIN categories c ON w.categoryId = c.id
      JOIN vocabulary_levels vl ON w.levelId = vl.id
      WHERE LOWER(w.german) LIKE LOWER(${`%${query}%`})
         OR LOWER(w.english) LIKE LOWER(${`%${query}%`})
      ORDER BY w.german ASC
      LIMIT 50
    ` as Array<{
      german: string
      english: string
      description: string
      difficulty: number
      category_name: string
    }>

    const result = words.map((word) => ({
      german: word.german,
      english: word.english,
      description: word.description,
      difficulty: word.difficulty,
      category: word.category_name
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error searching vocabulary:', error)
    return NextResponse.json({ error: 'Failed to search vocabulary' }, { status: 500 })
  }
}
