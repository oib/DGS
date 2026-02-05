'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { MultipleChoiceTest } from '@/components/test/MultipleChoiceTest'
import { Test, Question, Option } from '@prisma/client'
import { DGS_VOCABULARY } from '@/data/dgsVocabulary'
import { useState, useEffect } from 'react'

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

interface UserTestResult {
  score: number;
  totalPoints: number;
  earnedPoints: number;
  timeSpent: number;
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
}

function generateQuestions(level: number, category?: string): (Question & { options: Option[] })[] {
  const levelData = DGS_VOCABULARY[`level${level}` as keyof typeof DGS_VOCABULARY];
  if (!levelData) return [];

  let allWords: any[] = [];
  if (category && levelData[category as keyof typeof levelData]) {
    allWords = levelData[category as keyof typeof levelData];
  } else {
    allWords = Object.values(levelData).flat();
  }

  if (allWords.length < 4) return [];

  // Select up to 10 random words
  const selectedWords = allWords.sort(() => 0.5 - Math.random()).slice(0, Math.min(10, allWords.length));

  return selectedWords.map((word, index) => {
    // Get 3 wrong answers from other words
    const wrongWords = allWords.filter(w => w.german !== word.german).sort(() => 0.5 - Math.random()).slice(0, 3);

    const options = [
      { id: `o${index}1`, questionId: `q${index + 1}`, text: word.description, isCorrect: true, order: 1 },
      { id: `o${index}2`, questionId: `q${index + 1}`, text: wrongWords[0]?.description || 'Alternative 1', isCorrect: false, order: 2 },
      { id: `o${index}3`, questionId: `q${index + 1}`, text: wrongWords[1]?.description || 'Alternative 2', isCorrect: false, order: 3 },
      { id: `o${index}4`, questionId: `q${index + 1}`, text: wrongWords[2]?.description || 'Alternative 3', isCorrect: false, order: 4 }
    ].sort(() => 0.5 - Math.random()); // shuffle options

    return {
      id: `q${index + 1}`,
      testId: 'dynamic',
      text: `Wie gebärdet man "${word.german}"?`,
      imageUrl: null,
      order: index + 1,
      points: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      options
    };
  });
}

export default function TestDetailPage({ params }: TestDetailPageProps) {
  const [questions, setQuestions] = useState<(Question & { options: Option[] })[]>([]);

  const parts = params.id.split('-');
  const level = parseInt(parts[0].replace('level', '')) || 1;
  const category = parts.slice(1).join('-'); // in case category has -

  useEffect(() => {
    setQuestions(generateQuestions(level, category));
  }, [level, category]);

  const mockTest: TestWithQuestions = {
    id: params.id,
    title: `DGS Level ${level} - ${category.charAt(0).toUpperCase() + category.slice(1)}`,
    description: `Teste deine Kenntnisse für ${category} in Level ${level} der Deutschen Gebärdensprache`,
    level,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    passingScore: 70,
    timeLimit: 1,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    questions
  };

  const totalTimeSeconds = questions.length ? Math.min(questions.length * 20, 180) : 0;
  const totalTimeMinutes = Math.ceil(totalTimeSeconds / 60);

  const saveTestResult = (result: UserTestResult) => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{"testResults": [], "totalXp": 0}');
    userData.testResults.push(result);
    userData.totalXp = (userData.totalXp || 0) + result.earnedPoints;
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/tests">
              <Button variant="outline" className="mb-4">
                <ArrowLeft suppressHydrationWarning className="w-4 h-4 mr-2" />
                Zurück zu Tests
              </Button>
            </Link>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border dark:border-gray-700">
              <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Test wird geladen...</h1>
              <p className="text-gray-600 dark:text-gray-300">Bitte warten Sie einen Moment.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/tests">
            <Button variant="outline" className="mb-4">
              <ArrowLeft suppressHydrationWarning className="w-4 h-4 mr-2" />
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
              <span>Zeit: {totalTimeMinutes} Minuten</span>
              <span>Bestehen: {mockTest.passingScore}%</span>
              <span>Fragen: {mockTest.questions.length}</span>
            </div>
          </div>
        </div>

        <MultipleChoiceTest
          test={mockTest}
          onComplete={(result) => {
            saveTestResult(result);
            console.log('Test completed:', result)
            alert(`Test beendet! Du hast ${result.score}% erreicht.`)
          }}
        />
      </div>
    </div>
  )
}
