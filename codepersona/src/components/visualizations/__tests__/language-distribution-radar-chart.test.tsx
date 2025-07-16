import React from 'react'
import { render, screen } from '@testing-library/react'
import { LanguageDistributionRadarChart } from '../language-distribution-radar-chart'

// Mock ResponsiveContainer to render its children directly for testing
jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div style={{ width: '100%', height: '100%' }}>{children}</div>
  ),
}))

describe('LanguageDistributionRadarChart', () => {
  const mockData = {
    allLanguages: {
      TypeScript: 1000,
      JavaScript: 800,
      Python: 500,
      Java: 300,
    },
  }

  it('renders the card title', () => {
    render(<LanguageDistributionRadarChart data={mockData} />)
    expect(screen.getByText('Language Distribution')).toBeInTheDocument()
  })

  it('renders the RadarChart component', () => {
    render(<LanguageDistributionRadarChart data={mockData} />)
    // Check for SVG element rendered by Recharts
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
  })

  it('displays language subjects on the chart', () => {
    render(<LanguageDistributionRadarChart data={mockData} />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('Java')).toBeInTheDocument()
  })
})
