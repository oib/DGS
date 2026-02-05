'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ArrowLeft, Clock, Target, CheckCircle, Play } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Lesson {
  id: string;
  title: string;
  description: string;
  level: number;
  duration: string;
  objectives: string[];
  vocabulary: string[];
  status: string;
}

const lessons: Lesson[] = [
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
    vocabulary: ['Familie', 'Mutter', 'Vater', 'Bruder', 'Schwester'],
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
    vocabulary: ['Rot', 'Blau', 'Gelb', 'Grün', 'Eins', 'Zwei', 'Drei'],
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
    id: 'level5-1',
    title: 'Level 5: Erweiterte Kommunikation',
    description: 'Vertiefe deine Kommunikationsfähigkeiten in komplexen Situationen',
    level: 5,
    duration: '35 Minuten',
    objectives: [
      'Komplexe Sätze bilden',
      'Abstrakte Konzepte ausdrücken',
      'Professionelle Gespräche führen'
    ],
    vocabulary: ['Denken', 'Fühlen', 'Verstehen', 'Erklären', 'Diskutieren'],
    status: 'available'
  },
  {
    id: 'level6-1',
    title: 'Level 6: Fachsprache',
    description: 'Lerne fachspezifische Begriffe und Terminologie',
    level: 6,
    duration: '40 Minuten',
    objectives: [
      'Fachbegriffe anwenden',
      'Spezialisierte Themen besprechen',
      'Professionelle Kommunikation'
    ],
    vocabulary: ['Wissenschaft', 'Technologie', 'Kunst', 'Literatur', 'Geschichte'],
    status: 'available'
  },
  {
    id: 'level7-1',
    title: 'Level 7: Kulturelle Aspekte',
    description: 'Entdecke kulturelle Nuancen und Traditionen in DGS',
    level: 7,
    duration: '45 Minuten',
    objectives: [
      'Kulturelle Unterschiede verstehen',
      'Traditionen ausdrücken',
      'Interkulturelle Kommunikation'
    ],
    vocabulary: ['Kultur', 'Tradition', 'Gewohnheit', 'Brauch', 'Identität'],
    status: 'available'
  },
  {
    id: 'level8-1',
    title: 'Level 8: Fortgeschrittene Grammatik',
    description: 'Meistere komplexe grammatikalische Strukturen',
    level: 8,
    duration: '50 Minuten',
    objectives: [
      'Komplexe Satzstrukturen bilden',
      'Zeitformen korrekt anwenden',
      'Nuancierte Ausdrücke verwenden'
    ],
    vocabulary: ['Vergangenheit', 'Zukunft', 'Bedingung', 'Möglichkeit', 'Wahrscheinlichkeit'],
    status: 'available'
  },
  {
    id: 'level9-1',
    title: 'Level 9: Spezialisierte Themen',
    description: 'Spezialisiere dich auf fortgeschrittene Themenbereiche',
    level: 9,
    duration: '55 Minuten',
    objectives: [
      'Spezialisierte Vokabulare beherrschen',
      'Fachdiskussionen führen',
      'Expertenwissen anwenden'
    ],
    vocabulary: ['Experte', 'Spezialist', 'Forschung', 'Analyse', 'Innovation'],
    status: 'available'
  },
  {
    id: 'level10-1',
    title: 'Level 10: Gebärdensprache-Meister',
    description: 'Erreiche das höchste Niveau der DGS-Beherrschung',
    level: 10,
    duration: '60 Minuten',
    objectives: [
      'Flüssig und natürlich gebärden',
      'Alle Nuancen ausdrücken',
      'Als Muttersprachler kommunizieren'
    ],
    vocabulary: ['Meisterschaft', 'Perfektion', 'Ausdruckskraft', 'Intuition', 'Meisterwerk'],
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
  },
]

const groupedLessons = lessons.reduce((acc: any, lesson: Lesson) => {
  const level = lesson.level
  if (!acc[level]) acc[level] = []
  acc[level].push(lesson)
  return acc
}, {}) as Record<number, Lesson[]>

// Translation dictionaries
const translations = {
  en: {
    'back_to_home': 'Back to Home',
    'lessons_title': 'DGS Lessons',
    'lessons_subtitle': 'Structured learning paths for German Sign Language',
    'lessons_count': 'lessons',
    'vocab_count': 'words',
    'learning_methods': 'Learning Methods',
    'learning_goals': 'Learning Goals',
    'how_it_works': 'How do the lessons work?',
    'lesson_in_development': 'Lessons in Development',
    'coming_soon': 'Interactive lessons will be available soon. In the meantime, you can:',
    'explore_vocab': 'Explore Vocabulary',
    'take_tests': 'Take Tests',
  } as Record<string, string>,
  de: {
    'back_to_home': 'Zurück zur Startseite',
    'lessons_title': 'DGS Lektionen',
    'lessons_subtitle': 'Strukturierte Lernpfade für die Deutsche Gebärdensprache',
    'lessons_count': 'Lektionen',
    'vocab_count': 'Wörter',
    'learning_methods': 'Lernmethoden',
    'learning_goals': 'Lernziele',
    'how_it_works': 'Wie funktionieren die Lektionen?',
    'lesson_in_development': 'Lektionen in Entwicklung',
    'coming_soon': 'Die interaktiven Lektionen werden bald verfügbar sein. In der Zwischenzeit kannst du:',
    'explore_vocab': 'Wörterbuch erkunden',
    'take_tests': 'Tests absolvieren',
  } as Record<string, string>
}

export default function LessonsPage() {
  const [language, setLanguage] = useState<'en' | 'de'>('de')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as 'en' | 'de'
    const browserLang = navigator.language.startsWith('de') ? 'de' : 'en'
    const initialLang = savedLang || browserLang
    setLanguage(initialLang)
  }, [])

  const t = (key: string): string => {
    return translations[language][key] || translations.de[key] || key
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('back_to_home')}
            </Button>
          </Link>

          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
            {t('lessons_title')}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {t('lessons_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(groupedLessons).map(([level, levelLessons]) => (
            <Card key={level} className="border-2 border-blue-200">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Level {level}
                  <Badge variant="secondary">{levelLessons.length} {t('lessons_count')}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {levelLessons.map((lesson) => (
                    <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            {lesson.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-3 h-3" />
                              <span>{lesson.duration}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {lesson.vocabulary.length} {t('vocab_count')}
                            </Badge>
                          </div>
                          <div className="mt-3">
                            <h4 className="text-sm font-semibold mb-2">{t('learning_goals')}:</h4>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {lesson.objectives.map((objective, idx) => (
                                <li key={idx}>• {objective}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            {t('how_it_works')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">📚 {t('learning_methods')}</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Schritt-für-Schritt Anleitungen</li>
                <li>• Interaktive Übungen</li>
                <li>• Vokabel-Training</li>
                <li>• Praxisbeispiele</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 {t('learning_goals')}</h4>
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
            <h3 className="text-lg font-semibold mb-2">🚧 {t('lesson_in_development')}</h3>
            <p className="text-gray-600 mb-4">
              {t('coming_soon')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/vocabulary">
                <Button>
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t('explore_vocab')}
                </Button>
              </Link>
              <Link href="/tests">
                <Button variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  {t('take_tests')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
