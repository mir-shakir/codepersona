'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { MoonIcon, SunIcon, Bot } from 'lucide-react'

export function Header() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">CodePersona</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <a
                href="https://github.com/shakir/codepersona"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
