import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{' '}
          <Link
            href="https://github.com/shakir"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
          >
            shakir
          </Link>
          . The source code is available on{' '}
          <Link
            href="https://github.com/shakir/codepersona"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
          >
            GitHub
          </Link>
          .
        </p>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} CodePersona. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
