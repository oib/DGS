import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, BookOpen, Target, CheckCircle } from 'lucide-react'

const lessons = [
  {
    id: 'basics-1',
    title: 'Grundlagen: Begrüßungen',
    description: 'Lerne grundlegende Begrüßungen und Höflichkeitsfloskeln in DGS',
    level: 1,
    duration: '15 Minuten',
    objectives: [
      'Hallo, Auf Wiedersehen, Danke sagen',
      'Grundlegende Gebärdenformen verstehen',
      'Höflichkeit in der Gebärdensprache'
    ],
    vocabulary: ['Hallo', 'Auf Wiedersehen', 'Danke', 'Bitte', 'Entschuldigung'],
    content: {
      introduction: 'In dieser Lektion lernst du die grundlegenden Begrüßungen in der Deutschen Gebärdensprache. Diese Gebärden sind wichtig für den täglichen Umgang.',
      steps: [
        '1. Übe die Gebärde für "Hallo": Flache Hand heben und von links nach rechts bewegen.',
        '2. Lerne "Auf Wiedersehen": Flache Hand vom Gesicht weg bewegen.',
        '3. Praktiziere "Danke": Flache Hand auf dem Herzen.',
        '4. Übe vor dem Spiegel und wiederhole 5-10 mal.',
        '5. Teste dein Wissen im zugehörigen Test.'
      ],
      tips: [
        'Achte auf die Handform und Bewegung.',
        'Übe langsam und steigere das Tempo.',
        'Verwende Mimik, um die Bedeutung zu verstärken.'
      ]
    }
  },
  {
    id: 'basics-2',
    title: 'Grundlagen: Familie und Beziehungen',
    description: 'Erweitere dein Vokabular um Familienmitglieder und Beziehungen',
    level: 1,
    duration: '20 Minuten',
    objectives: [
      'Familienmitglieder benennen können',
      'Beziehungen ausdrücken',
      'Persönliche Informationen austauschen'
    ],
    vocabulary: ['Familie', 'Mutter', 'Vater', 'Bruder', 'Schwester', 'Eltern', 'Kind'],
    content: {
      introduction: 'Diese Lektion behandelt Familienbezeichnungen und wie man Beziehungen in DGS ausdrückt.',
      steps: [
        '1. Lerne die Gebärden für Familienmitglieder.',
        '2. Übe Kombinationen wie "meine Mutter".',
        '3. Praktiziere Fragen wie "Wer ist das?".',
        '4. Wiederhole die Gebärden vor dem Spiegel.',
        '5. Teste dein Wissen in den Übungen.'
      ],
      tips: [
        'Verwende die richtige Handform für jedes Wort.',
        'Achte auf die Reihenfolge in Sätzen.',
        'Übe mit einem Partner für besseres Feedback.'
      ]
    }
  },
  // Add more lessons as needed
]

interface LessonPageProps {
  params: {
    id: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = lessons.find(l => l.id === params.id)

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Lektion nicht gefunden</h1>
            <Link href="/lessons">
              <Button>Zurück zu Lektionen</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/lessons">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zu Lektionen
            </Button>
          </Link>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">Level {lesson.level}</Badge>
              <span className="text-sm text-gray-600">{lesson.duration}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-gray-600 mb-4">{lesson.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Einführung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{lesson.content.introduction}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Lernschritte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  {lesson.content.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lernziele</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lesson.objectives.map((objective, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vokabular</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lesson.vocabulary.map((word, idx) => (
                    <Badge key={idx} variant="outline">{word}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tipps</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  {lesson.content.tips.map((tip, idx) => (
                    <li key={idx}>• {tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nächste Schritte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/tests/level${lesson.level}-greetings`}>
                  <Button className="w-full">
                    Test absolvieren
                  </Button>
                </Link>
                <Link href="/vocabulary">
                  <Button variant="outline" className="w-full">
                    Wörterbuch erkunden
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
