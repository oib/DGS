import { prisma } from '@/server/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, BookOpen, Target, Award } from 'lucide-react'

async function getTests() {
  const tests = await prisma.test.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      level: true,
      category: true,
      timeLimit: true,
      passingScore: true,
      _count: {
        select: {
          questions: true
        }
      }
    },
    where: {
      isActive: true
    },
    orderBy: {
      level: 'asc'
    }
  })
  return tests
}

export default async function TestsPage() {
  const tests = await getTests()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
            DGS Tests
          </h1>
          <p className="text-center text-gray-600">
            Teste dein Wissen über die Deutsche Gebärdensprache
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tests.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{test.title}</CardTitle>
                  <Badge variant="secondary">Level {test.level}</Badge>
                </div>
                {test.description && (
                  <p className="text-gray-600 text-sm">{test.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{test._count.questions} Fragen</span>
                  </div>
                  {test.timeLimit && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{test.timeLimit} Minuten</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target className="w-4 h-4" />
                    <span>{test.passingScore}% zum Bestehen</span>
                  </div>
                  {test.category && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      <span>{test.category}</span>
                    </div>
                  )}
                </div>
                <Link href={`/tests/${test.id}`}>
                  <Button className="w-full">
                    Test starten
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {tests.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
