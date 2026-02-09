#!/usr/bin/env node

// Seed UI translations into the database

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Translation data from the language provider
const translationData = {
  en: {
    // Navigation & Common
    'home': 'Home',
    'vocabulary': 'Vocabulary',
    'tests': 'Tests',
    'back': 'Back',
    'loading': 'Loading...',
    'back_to_home': 'Back to Home',

    // Home Page
    'title': 'German Sign Language Learning Platform',
    'subtitle': 'Learn German Sign Language (DGS) effectively',
    'vocab_desc': 'DGS signs organized by level and category.',
    'tests_desc': 'Test your knowledge with interactive multiple-choice tests.',
    'about_title': 'About DGS',
    'about_text': 'German Sign Language (DGS) is the natural language of the deaf community in Germany. Learn the basics of sign language through our interactive platform.',

    // Suggest Page
    'suggest_title': 'Suggestion',
    'suggest_desc': 'Improve sign descriptions with your ideas',
    'send_suggestion': 'Send Suggestion',

    // Tests Page
    'tests_title': 'DGS Tests',
    'tests_subtitle': 'Test your knowledge of German Sign Language',
    'questions': 'questions',
    'passing_score': 'Passing score',
    'take_test': 'Take Test',
    'level': 'Level',
    'to_pass': 'to pass',
    'minutes': 'minutes',

    // Theme & Language
    'toggle_theme': 'Toggle theme',
    'switch_lang': 'Switch language',

    // Accessibility
    'theme_toggle': 'Toggle theme',
    'lang_toggle': 'Switch language (EN/DE)',
  },
  de: {
    // Navigation & Common
    'home': 'Startseite',
    'vocabulary': 'Wörterbuch',
    'tests': 'Tests',
    'back': 'Zurück',
    'loading': 'Lädt...',
    'back_to_home': 'Zurück zur Startseite',

    // Home Page
    'title': 'Deutsche Gebärdensprache Lernplattform',
    'subtitle': 'Deutsche Gebärdensprache (DGS) effektiv lernen',
    'vocab_desc': 'DGS Zeichen nach Level und Kategorie geordnet.',
    'tests_desc': 'Teste dein Wissen mit interaktiven Multiple-Choice-Tests.',
    'about_title': 'Über DGS',
    'about_text': 'Die Deutsche Gebärdensprache (DGS) ist die natürliche Sprache der Gehörlosen in Deutschland. Lerne die Grundlagen der Gebärdensprache durch unsere interaktive Plattform.',

    // Suggest Page
    'suggest_title': 'Vorschlag',
    'suggest_desc': 'Verbessern Sie Zeichenerklärungen mit Ihren Ideen',
    'send_suggestion': 'Vorschlag senden',

    // Tests Page
    'tests_title': 'DGS Tests',
    'tests_subtitle': 'Teste dein Wissen über die Deutsche Gebärdensprache',
    'questions': 'Fragen',
    'passing_score': 'Bestehen ab',
    'take_test': 'Test starten',
    'level': 'Level',
    'to_pass': 'zum Bestehen',
    'minutes': 'Minuten',

    // Theme & Language
    'toggle_theme': 'Theme wechseln',
    'switch_lang': 'Sprache wechseln',

    // Accessibility
    'theme_toggle': 'Theme umschalten',
    'lang_toggle': 'Sprache wechseln (EN/DE)',
  }
}

async function seedTranslations() {
  console.log('🌐 Seeding UI translations into database...')

  try {
    let translationCount = 0

    for (const [language, translations] of Object.entries(translationData)) {
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
          translationCount++
          console.log(`     ✅ Added: ${key} = "${value}"`)
        } else {
          console.log(`     ✓ Exists: ${key}`)
        }
      }
    }

    console.log(`\n✅ Translation seeding completed!`)
    console.log(`📊 Added ${translationCount} new translations`)
    console.log(`📈 Total translations in database: ${await prisma.translation.count()}`)

  } catch (error) {
    console.error('❌ Error seeding translations:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedTranslations()
