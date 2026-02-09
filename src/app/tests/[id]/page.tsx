'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Clock, Target } from 'lucide-react'
import { MultipleChoiceTest } from '@/components/test/MultipleChoiceTest'
import { Test, Question, Option } from '@prisma/client'
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

export default function TestDetailPage({ params }: TestDetailPageProps) {
  const [test, setTest] = useState<TestWithQuestions | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTest = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/tests/${params.id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const testData = await response.json();

        // Check if it's an error response
        if (testData.error) {
          throw new Error(testData.error);
        }

        setTest(testData);
      } catch (err) {
        console.error('Error loading test:', err);
        setError(err instanceof Error ? err.message : 'Failed to load test');
      } finally {
        setLoading(false);
      }
    };

    loadTest();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading test...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 dark:text-red-400 mb-4">Error: {error}</div>
          <Link href="/tests">
            <Button>Back to Tests</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-600 dark:text-gray-400 mb-4">Test not found</div>
          <Link href="/tests">
            <Button>Back to Tests</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/tests" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Tests
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{test.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{test.description}</p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Level {test.level}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {test.timeLimit ? Math.floor(test.timeLimit / 60) : 0}:{(test.timeLimit || 0) % 60 < 10 ? '0' : ''}{(test.timeLimit || 0) % 60} minutes
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Pass: {test.passingScore}%
              </div>
            </div>
          </div>
        </div>

        <MultipleChoiceTest
          test={test}
          onComplete={(result) => {
            // TODO: Implement result storage
          }}
        />
      </div>
    </div>
  );
}
