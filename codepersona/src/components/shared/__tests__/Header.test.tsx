import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from '../Header'
import { ThemeProvider } from '@/components/theme-provider'
import { useTheme } from 'next-themes'

// Mock next-themes useTheme hook
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

describe('Header', () => {
  beforeEach(() => {
    ;(useTheme as jest.Mock).mockReturnValue({
      setTheme: jest.fn(),
      theme: 'light',
    })
  })

  it('renders the brand name', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
      </ThemeProvider>
    )
    expect(screen.getByText('CodePersona')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
      </ThemeProvider>
    )
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /premium/i })).toBeInTheDocument()
  })

  it('renders the GitHub icon link', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
      </ThemeProvider>
    )
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })

  it('renders the theme toggle button', () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
      </ThemeProvider>
    )
    expect(
      screen.getByRole('button', { name: /toggle theme/i })
    ).toBeInTheDocument()
  })
})
