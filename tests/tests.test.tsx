import { render, screen } from '@testing-library/react'
import TestsPage from '@/app/tests/page'

// Mock the language provider
jest.mock('@/components/language-provider', () => ({
  useLanguage: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'back_to_home': 'Zurück zur Startseite',
        'tests_title': 'DGS Tests',
        'tests_subtitle': 'Teste deine Gebärdensprachkenntnisse',
        'level': 'Level',
        'questions': 'Fragen',
        'minutes': 'Minuten',
        'passing_score': 'Bestehensnote',
        'take_test': 'Test starten',
      }
      return translations[key] || key
    },
  }),
}))

describe('TestsPage', () => {
  it('renders the tests page', () => {
    render(<TestsPage />)
    
    expect(screen.getByText('DGS Tests')).toBeInTheDocument()
  })

  it('renders back button', () => {
    render(<TestsPage />)
    
    // Use getAllByText since the button appears twice
    const buttons = screen.getAllByText('Zurück zur Startseite')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
