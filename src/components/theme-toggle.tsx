'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from './theme-provider'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')

  // Only run on client side
  useEffect(() => {
    setMounted(true)
    // Get initial theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme
    setThemeState(initialTheme)

    // Apply theme to document
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    if (!mounted) return

    const newTheme = theme === 'light' ? 'dark' : 'light'
    setThemeState(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="w-9 px-0"
        disabled
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" suppressHydrationWarning />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="w-9 px-0"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" suppressHydrationWarning />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" suppressHydrationWarning />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
