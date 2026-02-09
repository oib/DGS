'use client'

import { Languages } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from './language-provider'
import { useEffect, useState } from 'react'

export function LanguageToggle() {
  const [mounted, setMounted] = useState(false)
  const [language, setLanguageState] = useState<'en' | 'de'>('de')

  // Only run on client side
  useEffect(() => {
    setMounted(true)
    // Get initial theme
    const savedLang = localStorage.getItem('language') as 'en' | 'de' || 'de'
    setLanguageState(savedLang)
  }, [])

  const toggleLanguage = () => {
    if (!mounted) return

    try {
      // Try to use context if available
      const { setLanguage } = useLanguage()
      const newLang = language === 'de' ? 'en' : 'de'
      setLanguage(newLang)
      setLanguageState(newLang)
    } catch {
      // Fallback if context not available
      const newLang = language === 'de' ? 'en' : 'de'
      setLanguageState(newLang)
      localStorage.setItem('language', newLang)
      // Reload page to apply language change
      window.location.reload()
    }
  }

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="w-12 px-0"
        disabled
      >
        <Languages className="h-[1.2rem] w-[1.2rem]" suppressHydrationWarning />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="w-12 px-0"
      title="Sprache wechseln (EN/DE)"
    >
      <Languages className="h-[1.2rem] w-[1.2rem]" suppressHydrationWarning />
      <span className="ml-1 text-xs font-bold">
        {(language === 'de' ? 'EN' : 'DE')}
      </span>
    </Button>
  )
}
