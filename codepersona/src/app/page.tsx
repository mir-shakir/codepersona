'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight, Loader2, Sparkles, Code, Star, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username) {
      setError('Please enter a GitHub username.')
      return
    }
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubUsername: username }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      router.push(data.reportUrl)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const featureCards = [
    {
      icon: <Code className="h-8 w-8 text-white" />,
      title: 'Deep Code Analysis',
      description:
        'We analyze commit times, language choices, and repository patterns to build your unique developer fingerprint.',
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      icon: <Star className="h-8 w-8 text-white" />,
      title: '10 Personality Archetypes',
      description:
        'Are you a Midnight Warrior or a Framework Hopper? Discover your coding persona among our carefully crafted archetypes.',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: <Share2 className="h-8 w-8 text-white" />,
      title: 'Shareable Results',
      description:
        'Get a beautiful, shareable image of your results perfect for LinkedIn, Twitter, or your portfolio. Show off your developer DNA!',
      gradient: 'from-pink-500 to-red-600',
    },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-tight"
        >
          Discover Your
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-gradient-start to-gradient-end">
            Developer DNA
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 max-w-xl text-lg text-muted-foreground"
        >
          Enter a GitHub username to generate a humorous, shareable personality
          profile based on their coding habits and patterns.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleAnalyze}
          className="mt-8 w-full max-w-md"
        >
          <Card>
            <CardContent className="p-2">
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Enter GitHub username..."
                  className="h-12 flex-1 bg-transparent border-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="premium"
                  disabled={loading}
                  className="h-12 px-6"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          {error && (
            <p className="text-red-400 text-sm mt-4 font-medium">{error}</p>
          )}
        </motion.form>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Powerful Analysis, Stunning Visuals
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our AI-powered analysis dives deep into your coding patterns to
              reveal your unique developer personality.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {featureCards.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full overflow-hidden">
                  <CardHeader className="p-6">
                    <div
                      className={`mb-4 p-3 bg-gradient-to-br ${feature.gradient} rounded-lg w-fit`}
                    >
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
