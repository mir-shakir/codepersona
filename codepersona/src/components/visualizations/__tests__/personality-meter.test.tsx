import React from 'react'
import { render, screen } from '@testing-library/react'
import { PersonalityMeter } from '../personality-meter'

describe('PersonalityMeter', () => {
  it('renders the personality name', () => {
    render(
      <PersonalityMeter score={0.75} personalityName="The Midnight Warrior" />
    )
    expect(screen.getByText('The Midnight Warrior')).toBeInTheDocument()
  })

  it('renders the score as a percentage', () => {
    render(
      <PersonalityMeter score={0.75} personalityName="The Midnight Warrior" />
    )
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('renders the SVG circle for the meter', () => {
    render(<PersonalityMeter score={0.5} personalityName="Test Personality" />)
    const circles = screen.getAllByRole('img', { hidden: true }) // SVG elements often get img role
    expect(circles.length).toBeGreaterThanOrEqual(1) // At least one SVG circle
  })

  it('applies the correct stroke-dashoffset based on score', () => {
    render(<PersonalityMeter score={0.5} personalityName="Test Personality" />)
    const progressCircle = screen
      .getByRole('img', { hidden: true })
      .querySelector('circle:last-child')
    expect(progressCircle).toBeInTheDocument()
    // Calculate expected dashoffset for 0.5 score (half circle)
    const circumference = 2 * Math.PI * 45 // radius is 45
    const expectedDashoffset = circumference - 0.5 * circumference
    expect(progressCircle).toHaveAttribute(
      'stroke-dashoffset',
      expectedDashoffset.toString()
    )
  })
})
