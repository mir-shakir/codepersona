import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProductivityRhythmChart } from '../productivity-rhythm-chart'

// Mock ResponsiveContainer to render its children directly for testing
jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div style={{ width: '100%', height: '100%' }}>{children}</div>
  ),
}))

describe('ProductivityRhythmChart', () => {
  const mockData = {
    commitFrequency: {
      monday: 10,
      tuesday: 15,
      wednesday: 5,
      thursday: 20,
      friday: 12,
      saturday: 8,
      sunday: 3,
      '0': 1,
      '1': 2,
      '2': 3,
      '3': 4,
      '4': 5,
      '5': 6,
      '6': 7,
      '7': 8,
      '8': 9,
      '9': 10,
      '10': 11,
      '11': 12,
      '12': 13,
      '13': 14,
      '14': 15,
      '15': 16,
      '16': 17,
      '17': 18,
      '18': 19,
      '19': 20,
      '20': 21,
      '21': 22,
      '22': 23,
      '23': 24,
    },
  }

  it('renders the card title', () => {
    render(<ProductivityRhythmChart data={mockData} />)
    expect(screen.getByText('Productivity Rhythm')).toBeInTheDocument()
  })

  it('renders daily activity chart title', () => {
    render(<ProductivityRhythmChart data={mockData} />)
    expect(screen.getByText('Daily Activity')).toBeInTheDocument()
  })

  it('renders hourly activity chart title', () => {
    render(<ProductivityRhythmChart data={mockData} />)
    expect(screen.getByText('Hourly Activity')).toBeInTheDocument()
  })

  it('renders two BarChart components', () => {
    render(<ProductivityRhythmChart data={mockData} />)
    // Recharts renders an SVG for each chart
    const svgs = screen.getAllByRole('img', { hidden: true })
    expect(svgs.length).toBeGreaterThanOrEqual(2) // At least two SVGs for two charts
  })
})
