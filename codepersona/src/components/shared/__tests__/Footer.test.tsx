import React from 'react'
import { render, screen } from '@testing-library/react'
import { Footer } from '../Footer'

describe('Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(
      screen.getByText(
        new RegExp(`© ${currentYear} CodePersona. All rights reserved.`, 'i')
      )
    ).toBeInTheDocument()
  })

  it('renders the GitHub link', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/your-repo'
    )
  })

  it('renders privacy policy and terms of service links', () => {
    render(<Footer />)
    expect(
      screen.getByRole('link', { name: /privacy policy/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /terms of service/i })
    ).toBeInTheDocument()
  })
})
