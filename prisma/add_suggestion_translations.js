#!/usr/bin/env node

// Add missing translation keys for suggestion page

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Additional translation keys needed for suggestion page
const additionalTranslations = {
  en: {
    'improve_sign_description': 'Improve Sign Description',
    'search_word': 'Search Word',
    'enter_word_placeholder': 'Enter a word...',
    'selected_word': 'Selected Word',
    'your_suggestion': 'Your Suggestion',
    'suggestion_placeholder': 'Enter your suggestion for improving the sign description...',
    'send_suggestion': 'Send Suggestion',
    'word_info': 'Word Information',
    'german_word': 'German Word',
    'english_word': 'English Word',
    'current_description': 'Current Description',
    'no_word_selected': 'Please select a word first',
    'enter_suggestion': 'Please enter your suggestion'
  },
  de: {
    'improve_sign_description': 'Besseres Zeichen beschreiben',
    'search_word': 'Wort suchen',
    'enter_word_placeholder': 'Geben Sie ein Wort ein...',
    'selected_word': 'Ausgewähltes Wort',
    'your_suggestion': 'Ihr Vorschlag',
    'suggestion_placeholder': 'Geben Sie Ihren Vorschlag zur Verbesserung der Zeichenerklärung ein...',
    'send_suggestion': 'Vorschlag senden',
    'word_info': 'Wort-Informationen',
    'german_word': 'Deutsches Wort',
    'english_word': 'Englisches Wort',
    'current_description': 'Aktuelle Beschreibung',
    'no_word_selected': 'Bitte wählen Sie zuerst ein Wort aus',
    'enter_suggestion': 'Bitte geben Sie Ihren Vorschlag ein'
  }
}

async function addMissingTranslations() {
  console.log('🌐 Adding missing translation keys for suggestion page...')

  try {
    let addedCount = 0

    for (const [language, translations] of Object.entries(additionalTranslations)) {
      console.log(`   Processing ${language.toUpperCase()} translations...`)

      for (const [key, value] of Object.entries(translations)) {
        // Check if translation already exists
        const existing = await prisma.translation.findUnique({
          where: {
            key_language: {
              key: key,
              language: language
            }
          }
        })

        if (!existing) {
          await prisma.translation.create({
            data: {
              key: key,
              language: language,
              value: value
            }
          })
          addedCount++
          console.log(`     ✅ Added: ${key} = "${value}"`)
        } else {
          console.log(`     ✓ Exists: ${key}`)
        }
      }
    }

    console.log(`\n✅ Translation seeding completed!`)
    console.log(`📊 Added ${addedCount} new translations`)
    console.log(`📈 Total translations in database: ${await prisma.translation.count()}`)

  } catch (error) {
    console.error('❌ Error adding translations:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addMissingTranslations()
