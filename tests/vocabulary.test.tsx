import { render, screen } from '@testing-library/react'
import VocabularyPage from '@/app/vocabulary/page'

describe('VocabularyPage', () => {
  it('renders the vocabulary page with title', () => {
    render(<VocabularyPage />)
    
    expect(screen.getByText('DGS Wörterbuch')).toBeInTheDocument()
    expect(screen.getByText(/Zeichen nach Level und Kategorie geordnet/)).toBeInTheDocument()
  })

  it('renders level tabs', () => {
    render(<VocabularyPage />)
    
    expect(screen.getByText(/Anfänger/)).toBeInTheDocument()
    expect(screen.getByText(/Grundlagen/)).toBeInTheDocument()
    expect(screen.getByText(/Fortgeschritten/)).toBeInTheDocument()
  })

  it('renders back button', () => {
    render(<VocabularyPage />)
    
    expect(screen.getByText('Zurück')).toBeInTheDocument()
  })
})
