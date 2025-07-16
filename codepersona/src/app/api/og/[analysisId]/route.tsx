import { ImageResponse } from '@vercel/og'
import { PrismaClient } from '@prisma/client'
import { GitHubDataSnapshot, AnalysisData } from '@/types'

export const runtime = 'edge'

const prisma = new PrismaClient()

// This corrected signature removes the problematic second argument and instead
// parses the dynamic 'analysisId' directly from the request URL.
// This is the standard and correct way to handle dynamic params in Edge routes
// and will resolve the persistent build error.
export async function GET(req: Request) {
  const url = new URL(req.url)
  // The pathname will be /api/og/[analysisId], so we split by '/' and get the last segment.
  const analysisId = url.pathname.split('/').pop()

  if (!analysisId) {
    return new Response('Missing analysisId parameter in the URL', {
      status: 400,
    })
  }

  const analysis = await prisma.analysis.findUnique({
    where: { id: analysisId },
    include: { user: true },
  })

  if (
    !analysis ||
    !analysis.personality_type ||
    !analysis.github_data_snapshot ||
    !analysis.analysis_data
  ) {
    return new Response(`Analysis not found for ID: ${analysisId}`, {
      status: 404,
    })
  }

  const { user, personality_type } = analysis
  const github_data_snapshot =
    analysis.github_data_snapshot as any as GitHubDataSnapshot
  const analysis_data = analysis.analysis_data as any as AnalysisData

  const gradientStart = '#6366f1'
  const gradientEnd = '#8b5cf6'

  const totalCommits = Object.values(
    github_data_snapshot.commits as { [key: string]: any[] }
  ).flat().length
  const totalRepos = github_data_snapshot.repositories.length
  const mainLanguage =
    Object.entries(
      analysis_data.languageDistribution as { [key: string]: number }
    ).sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A'

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#020617',
          backgroundImage: `linear-gradient(to bottom, ${gradientStart}, ${gradientEnd})`,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: '"Inter", sans-serif',
          fontSize: 32,
          height: '100%',
          justifyContent: 'center',
          padding: 50,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width="150"
            height="150"
            src={user.avatar_url || ''}
            alt={`${user.name || user.github_username}'s avatar`}
            style={{
              borderRadius: 75,
              border: '5px solid white',
            }}
          />
          <div style={{ fontSize: 50, fontWeight: 700, marginTop: 20 }}>
            {user.name || user.github_username}
          </div>
          <div
            style={{
              fontSize: 70,
              fontWeight: 900,
              lineHeight: 1,
              marginTop: 10,
            }}
          >
            {personality_type}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              justifyContent: 'space-around',
              marginTop: 40,
              width: '100%',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontWeight: 700 }}>{totalCommits}</span>
              <span>Commits</span>
            </div>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontWeight: 700 }}>{totalRepos}</span>
              <span>Repos</span>
            </div>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontWeight: 700 }}>{mainLanguage}</span>
              <span>Main Language</span>
            </div>
          </div>
        </div>
        <div
          style={{
            bottom: 30,
            fontSize: 20,
            opacity: 0.8,
            position: 'absolute',
            right: 50,
          }}
        >
          CodePersona.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
