#!/usr/bin/env node

// Check for missing essential conversational words in DGS vocabulary database

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function checkMissingWords() {
  try {
    console.log('🔍 Analyzing vocabulary database for missing words...\n')

    // Get all current words from database
    const words = await prisma.word.findMany({
      select: {
        german: true,
        english: true,
        difficulty: true,
        category: {
          select: { name: true }
        }
      }
    })

    // Extract German words and normalize
    const currentWords = new Set(
      words.map(word => word.german.toLowerCase().trim())
    )

    console.log(`📊 Current database: ${words.length} words\n`)

    // Essential conversational words that should be in any basic vocabulary
    const essentialWords = {
      // Basic pronouns (should already be covered)
      pronouns: ['ich', 'du', 'er', 'sie', 'wir', 'ihr'],

      // Basic responses (should already be covered)
      responses: ['ja', 'nein', 'bitte', 'danke'],

      // Essential verbs for conversation
      verbs: [
        'sein', 'haben', 'gehen', 'kommen', 'sehen', 'hören', 'sprechen',
        'essen', 'trinken', 'schlafen', 'arbeiten', 'lernen', 'machen',
        'wollen', 'können', 'müssen', 'sollen', 'dürfen',
        'verstehen', 'wissen', 'denken', 'fühlen'
      ],

      // Question words
      questions: ['was', 'wie', 'wo', 'wann', 'warum', 'wer', 'welcher'],

      // Common nouns for daily conversation
      nouns: [
        'wasser', 'haus', 'auto', 'buch', 'schule', 'arbeit', 'familie', 'freund',
        'kind', 'mutter', 'vater', 'mann', 'zeit', 'stadt', 'dorf', 'frau'
      ],

      // Basic adjectives
      adjectives: [
        'gut', 'schlecht', 'groß', 'klein', 'neu', 'alt', 'schnell', 'langsam',
        'richtig', 'falsch', 'hell', 'dunkel', 'voll', 'leer'
      ],

      // Locations and time
      locations: ['hier', 'dort', 'zuhause', 'oben', 'unten', 'links', 'rechts'],

      // Time expressions
      time: ['heute', 'morgen', 'gestern', 'jetzt', 'später', 'früher', 'immer', 'nie'],

      // Numbers
      numbers: ['eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun', 'zehn'],

      // Additional essential conversational words
      conversational: [
        'hallo', 'auf wiedersehen', 'entschuldigung', 'vielleicht', 'weil', 'und', 'oder',
        'aber', 'auch', 'noch', 'schon', 'nur', 'sehr', 'so', 'zu', 'mit', 'von',
        'für', 'in', 'auf', 'an', 'aus', 'mein', 'dein', 'unser', 'mehr', 'wenig', 'viel', 'alle', 'kein', 'dieser', 'jener'
      ]
    }

    // Check each category
    let totalMissing = 0
    const missingByCategory = {}

    for (const [category, wordList] of Object.entries(essentialWords)) {
      const missing = wordList.filter(word => !currentWords.has(word.toLowerCase()))
      missingByCategory[category] = missing
      totalMissing += missing.length

      if (missing.length > 0) {
        console.log(`❌ ${category.toUpperCase()}: ${missing.length} missing`)
        console.log(`   Missing: ${missing.join(', ')}\n`)
      } else {
        console.log(`✅ ${category}: All present`)
      }
    }

    console.log('📈 SUMMARY:')
    console.log(`   • Total essential words checked: ${Object.values(essentialWords).flat().length}`)
    console.log(`   • Words in database: ${words.length}`)
    console.log(`   • Essential words missing: ${totalMissing}`)
    console.log(`   • Coverage: ${((Object.values(essentialWords).flat().length - totalMissing) / Object.values(essentialWords).flat().length * 100).toFixed(1)}%`)

    if (totalMissing > 0) {
      console.log('\n💡 MISSING WORDS TO REACH 100%:')
      const allMissing = Object.values(missingByCategory).flat()
      console.log(`   ${allMissing.join(', ')}`)
      console.log('\n💡 RECOMMENDATIONS:')
      console.log('   Add these missing words to reach 100% essential conversational coverage.')
    } else {
      console.log('\n🎉 EXCELLENT: All essential conversational words are present!')
      console.log('   100% coverage achieved!')
    }

  } catch (error) {
    console.error('❌ Error analyzing vocabulary:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkMissingWords()
