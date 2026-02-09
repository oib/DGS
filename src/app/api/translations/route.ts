import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const language = searchParams.get('lang') || 'de'

  try {
    const translations = await prisma.translation.findMany({
      where: { language },
      select: {
        key: true,
        value: true
      }
    })

    // Convert to key-value object
    const translationObject = translations.reduce((acc: Record<string, string>, translation: { key: string; value: string }) => {
      acc[translation.key] = translation.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json(translationObject)
  } catch (error) {
    console.error('Error fetching translations:', error)
    return NextResponse.json({ error: 'Failed to fetch translations' }, { status: 500 })
  }
}
