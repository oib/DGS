import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ArrowLeft, Clock, Target, CheckCircle, Play } from 'lucide-react'

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
    status: 'available'
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
    vocabulary: ['Mutter', 'Vater', 'Bruder', 'Schwester', 'Familie'],
    status: 'available'
  },
  {
    id: 'basics-3',
    title: 'Grundlagen: Farben und Zahlen',
    description: 'Lerne Farben und grundlegende Zahlen in DGS',
    level: 1,
    duration: '25 Minuten',
    objectives: [
      'Grundfarben benennen',
      'Zahlen 1-10 gebärden',
      'Einfache Beschreibungen machen'
    ],
    vocabulary: ['Rot', 'Blau', 'Gelb', 'Grün', 'Schwarz', 'Weiß', 'Eins', 'Zwei', 'Drei'],
    status: 'available'
  },
  {
    id: 'communication-1',
    title: 'Kommunikation: Tägliche Aktivitäten',
    description: 'Beschreibe deinen Tagesablauf und alltägliche Aktivitäten',
    level: 2,
    duration: '30 Minuten',
    objectives: [
      'Tageszeiten ausdrücken',
      'Alltägliche Aktivitäten beschreiben',
      'Zeitliche Abläufe darstellen'
    ],
    vocabulary: ['Zeit', 'Heute', 'Morgen', 'Essen', 'Trinken', 'Schlafen'],
    status: 'available'
  },
  {
    id: 'communication-2',
    title: 'Kommunikation: Wetter und Natur',
    description: 'Spreche über Wetter, Natur und Umwelt in DGS',
    level: 2,
    duration: '25 Minuten',
    objectives: [
      'Wetterbedingungen beschreiben',
      'Naturphänomene erklären',
      'Umweltbezogene Themen diskutieren'
    ],
    vocabulary: ['Sonne', 'Regen', 'Wind', 'Kalt', 'Warm', 'Wetter'],
    status: 'available'
  },
  {
    id: 'advanced-1',
    title: 'Fortgeschritten: Berufe und Arbeit',
    description: 'Erweitere dein Vokabular um Berufe und Arbeitswelten',
    level: 3,
    duration: '35 Minuten',
    objectives: [
      'Verschiedene Berufe benennen',
      'Arbeitsabläufe beschreiben',
      'Berufliche Situationen darstellen'
    ],
    vocabulary: ['Lehrer', 'Arzt', 'Koch', 'Student', 'Arbeit'],
    status: 'available'
  },
  {
    id: 'advanced-2',
    title: 'Fortgeschritten: Gesundheit und Wohlbefinden',
    description: 'Lerne über Gesundheit, Krankheiten und medizinische Themen',
    level: 4,
    duration: '40 Minuten',
    objectives: [
      'Gesundheitszustände beschreiben',
      'Bei Arztbesuchen kommunizieren',
      'Körperteile benennen'
    ],
    vocabulary: ['Krank', 'Schmerzen', 'Kopf', 'Arm', 'Bein', 'Herz'],
    status: 'available'
  },
  {
    id: 'expert-1',
    title: 'Experte: Abstrakte Konzepte',
    description: 'Erkunde komplexe philosophische und abstrakte Themen in DGS',
    level: 9,
    duration: '45 Minuten',
    objectives: [
      'Abstrakte Ideen ausdrücken',
      'Komplexe Emotionen beschreiben',
      'Philosophische Diskussionen führen'
    ],
    vocabulary: ['Philosophie', 'Bewusstsein', 'Existenz', 'Wahrheit', 'Ethik'],
    status: 'available'
  }
]

export default function LessonsPage() {
  const groupedLessons = lessons.reduce((acc, lesson) => {
    const level = lesson.level
    if (!acc[level]) acc[level] = []
    acc[level].push(lesson)
    return acc
  }, {} as Record<number, typeof lessons>)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Startseite
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
            DGS Lektionen
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Strukturierte Lernpfade für die Deutsche Gebärdensprache
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(groupedLessons).map(([level, levelLessons]) => (
            <Card key={level} className="border-2 border-blue-200">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Level {level}
                  <Badge variant="secondary">{levelLessons.length} Lektionen</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {levelLessons.map((lesson) => (
                    <div key={lesson.id} className="p-3 bg-white rounded-lg border">
                      <h4 className="font-semibold text-sm mb-1">{lesson.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{lesson.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {lesson.duration}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {lesson.vocabulary.length} Wörter
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Wie funktionieren die Lektionen?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">📚 Lernmethode</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Schritt-für-Schritt Anleitungen</li>
                <li>• Interaktive Übungen</li>
                <li>• Vokabel-Training</li>
                <li>• Praxisbeispiele</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Lernziele</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Praktische Kommunikationsfähigkeiten</li>
                <li>• Kulturelles Verständnis der DGS</li>
                <li>• Selbstvertrauen im Gebärden</li>
                <li>• Teilnahme an Gesprächen</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-2">🚧 Lektionen in Entwicklung</h3>
            <p className="text-gray-600 mb-4">
              Die interaktiven Lektionen werden bald verfügbar sein. In der Zwischenzeit kannst du:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/vocabulary">
                <Button>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Wörterbuch erkunden
                </Button>
              </Link>
              <Link href="/tests">
                <Button variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Tests absolvieren
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
