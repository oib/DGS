'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'de'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionaries
const translations = {
  en: {
    // Navigation & Common
    'home': 'Home',
    'vocabulary': 'Vocabulary',
    'tests': 'Tests',
    'lessons': 'Lessons',
    'back': 'Back',
    'loading': 'Loading...',

    // Home Page
    'title': 'German Sign Language Learning Platform',
    'subtitle': 'Learn German Sign Language (DGS) effectively',
    'lessons_desc': 'Structured lessons from basics to advanced.',
    'vocab_desc': 'DGS signs organized by level and category.',
    'tests_desc': 'Test your knowledge with interactive multiple-choice tests.',
    'about_title': 'About DGS',
    'about_text': 'German Sign Language (DGS) is the natural language of the deaf community in Germany. Learn the basics of sign language through our interactive platform.',

    // Vocabulary Page
    'vocab_title': 'DGS Dictionary',
    'vocab_subtitle': '926 signs organized by level and category',
    'signs_count': 'signs',
    'level': 'Level',

    // Tests Page
    'tests_title': 'DGS Tests',
    'tests_subtitle': 'Test your knowledge of German Sign Language',
    'questions': 'questions',
    'passing_score': 'Passing score',
    'take_test': 'Take Test',

    // Lessons Page
    'lessons_title': 'DGS Lessons',
    'lessons_subtitle': 'Structured learning paths for German Sign Language',
    'lessons_count': 'lessons',
    'vocab_count': 'words',
    'learning_methods': 'Learning Methods',
    'learning_goals': 'Learning Goals',
    'how_it_works': 'How do the lessons work?',
    'lesson_in_development': 'Lessons in Development',
    'coming_soon': 'Interactive lessons will be available soon. In the meantime, you can:',
    'explore_vocab': 'Explore Vocabulary',
    'take_tests': 'Take Tests',

    // Theme & Language
    'toggle_theme': 'Toggle theme',
    'switch_lang': 'Switch language',

    // Accessibility
    'theme_toggle': 'Toggle theme',
    'lang_toggle': 'Switch language (EN/DE)',
  } as Record<string, string>,
  de: {
    // Navigation & Common
    'home': 'Startseite',
    'vocabulary': 'Wörterbuch',
    'tests': 'Tests',
    'lessons': 'Lektionen',
    'back': 'Zurück',
    'loading': 'Lädt...',

    // Home Page
    'title': 'Deutsche Gebärdensprache Lernplattform',
    'subtitle': 'Deutsche Gebärdensprache (DGS) effektiv lernen',
    'lessons_desc': 'Strukturierte Lektionen von Grundlagen bis fortgeschritten.',
    'vocab_desc': 'DGS Zeichen nach Level und Kategorie geordnet.',
    'tests_desc': 'Teste dein Wissen mit interaktiven Multiple-Choice-Tests.',
    'about_title': 'Über DGS',
    'about_text': 'Die Deutsche Gebärdensprache (DGS) ist die natürliche Sprache der Gehörlosen in Deutschland. Lerne die Grundlagen der Gebärdensprache durch unsere interaktive Plattform.',

    // Vocabulary Page
    'vocab_title': 'DGS Wörterbuch',
    'vocab_subtitle': '926 Zeichen nach Level und Kategorie geordnet',
    'signs_count': 'Zeichen',
    'level': 'Level',

    // Tests Page
    'tests_title': 'DGS Tests',
    'tests_subtitle': 'Teste dein Wissen über die Deutsche Gebärdensprache',
    'questions': 'Fragen',
    'passing_score': 'Bestehen ab',
    'take_test': 'Test starten',

    // Lessons Page
    'lessons_title': 'DGS Lektionen',
    'lessons_subtitle': 'Strukturierte Lernpfade für die Deutsche Gebärdensprache',

    // Theme & Language
    'toggle_theme': 'Theme wechseln',
    'switch_lang': 'Sprache wechseln',

    // Accessibility
    'theme_toggle': 'Theme umschalten',
    'lang_toggle': 'Sprache wechseln (EN/DE)',
  } as Record<string, string>
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('de')
  const [mounted, setMounted] = useState(false)

  // Only run on client side
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    const browserLang = navigator.language.startsWith('de') ? 'de' : 'en'
    const initialLang = savedLang || browserLang

    setLanguageState(initialLang)
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    if (!mounted) return translations.de[key] || key
    return translations[language][key] || translations.de[key] || key
  }

  // Provide context immediately with default values
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
