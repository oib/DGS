'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ArrowLeft, Search, ThumbsDown, ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/language-provider'

export default function VocabularyPage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [badExplanations, setBadExplanations] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)
  const [allLevelData, setAllLevelData] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [totalWords, setTotalWords] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('badExplanations')
    if (saved) {
      setBadExplanations(new Set(JSON.parse(saved)))
    }
  }, [])

  // Load all levels on initial mount
  useEffect(() => {
    if (mounted && !selectedLevel) {
      loadAllLevels()
    }
  }, [mounted, selectedLevel])

  // Load specific level when selected
  useEffect(() => {
    if (selectedLevel && mounted) {
      loadLevelData(selectedLevel)
    }
  }, [selectedLevel, mounted])

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load search results when search query changes
  useEffect(() => {
    if (searchQuery.trim() && mounted) {
      performSearch(searchQuery)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, mounted])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const loadAllLevels = async () => {
    setLoading(true)
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
    const allData: any = {}
    let total = 0

    try {
      // Load all levels 1-10
      for (let level = 1; level <= 10; level++) {
        try {
          const response = await fetch(`/api/vocabulary/level/${level}`)
          if (!response.ok) throw new Error(`Failed to load level ${level}`)
          const data = await response.json()
          allData[level] = data

          // Count total words across all categories in this level
          Object.values(data).forEach((categoryWords: any) => {
            total += categoryWords.length
          })
        } catch (error) {
          console.warn(`Failed to load level ${level}:`, error)
          allData[level] = {}
        }
      }

      setAllLevelData(allData)
      setTotalWords(total)
    } catch (error) {
      console.error('Error loading all levels:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadLevelData = async (level: number) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/vocabulary/level/${level}`)
      if (!response.ok) throw new Error(`Failed to load level ${level}`)
      const data = await response.json()
      // Update allLevelData with the specific level data
      setAllLevelData((prev: any) => ({
        ...prev,
        [level]: data
      }))
    } catch (error) {
      console.error('Error loading level data:', error)
    } finally {
      setLoading(false)
    }
  }

  const performSearch = async (query: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/vocabulary/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error('Search failed')
      const results = await response.json()
      setSearchResults(results)
    } catch (error) {
      console.error('Error performing search:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate total words from database (simplified estimate)
  useEffect(() => {
    if (mounted) {
      // We'll implement a proper count later
      setTotalWords(352) // Updated based on seeded data
    }
  }, [mounted])

  const markAsBadExplanation = (wordKey: string) => {
    const newBadExplanations = new Set(badExplanations)
    if (newBadExplanations.has(wordKey)) {
      newBadExplanations.delete(wordKey)
    } else {
      newBadExplanations.add(wordKey)
    }
    setBadExplanations(newBadExplanations)
    localStorage.setItem('badExplanations', JSON.stringify(Array.from(newBadExplanations)))
  }

  const getWordKey = (word: any) => `${word.german}-${word.english}-${word.level}`

  const getLevelName = (level: number) => {
    const levelNames: Record<number, { de: string; en: string }> = {
      1: { de: 'Level 1', en: 'Level 1' },
      2: { de: 'Level 2', en: 'Level 2' },
      3: { de: 'Level 3', en: 'Level 3' },
      4: { de: 'Level 4', en: 'Level 4' },
      5: { de: 'Level 5', en: 'Level 5' },
      6: { de: 'Level 6', en: 'Level 6' },
      7: { de: 'Level 7', en: 'Level 7' },
      8: { de: 'Level 8', en: 'Level 8' },
      9: { de: 'Level 9', en: 'Level 9' },
      10: { de: 'Level 10', en: 'Level 10' }
    }
    const lang = t('back') === 'Back' ? 'en' : 'de'
    return levelNames[level]?.[lang] || `Level ${level}`
  }

  const renderVocabularySection = (levelWords: any, level: number) => {
    // Handle search results specially
    if (levelWords.search) {
      const searchWords = levelWords.search
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchWords.map((word: any, index: number) => renderWordCard(word, index))}
        </div>
      )
    }

    const categories = Object.keys(levelWords)
    const filteredWords = searchQuery.trim() ?
      searchResults.filter(word => word.difficulty === level) :
      Object.values(levelWords).flat()

    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              {t('back') === 'Back' ? 'Loading vocabulary...' : 'Vokabular wird geladen...'}
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {searchQuery.trim() ? (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {t('back') === 'Back' ? 'Search Results' : 'Suchergebnisse'} ({filteredWords.length} {t('back') === 'Back' ? 'words' : 'Wörter'})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWords.map((word: any, index: number) => renderWordCard(word, index))}
            </div>
          </div>
        ) : (
          categories.map(category => {
            const categoryWords = levelWords[category] || []
            if (categoryWords.length === 0) return null

            return (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white capitalize">
                  {category.replace(/_/g, ' ')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryWords.map((word: any, index: number) => renderWordCard(word, index))}
                </div>
              </div>
            )
          })
        )}
      </div>
    )
  }

  const renderWordCard = (word: any, index: number) => {
    const wordKey = getWordKey(word)
    const isMarkedBad = badExplanations.has(wordKey)

    return (
      <Card key={index} className={`dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow ${isMarkedBad ? 'border-red-300 dark:border-red-600' : ''}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
              {word.german}
            </h4>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Level {word.difficulty}
              </Badge>
              <button
                onClick={() => markAsBadExplanation(wordKey)}
                className={`p-1 rounded transition-colors ${
                  isMarkedBad
                    ? 'text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20'
                    : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
                title={isMarkedBad ? (t('back') === 'Back' ? 'Mark as well explained' : 'Als gut erklärt markieren') : (t('back') === 'Back' ? 'Mark as poorly explained' : 'Als schlecht erklärt markieren')}
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
            {word.english}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {word.description}
          </p>
          {isMarkedBad && (
            <div className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
              <ThumbsDown className="w-3 h-3" />
              <Link
                href={`/suggest?word=${encodeURIComponent(word.german)}&english=${encodeURIComponent(word.english)}&description=${encodeURIComponent(word.description)}`}
                className="hover:underline"
              >
                {t('back') === 'Back' ? 'Suggest improvement' : 'Verbesserung vorschlagen'}
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  if (!mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            {t('back') === 'Back' ? 'Loading...' : 'Lädt...'}
          </p>
        </div>
      </div>
    )
  }

  const levels = [
    { number: 1, words: allLevelData[1] || {}, name: getLevelName(1) },
    { number: 2, words: allLevelData[2] || {}, name: getLevelName(2) },
    { number: 3, words: allLevelData[3] || {}, name: getLevelName(3) },
    { number: 4, words: allLevelData[4] || {}, name: getLevelName(4) },
    { number: 5, words: allLevelData[5] || {}, name: getLevelName(5) },
    { number: 6, words: allLevelData[6] || {}, name: getLevelName(6) },
    { number: 7, words: allLevelData[7] || {}, name: getLevelName(7) },
    { number: 8, words: allLevelData[8] || {}, name: getLevelName(8) },
    { number: 9, words: allLevelData[9] || {}, name: getLevelName(9) },
    { number: 10, words: allLevelData[10] || {}, name: getLevelName(10) }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('back') === 'Back' ? 'Back to Home' : 'Zurück zur Startseite'}
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('back') === 'Back' ? 'DGS Vocabulary' : 'DGS Vokabular'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {t('back') === 'Back' ? `${totalWords} words across 10 levels` : `${totalWords} Wörter über 10 Level`}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('back') === 'Back' ? 'Search vocabulary...' : 'Vokabular suchen...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Level Selection */}
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 mb-8">
          {levels.map((level) => (
            <Button
              key={level.number}
              variant={selectedLevel === level.number ? "default" : "outline"}
              onClick={() => setSelectedLevel(selectedLevel === level.number ? null : level.number)}
              className="text-sm"
            >
              {level.name}
            </Button>
          ))}
        </div>

        {/* Content */}
        {selectedLevel ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {getLevelName(selectedLevel)}
            </h2>
            {renderVocabularySection(allLevelData[selectedLevel], selectedLevel)}
          </div>
        ) : searchQuery.trim() && searchResults.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('back') === 'Back' ? 'Search Results' : 'Suchergebnisse'}
            </h2>
            {renderVocabularySection({ search: searchResults }, 0)}
          </div>
        ) : (
          // Show all levels by default
          <div className="space-y-8">
            {Object.keys(allLevelData).length > 0 ? (
              Object.keys(allLevelData).map(levelNum => {
                const levelNumber = parseInt(levelNum)
                const levelWords = allLevelData[levelNumber]
                if (!levelWords || Object.keys(levelWords).length === 0) return null

                return (
                  <div key={levelNumber}>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                      {getLevelName(levelNumber)}
                    </h2>
                    {renderVocabularySection(levelWords, levelNumber)}
                  </div>
                )
              })
            ) : loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('back') === 'Back' ? 'Loading all vocabulary...' : 'Alle Vokabeln werden geladen...'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('back') === 'Back' ? 'No Vocabulary Found' : 'Keine Vokabeln gefunden'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('back') === 'Back' ? 'Unable to load vocabulary data' : 'Vokabeldaten konnten nicht geladen werden'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
