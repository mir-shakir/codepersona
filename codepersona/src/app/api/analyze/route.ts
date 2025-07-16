import { NextRequest, NextResponse } from 'next/server'
import { analyzeUser } from '@/lib/analysis'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    // For this project, we will allow unauthenticated users to run analysis
    // but in a real-world scenario, you would want to uncomment this
    // return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { githubUsername } = await req.json()

  if (!githubUsername) {
    return NextResponse.json(
      { error: 'GitHub username is required' },
      { status: 400 }
    )
  }

  try {
    const {
      personality,
      personality_score,
      analysis_data,
      github_data_snapshot,
    } = await analyzeUser(githubUsername)

    // Save analysis to database
    const user = await prisma.user.upsert({
      where: { github_id: github_data_snapshot.user.id },
      update: {
        name: github_data_snapshot.user.name,
        avatar_url: github_data_snapshot.user.avatar_url,
        public_repos: github_data_snapshot.user.public_repos || 0,
        followers: github_data_snapshot.user.followers || 0,
        following: github_data_snapshot.user.following || 0,
      },
      create: {
        github_id: github_data_snapshot.user.id,
        github_username: github_data_snapshot.user.login,
        name: github_data_snapshot.user.name,
        avatar_url: github_data_snapshot.user.avatar_url,
        bio: github_data_snapshot.user.bio,
        public_repos: github_data_snapshot.user.public_repos || 0,
        followers: github_data_snapshot.user.followers || 0,
        following: github_data_snapshot.user.following || 0,
      },
    })

    const analysis = await prisma.analysis.create({
      data: {
        userId: user.id,
        personality_type: personality?.name || 'Unknown',
        personality_score: personality_score,
        analysis_data: analysis_data as any,
        github_data_snapshot: github_data_snapshot as any,
      },
    })

    return NextResponse.json({
      analysisId: analysis.id,
      personalityType: analysis.personality_type,
      reportUrl: `/results/${analysis.id}`,
    })
  } catch (error: any) {
    console.error('Error analyzing user:', error)
    if (error.message === 'User not found') {
      return NextResponse.json(
        { error: 'GitHub user not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to analyze user' },
      { status: 500 }
    )
  }
}
