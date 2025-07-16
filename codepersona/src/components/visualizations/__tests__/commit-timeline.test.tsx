import React from 'react'
import { render, screen } from '@testing-library/react'
import { CommitTimeline } from '../commit-timeline'

// Mock ResponsiveContainer to render its children directly for testing
jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div style={{ width: '100%', height: '100%' }}>{children}</div>
  ),
}))

describe('CommitTimeline', () => {
  const mockData = {
    commits: {
      'user/repo1': [
        { commit: { author: { date: '2025-07-01T10:00:00Z' } } },
        { commit: { author: { date: '2025-07-01T11:00:00Z' } } },
        { commit: { author: { date: '2025-07-02T12:00:00Z' } } },
      ],
      'user/repo2': [{ commit: { author: { date: '2025-07-01T13:00:00Z' } } }],
    },
  }

  it('renders the card title', () => {
    render(<CommitTimeline data={mockData} />)
    expect(screen.getByText('Commit Timeline')).toBeInTheDocument()
  })

  it('renders the LineChart component', () => {
    render(<CommitTimeline data={mockData} />)
    // Check for SVG element rendered by Recharts
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument()
  })

  it('displays dates on the x-axis', () => {
    render(<CommitTimeline data={mockData} />)
    expect(screen.getByText('Jul 01')).toBeInTheDocument()
    expect(screen.getByText('Jul 02')).toBeInTheDocument()
  })
})
