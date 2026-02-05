import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    )
    
    // Check that the button is rendered (sun/moon icon)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
