import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/shared/Header'
import { Footer } from '@/components/shared/Footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  applicationName: 'CodePersona',
  title: {
    default: 'CodePersona - Discover Your Developer DNA',
    template: '%s | CodePersona',
  },
  description:
    'Analyzes GitHub repositories to generate humorous, shareable developer personality profiles based on coding habits.',
  keywords: [
    'CodePersona',
    'GitHub personality analyzer',
    'developer DNA',
    'coding habits',
    'personality profile',
    'tech humor',
    'open source',
  ],
  authors: [
    {
      name: 'CodePersona Team',
      url: 'https://codepersona.com', // Placeholder
    },
  ],
  creator: 'CodePersona Team',
  publisher: 'CodePersona Team',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  openGraph: {
    title: 'CodePersona - Discover Your Developer DNA',
    description:
      'Analyzes GitHub repositories to generate humorous, shareable developer personality profiles based on coding habits.',
    url: 'https://codepersona.com', // Placeholder
    siteName: 'CodePersona',
    images: [
      {
        url: '/api/og/default', // A default OG image if no analysisId is present
        width: 1200,
        height: 630,
        alt: 'CodePersona - Discover Your Developer DNA',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodePersona - Discover Your Developer DNA',
    description:
      'Analyzes GitHub repositories to generate humorous, shareable developer personality profiles based on coding habits.',
    images: ['/api/og/default'], // A default OG image
    creator: '@codepersona', // Placeholder
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={cn(inter.className, 'overflow-x-hidden')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#6366f133,transparent)]"></div>
            <div className="relative z-10 flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
