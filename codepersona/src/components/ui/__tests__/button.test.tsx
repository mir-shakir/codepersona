import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  it('renders the button with default variant and size', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-gradient-to-r') // Check for the custom gradient class
    expect(button).toHaveClass('h-10')
  })

  it('renders the button with a different variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button', { name: /secondary/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-secondary')
  })

  it('renders the button with a different size', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button', { name: /small/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('h-9')
  })

  it('renders as a child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="#">Link Button</a>
      </Button>
    )
    const link = screen.getByRole('link', { name: /link button/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('bg-gradient-to-r') // Still applies button styles
  })

  it('passes through other props', () => {
    render(<Button data-testid="my-button">Test</Button>)
    const button = screen.getByTestId('my-button')
    expect(button).toBeInTheDocument()
  })
})
