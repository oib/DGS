'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LanguageToggle } from '@/components/language-toggle'
import { useLanguage } from '@/components/language-provider'
import { useEffect, useState } from 'react'
import { Lightbulb } from 'lucide-react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  // Wait for client-side mounting to prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  const { t } = useLanguage()

  // Show loading state until mounted
  if (!mounted) {
    return (
      <main className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Deutsche Gebärdensprache Lernplattform
            </h1>
            <div className="flex items-center gap-2">
              <LanguageToggle />
            </div>
          </div>
          <div className="animate-pulse space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border h-48"></div>
              <div className="bg-white rounded-lg p-6 shadow-sm border h-48"></div>
              <div className="bg-white rounded-lg p-6 shadow-sm border h-48"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {t('title')}
          </h1>
          <div className="flex items-center gap-2">
            <LanguageToggle />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <CardHeader>
              <CardTitle className="dark:text-white">{t('vocabulary')}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                {t('vocab_desc')}
              </p>
              <Link href="/vocabulary">
                <Button className="w-full" variant="outline">{t('vocabulary')}</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <CardHeader>
              <CardTitle className="dark:text-white">{t('tests')}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                {t('tests_desc')}
              </p>
              <Link href="/tests">
                <Button className="w-full" variant="outline">{t('tests')}</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Lightbulb suppressHydrationWarning className="w-5 h-5 text-yellow-500" />
                {t('suggest_title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                {t('suggest_desc')}
              </p>
              <Link href="/suggest">
                <Button className="w-full" variant="outline">{t('send_suggestion')}</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">{t('about_title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              {t('about_text')}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
