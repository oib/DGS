#!/usr/bin/env node

// Smart incremental seeding - only add missing data, don't clear existing data

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function smartSeed() {
  console.log('🧠 Smart Incremental Seeding Started...')
  console.log('📊 Checking existing data...')

  try {
    // Check existing data counts
    const existingWords = await prisma.word.count()
    const existingCategories = await prisma.category.count()
    const existingLevels = await prisma.vocabularyLevel.count()
    const existingTests = await prisma.test.count()

    console.log(`📈 Current database status:`)
    console.log(`   • ${existingWords} words`)
    console.log(`   • ${existingCategories} categories`)
    console.log(`   • ${existingLevels} levels`)
    console.log(`   • ${existingTests} tests`)

    // Define vocabulary data (only new additions needed)
    const newVocabularyData = {
      level1: {
        common_nouns: [
          // Only the 3 new nouns we added
          { german: "frau", english: "woman/wife", description: "Weibliche Figur zeigen", difficulty: 1, category: "common_nouns" },
          { german: "stadt", english: "city", description: "Stadtlandschaft andeuten", difficulty: 1, category: "common_nouns" },
          { german: "dorf", english: "village", description: "Dorf mit Häusern zeigen", difficulty: 1, category: "common_nouns" }
        ],
        basic_adjectives: [
          // Only the 6 new adjectives we added
          { german: "richtig", english: "right/correct", description: "Gerade Linie zeigen", difficulty: 1, category: "basic_adjectives" },
          { german: "falsch", english: "wrong/false", description: "Verdrehte Bewegung", difficulty: 1, category: "basic_adjectives" },
          { german: "hell", english: "bright/light", description: "Helle Fläche zeigen", difficulty: 1, category: "basic_adjectives" },
          { german: "dunkel", english: "dark", description: "Dunkle Fläche zeigen", difficulty: 1, category: "basic_adjectives" },
          { german: "voll", english: "full", description: "Volle Bewegung", difficulty: 1, category: "basic_adjectives" },
          { german: "leer", english: "empty", description: "Leere Bewegung", difficulty: 1, category: "basic_adjectives" }
        ]
      }
    }

    let wordsAdded = 0
    let categoriesCreated = 0
    let levelsCreated = 0

    // Check and create categories if missing
    console.log('\n📂 Checking categories...')
    const categorySet = new Set()

    for (const [levelKey, levelData] of Object.entries(newVocabularyData)) {
      for (const [categoryName, words] of Object.entries(levelData)) {
        if (!categorySet.has(categoryName)) {
          categorySet.add(categoryName)

          // Check if category exists
          const existingCategory = await prisma.category.findUnique({
            where: { name: categoryName }
          })

          if (!existingCategory) {
            await prisma.category.create({
              data: { name: categoryName }
            })
            categoriesCreated++
            console.log(`   ✅ Created category: ${categoryName}`)
          } else {
            console.log(`   ✓ Category exists: ${categoryName}`)
          }
        }
      }
    }

    // Check and create levels if missing
    console.log('\n🏆 Checking levels...')
    for (const levelKey of Object.keys(newVocabularyData)) {
      const levelNumber = parseInt(levelKey.replace('level', ''))

      const existingLevel = await prisma.vocabularyLevel.findUnique({
        where: { id: levelNumber }
      })

      if (!existingLevel) {
        await prisma.vocabularyLevel.create({
          data: {
            id: levelNumber,
            name: `Level ${levelNumber}`,
            description: `German Sign Language proficiency level ${levelNumber}`
          }
        })
        levelsCreated++
        console.log(`   ✅ Created level: ${levelNumber}`)
      } else {
        console.log(`   ✓ Level exists: ${levelNumber}`)
      }
    }

    // Add only missing words
    console.log('\n📝 Adding missing words...')
    const categoryMap = new Map()

    // Build category map
    const categories = await prisma.category.findMany()
    categories.forEach(cat => categoryMap.set(cat.name, cat.id))

    for (const [levelKey, levelData] of Object.entries(newVocabularyData)) {
      const levelNumber = parseInt(levelKey.replace('level', ''))

      for (const [categoryName, words] of Object.entries(levelData)) {
        const categoryId = categoryMap.get(categoryName)

        if (!categoryId) {
          console.error(`❌ Category not found: ${categoryName}`)
          continue
        }

        console.log(`   Checking ${words.length} words in ${categoryName} (Level ${levelNumber})...`)

        for (const word of words) {
          // Check if word already exists
          const existingWord = await prisma.word.findFirst({
            where: {
              german: word.german,
              categoryId: categoryId,
              levelId: levelNumber
            }
          })

          if (!existingWord) {
            await prisma.word.create({
              data: {
                german: word.german,
                english: word.english,
                description: word.description,
                difficulty: word.difficulty,
                categoryId: categoryId,
                levelId: levelNumber
              }
            })
            wordsAdded++
            console.log(`     ✅ Added: ${word.german}`)
          } else {
            console.log(`     ✓ Exists: ${word.german}`)
          }
        }
      }
    }

    console.log(`\n✅ Smart seeding completed!`)
    console.log(`📊 Summary:`)
    console.log(`   • ${categoriesCreated} categories created`)
    console.log(`   • ${levelsCreated} levels created`)
    console.log(`   • ${wordsAdded} words added`)
    console.log(`   • ${existingWords + wordsAdded} total words in database`)

    if (wordsAdded === 0 && categoriesCreated === 0 && levelsCreated === 0) {
      console.log('🎯 No new data needed - everything already exists!')
    }

  } catch (error) {
    console.error('❌ Error during smart seeding:', error)
  } finally {
    await prisma.$disconnect()
  }
}

smartSeed()
