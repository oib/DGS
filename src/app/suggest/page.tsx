'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { searchVocabulary } from '@/data/dgsVocabulary'
import { ArrowLeft, Search, Send, Lightbulb } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export default function SuggestPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedWord, setSelectedWord] = useState<any>(null)
  const [suggestion, setSuggestion] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = searchVocabulary(searchQuery)
      setSearchResults(results.slice(0, 10))
      setIsDropdownOpen(true)
      setHighlightedIndex(-1)
    } else {
      setSearchResults([])
      setIsDropdownOpen(false)
      setHighlightedIndex(-1)
    }
  }, [searchQuery])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || searchResults.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < searchResults.length) {
          handleWordSelect(searchResults[highlightedIndex])
        }
        break
      case 'Escape':
        setIsDropdownOpen(false)
        setHighlightedIndex(-1)
        break
    }
  }

  const handleWordSelect = (word: any) => {
    setSelectedWord(word)
    setSearchQuery(word.german)
    setIsDropdownOpen(false)
    setHighlightedIndex(-1)
  }

  const handleSend = () => {
    if (!selectedWord || !suggestion.trim()) return

    const subject = encodeURIComponent(`Verbesserungsvorschlag für: ${selectedWord.german}`)
    const body = encodeURIComponent(
      `Wort: ${selectedWord.german}\n` +
      `Englisch: ${selectedWord.english}\n` +
      `Aktuelle Erklärung: ${selectedWord.description}\n\n` +
      `Verbesserungsvorschlag:\n${suggestion}`
    )
    
    window.location.href = `mailto:oib@bubuit.net?subject=${subject}&body=${body}`
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border h-16"></div>
            <div className="bg-white rounded-lg p-6 shadow-sm border h-64"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft suppressHydrationWarning className="w-4 h-4 mr-2" />
                Zurück
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Verbesserungsvorschlag
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Hilf uns, Erklärungen zu verbessern
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Lightbulb suppressHydrationWarning className="w-5 h-5 text-yellow-500" />
              Besseres Zeichen beschreiben
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Wort suchen
              </label>
              <div className="relative">
                <Search suppressHydrationWarning className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Geben Sie ein Wort ein..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {isDropdownOpen && searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
                  {searchResults.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => handleWordSelect(word)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      className={`w-full px-4 py-2 text-left text-gray-900 dark:text-white ${
                        index === highlightedIndex
                          ? 'bg-blue-100 dark:bg-blue-900/50'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span className="font-medium">{word.german}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({word.english})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedWord && (
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {selectedWord.german}
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                  {selectedWord.english}
                </p>
                <div className="bg-white dark:bg-gray-800 rounded p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Aktuelle Erklärung:</span>
                    <br />
                    {selectedWord.description}
                  </p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ihr Verbesserungsvorschlag
              </label>
              <textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder="Beschreiben Sie hier die Zeichengebärde genauer..."
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <Button
              onClick={handleSend}
              disabled={!selectedWord || !suggestion.trim()}
              className="w-full"
              size="lg"
            >
              <Send suppressHydrationWarning className="w-4 h-4 mr-2" />
              An oib@bubuit.net senden
            </Button>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Ihr Vorschlag wird per E-Mail gesendet. Vielen Dank für Ihre Mithilfe!
          </p>
        </div>
      </div>
    </div>
  )
}
