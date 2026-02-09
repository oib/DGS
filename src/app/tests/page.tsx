'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, BookOpen, Target, Award, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { useState, useEffect } from 'react'

// Fetch tests from database API
async function fetchTests(level?: number) {
  try {
    const url = level ? `/api/tests?level=${level}` : '/api/tests'
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Check if it's an error response
    if (data.error) {
      throw new Error(data.error)
    }

    return data
  } catch (error) {
    console.error('Error fetching tests:', error)
    return []
  }
}

export default function TestsPage() {
  const [tests, setTests] = useState<any[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const loadTests = async () => {
      try {
        const testData = await fetchTests();
        setTests(testData);
      } catch (error) {
        console.error('Error loading tests:', error);
        setTests([]); // Fallback to empty array
      }
    };
    
    loadTests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
              <ArrowLeft suppressHydrationWarning className="w-4 h-4 mr-2" />
              {t('back_to_home')}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            {t('tests_title')}
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400">
            {t('tests_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{test.title}</CardTitle>
                  <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">{t('level')} {test.level}</Badge>
                </div>
                {test.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{test.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <BookOpen suppressHydrationWarning className="w-4 h-4" />
                    <span>{test._count.questions} {t('questions')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock suppressHydrationWarning className="w-4 h-4" />
                    <span>{Math.ceil(Math.min(test._count.questions * 20, 180) / 60)} {t('minutes')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Target suppressHydrationWarning className="w-4 h-4" />
                    <span>{t('passing_score')}: {test.passingScore}%</span>
                  </div>
                  {test.category && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Award suppressHydrationWarning className="w-4 h-4" />
                      <span>{test.category}</span>
                    </div>
                  )}
                </div>
                <Link href={`/tests/${test.id}`}>
                  <Button className="w-full">
                    {t('take_test')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {tests.length === 0 && (
          <div className="text-center py-12">
            <BookOpen suppressHydrationWarning className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {t('no_tests_available')}
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {t('tests_coming_soon')}
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
              {t('back_to_home')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
