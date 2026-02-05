'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { MultipleChoiceTest } from '@/components/test/MultipleChoiceTest'
import { Test, Question, Option } from '@prisma/client'

interface TestWithQuestions extends Test {
  questions: (Question & {
    options: Option[];
  })[];
}

interface TestDetailPageProps {
  params: {
    id: string
  }
}

export default function TestDetailPage({ params }: TestDetailPageProps) {
  // Mock test data for now to avoid API issues
  const mockTest: TestWithQuestions = {
    id: params.id,
    title: params.id === 'cml96ujsf00005gmbhflqfoy6' ? 'Grundlegende Begrüßungen in DGS' : 'DGS Satzbau Grundlagen',
    description: params.id === 'cml96ujsf00005gmbhflqfoy6'
      ? 'Teste deine Kenntnisse über grundlegende Begrüßungen in der Deutschen Gebärdensprache'
      : 'Lerne die Grundlagen des Satzbaus in der Deutschen Gebärdensprache',
    level: params.id === 'cml96ujsf00005gmbhflqfoy6' ? 1 : 2,
    category: params.id === 'cml96ujsf00005gmbhflqfoy6' ? 'Grundlagen' : 'Grammatik',
    timeLimit: params.id === 'cml96ujsf00005gmbhflqfoy6' ? 10 : 15,
    passingScore: 70,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: params.id === 'cml96ujsf00005gmbhflqfoy6' ? [
      {
        id: 'q1',
        testId: params.id,
        text: 'Wie zeigt man "Hallo" in der Deutschen Gebärdensprache?',
        imageUrl: null,
        order: 1,
        points: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        options: [
          { id: 'o1', questionId: 'q1', text: 'Die flache Hand heben und von links nach rechts bewegen', isCorrect: true, order: 1 },
          { id: 'o2', questionId: 'q1', text: 'Die Faust schütteln', isCorrect: false, order: 2 },
          { id: 'o3', questionId: 'q1', text: 'Mit dem Kopf nicken', isCorrect: false, order: 3 },
          { id: 'o4', questionId: 'q1', text: 'Die Hände zusammenklatschen', isCorrect: false, order: 4 }
        ]
      },
      {
        id: 'q2',
        testId: params.id,
        text: 'Welche Handform wird bei der Gebärde für "Danke" verwendet?',
        imageUrl: null,
        order: 2,
        points: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        options: [
          { id: 'o5', questionId: 'q2', text: 'Flache Hand auf dem Herzen', isCorrect: true, order: 1 },
          { id: 'o6', questionId: 'q2', text: 'Faust', isCorrect: false, order: 2 },
          { id: 'o7', questionId: 'q2', text: 'Zeigefinger', isCorrect: false, order: 3 },
          { id: 'o8', questionId: 'q2', text: 'Alle Finger gespreizt', isCorrect: false, order: 4 }
        ]
      }
    ] : [
      {
        id: 'q3',
        testId: params.id,
        text: 'In welcher Reihenfolge werden Sätze in DGS normalerweise gebaut?',
        imageUrl: null,
        order: 1,
        points: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        options: [
          { id: 'o9', questionId: 'q3', text: 'Subjekt - Verb - Objekt', isCorrect: true, order: 1 },
          { id: 'o10', questionId: 'q3', text: 'Verb - Subjekt - Objekt', isCorrect: false, order: 2 },
          { id: 'o11', questionId: 'q3', text: 'Objekt - Subjekt - Verb', isCorrect: false, order: 3 },
          { id: 'o12', questionId: 'q3', text: 'Wie im gesprochenen Deutsch', isCorrect: false, order: 4 }
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/tests">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zu Tests
            </Button>
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border dark:border-gray-700">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{mockTest.title}</h1>
            {mockTest.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-4">{mockTest.description}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Level: {mockTest.level}</span>
              {mockTest.category && <span>Kategorie: {mockTest.category}</span>}
              {mockTest.timeLimit && <span>Zeit: {mockTest.timeLimit} Minuten</span>}
              <span>Bestehen: {mockTest.passingScore}%</span>
              <span>Fragen: {mockTest.questions.length}</span>
            </div>
          </div>
        </div>

        <MultipleChoiceTest
          test={mockTest}
          onComplete={(result) => {
            console.log('Test completed:', result)
            // Here you would typically save the result to the database
            // and redirect to results page
            alert(`Test beendet! Du hast ${result.score}% erreicht.`)
          }}
          userId="demo-user" // In real app, get from authentication
        />
      </div>
    </div>
  )
}
