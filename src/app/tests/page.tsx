'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, BookOpen, Target, Award, ArrowLeft } from 'lucide-react'
import { DGS_VOCABULARY } from '@/data/dgsVocabulary'
import { useLanguage } from '@/components/language-provider'
import { useState, useEffect } from 'react'

function getTests() {
  const mockTests: any[] = [];
  Object.keys(DGS_VOCABULARY).forEach(levelKey => {
    const level = parseInt(levelKey.replace('level', ''));
    const levelData = DGS_VOCABULARY[levelKey as keyof typeof DGS_VOCABULARY];
    Object.keys(levelData).forEach(category => {
      const wordCount = (levelData as any)[category]?.length || 0;
      mockTests.push({
        id: `${levelKey}-${category}`,
        title: `DGS Level ${level} - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        description: `Teste deine Kenntnisse für ${category} in Level ${level} der Deutschen Gebärdensprache`,
        level,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        passingScore: 70,
        timeLimit: 3,
        isActive: true,
        _count: {
          questions: Math.min(wordCount, 10)
        }
      });
    });
  });
  return mockTests;
}

export default function TestsPage() {
  const [tests, setTests] = useState<any[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    setTests(getTests());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft suppressHydrationWarning className="w-4 h-4 mr-2" />
              {t('back_to_home')}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
            {t('tests_title')}
          </h1>
          <p className="text-center text-gray-600">
            {t('tests_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{test.title}</CardTitle>
                  <Badge variant="secondary">{t('level')} {test.level}</Badge>
                </div>
                {test.description && (
                  <p className="text-gray-600 text-sm">{test.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen suppressHydrationWarning className="w-4 h-4" />
                    <span>{test._count.questions} {t('questions')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock suppressHydrationWarning className="w-4 h-4" />
                    <span>{Math.ceil(Math.min(test._count.questions * 20, 180) / 60)} {t('minutes')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target suppressHydrationWarning className="w-4 h-4" />
                    <span>{t('passing_score')}: {test.passingScore}%</span>
                  </div>
                  {test.category && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
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
            <BookOpen suppressHydrationWarning className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Keine Tests verfügbar
            </h3>
            <p className="text-gray-500">
              Bald werden hier Tests zur Deutschen Gebärdensprache verfügbar sein.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline">
              Zurück zur Startseite
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
