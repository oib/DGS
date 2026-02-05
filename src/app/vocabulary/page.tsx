import { GetStaticProps } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DGS_VOCABULARY, getVocabularyForLevel } from '@/data/dgsVocabulary'
import { BookOpen, ArrowLeft, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function VocabularyPage() {
  const level1Words = getVocabularyForLevel(1)
  const level2Words = getVocabularyForLevel(2)
  const level3Words = getVocabularyForLevel(3)
  const level4Words = getVocabularyForLevel(4)
  const level5Words = getVocabularyForLevel(5)
  const level6Words = getVocabularyForLevel(6)
  const level7Words = getVocabularyForLevel(7)
  const level8Words = getVocabularyForLevel(8)
  const level9Words = getVocabularyForLevel(9)
  const level10Words = getVocabularyForLevel(10)

  const renderVocabularySection = (levelWords: any, level: number) => {
    const categories = Object.keys(levelWords)

    return (
      <div className="space-y-6">
        {categories.map(category => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white capitalize">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {levelWords[category].map((word: any, index: number) => (
                <Card key={index} className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {word.german}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        Level {word.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                      {word.english}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {word.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                DGS Wörterbuch
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                926 Zeichen nach Level und Kategorie geordnet
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <Tabs defaultValue="level1" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="level1" className="flex items-center gap-2">
              <Badge variant="secondary">1</Badge>
              Anfänger ({Object.values(level1Words).flat().length} Wörter)
            </TabsTrigger>
            <TabsTrigger value="level2" className="flex items-center gap-2">
              <Badge variant="secondary">2</Badge>
              Grundlagen ({Object.values(level2Words).flat().length} Wörter)
            </TabsTrigger>
            <TabsTrigger value="level3" className="flex items-center gap-2">
              <Badge variant="secondary">3</Badge>
              Fortgeschritten ({Object.values(level3Words).flat().length} Wörter)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="level1" className="mt-6">
            {renderVocabularySection(level1Words, 1)}
          </TabsContent>

          <TabsContent value="level2" className="mt-6">
            {renderVocabularySection(level2Words, 2)}
          </TabsContent>

          <TabsContent value="level3" className="mt-6">
            {renderVocabularySection(level3Words, 3)}
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Wie man DGS Zeichen lernt
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">📚 Lernmethoden</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Wiederhole jedes Zeichen 5-10 mal</li>
                <li>• Übe vor dem Spiegel</li>
                <li>• Achte auf Handform und Bewegung</li>
                <li>• Nutze die Beschreibungen als Gedächtnisstütze</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Lernziele</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Level 1: Grundlegende Kommunikation</li>
                <li>• Level 2: Tägliche Gespräche</li>
                <li>• Level 3: Komplexe Themen</li>
                <li>• Alle Level: Kulturelles Verständnis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
