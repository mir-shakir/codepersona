import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { personalityArchetypes } from '@/data/personalities'
import { LanguageDistributionRadarChart } from '@/components/visualizations/language-distribution-radar-chart'
import { CommitTimeline } from '@/components/visualizations/commit-timeline'
import { RepositoryNetworkGraph } from '@/components/visualizations/repository-network-graph'
import { PersonalityMeter } from '@/components/visualizations/personality-meter'
import { Metadata } from 'next'
import { ResultsClient } from './ResultsClient'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DailyActivityChart } from '@/components/visualizations/daily-activity-chart'
import { HourlyActivityChart } from '@/components/visualizations/hourly-activity-chart'

const prisma = new PrismaClient()

// Updated type for Next.js 15 - params is now a Promise
type PageProps = {
  params: Promise<{ analysisId: string }>
}

async function getAnalysis(analysisId: string) {
  const analysis = await prisma.analysis.findUnique({
    where: { id: analysisId },
    include: {
      user: true,
    },
  })
  return analysis
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Await the params Promise
  const { analysisId } = await params
  const analysis = await getAnalysis(analysisId)

  if (!analysis) {
    return {
      title: 'Analysis not found',
    }
  }

  const title = `${analysis.user.name || analysis.user.github_username}'s CodePersona`
  const description = `I got "${analysis.personality_type}" on CodePersona! Discover your developer DNA.`
  const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/og/${analysis.id}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ResultsPage({ params }: PageProps) {
  // Await the params Promise
  const { analysisId } = await params
  const analysis = await getAnalysis(analysisId)

  if (!analysis) {
    notFound()
  }

  const user = analysis.user
  const githubData = analysis.github_data_snapshot as any
  const personality = personalityArchetypes.find(
    (p) => p.name === analysis.personality_type
  )
  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/results/${analysis.id}`
  const shareText = `I got "${analysis.personality_type}" on CodePersona! What's your developer DNA?`

  const topPersonalities = Object.entries(
    analysis.personality_score as Record<string, number>
  )
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .slice(0, 3)

  return (
    <div className="w-full container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <Avatar className="mx-auto mb-4 h-24 w-24 border-2 border-primary">
          <AvatarImage
            src={user.avatar_url || ''}
            alt={user.name || user.github_username}
          />
          <AvatarFallback>{user.github_username.charAt(0)}</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold tracking-tighter">
          {user.name || user.github_username}
        </h1>
        <p className="mt-2 text-muted-foreground">{githubData.user.bio}</p>
      </header>

      <Card className="mx-auto mb-12 max-w-3xl overflow-hidden text-center">
        <div className="bg-gradient-to-r from-gradient-start to-gradient-end p-8">
          <CardHeader className="p-0">
            <CardTitle className="text-4xl font-bold text-white">
              {analysis.personality_type}
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4 p-0">
            <p className="text-lg text-indigo-200">
              {personality?.description}
            </p>
          </CardContent>
        </div>
      </Card>

      <div className="mb-12 text-center">
        <ResultsClient shareUrl={shareUrl} shareText={shareText} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Commit Timeline
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This chart shows the number of commits made over the past year.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64 pt-6">
            <CommitTimeline data={analysis.github_data_snapshot as any} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Language Distribution
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This chart shows the distribution of programming languages across the analyzed repositories.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64 pt-6">
            <LanguageDistributionRadarChart
              data={analysis.analysis_data as any}
            />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Daily Activity
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your commit activity by day of the week.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <DailyActivityChart data={analysis.analysis_data as any} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Hourly Activity
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your commit activity by time of day.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <HourlyActivityChart data={analysis.analysis_data as any} />
          </CardContent>
        </Card>

        {topPersonalities.map(([name, score]) => (
          <PersonalityMeter key={name} personalityName={name} score={score} />
        ))}

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Repository Network
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This graph shows the network of repositories you have contributed to.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-96 pt-6">
            <RepositoryNetworkGraph
              data={analysis.github_data_snapshot as any}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
