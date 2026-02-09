'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'de'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  loading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Fallback translations for when database is unavailable
const fallbackTranslations = {
  en: {
    // Navigation & Common
    'home': 'Home',
    'vocabulary': 'Vocabulary',
    'tests': 'Tests',
    'back': 'Back',
    'loading': 'Loading...',
    'back_to_home': 'Back to Home',
    'take_test': 'Take Test',
    'passing_score': 'Passing score',
    'questions': 'questions',
    'level': 'Level',
    'to_pass': 'to pass',
    'minutes': 'minutes',
    'theme_toggle': 'Toggle theme',
    'lang_toggle': 'Switch language (EN/DE)',
    'suggest_title': 'Suggestion',
    'suggest_desc': 'Improve sign descriptions with your ideas',
    'send_suggestion': 'Send Suggestion',
    'tests_title': 'DGS Tests',
    'tests_subtitle': 'Test your knowledge of German Sign Language'
  } as Record<string, string>,
  de: {
    // Navigation & Common
    'home': 'Startseite',
    'vocabulary': 'Wörterbuch',
    'tests': 'Tests',
    'back': 'Zurück',
    'loading': 'Lädt...',
    'back_to_home': 'Zurück zur Startseite',
    'take_test': 'Test starten',
    'passing_score': 'Bestehen ab',
    'questions': 'Fragen',
    'level': 'Level',
    'to_pass': 'zum Bestehen',
    'minutes': 'Minuten',
    'theme_toggle': 'Theme umschalten',
    'lang_toggle': 'Sprache wechseln (EN/DE)',
    'suggest_title': 'Vorschlag',
    'suggest_desc': 'Verbessern Sie Zeichenerklärungen mit Ihren Ideen',
    'send_suggestion': 'Vorschlag senden',
    'tests_title': 'DGS Tests',
    'tests_subtitle': 'Teste dein Wissen über die Deutsche Gebärdensprache'
  } as Record<string, string>
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('de')
  const [mounted, setMounted] = useState(false)
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>(fallbackTranslations)
  const [loading, setLoading] = useState(true)

  // Fetch translations from database
  const fetchTranslations = async (lang: Language) => {
    try {
      const response = await fetch(`/api/translations?lang=${lang}`)
      if (response.ok) {
        const data = await response.json()
        setTranslations(prev => ({
          ...prev,
          [lang]: { ...fallbackTranslations[lang], ...data }
        }))
      }
    } catch (error) {
      console.warn('Failed to fetch translations, using fallbacks:', error)
      // Fall back to hardcoded translations
      setTranslations(prev => ({
        ...prev,
        [lang]: fallbackTranslations[lang]
      }))
    }
  }

  // Only run on client side
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    const browserLang = navigator.language.startsWith('de') ? 'de' : 'en'
    const initialLang = savedLang || browserLang

    setLanguageState(initialLang)
    setMounted(true)

    // Fetch translations for initial language
    fetchTranslations(initialLang).finally(() => setLoading(false))
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)

    // Fetch translations for new language if not already loaded
    if (!translations[lang]) {
      fetchTranslations(lang)
    }
  }

  const t = (key: string): string => {
    if (!mounted || loading) return fallbackTranslations.de[key] || key
    return translations[language]?.[key] || translations.de?.[key] || fallbackTranslations.de[key] || key
  }

  // Provide context immediately with default values
  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
    loading
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
