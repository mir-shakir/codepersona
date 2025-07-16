// src/lib/analysis.ts

import { Octokit } from '@octokit/rest'
import { getPersonalityArchetypesFromDB } from '../data/personalities'
import { personalityArchetypes } from '../data/personalities'
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export async function getGithubUser(username: string) {
  try {
    const { data } = await octokit.users.getByUsername({ username })
    return data
  } catch (error) {
    console.error('Error fetching GitHub user:', error)
    return null
  }
}

export async function getUserRepos(username: string) {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      per_page: 100,
    })
    return data
  } catch (error) {
    console.error('Error fetching user repos:', error)
    return []
  }
}

export async function getRepoCommits(owner: string, repo: string) {
  try {
    const { data } = await octokit.repos.listCommits({
      owner,
      repo,
      per_page: 100,
    })
    return data
  } catch (error) {
    console.error(`Error fetching commits for ${owner}/${repo}:`, error)
    return []
  }
}

export async function getRepoLanguages(owner: string, repo: string) {
  try {
    const { data } = await octokit.repos.listLanguages({ owner, repo })
    return data
  } catch (error) {
    console.error(`Error fetching languages for ${owner}/${repo}:`, error)
    return {}
  }
}

import {
  GitHubUser,
  Repository,
  Commit,
  GitHubDataSnapshot,
  AnalysisData,
  PersonalityScore,
} from '@/types'

export async function analyzeUser(username: string) {
  const user: GitHubUser | null = await getGithubUser(username)
  if (!user) {
    throw new Error('User not found')
  }

  const repos: Repository[] = await getUserRepos(username)
  const allCommits: { [repoFullName: string]: Commit[] } = {}
  const allLanguages: {
    [repoFullName: string]: { [language: string]: number }
  } = {}

  for (const repo of repos) {
    const commits = await getRepoCommits(username, repo.name)
    allCommits[`${username}/${repo.name}`] = commits

    const languages = await getRepoLanguages(username, repo.name)
    allLanguages[`${username}/${repo.name}`] = languages
  }

  const githubDataSnapshot: GitHubDataSnapshot = {
    user,
    repositories: repos,
    commits: allCommits,
    languages: allLanguages,
  }

  // --- Analysis ---
  const flatCommits: Commit[] = Object.values(allCommits).flat()
  const commitMessages: string[] = flatCommits
    .map((c) => c.commit.message || '')
    .filter((msg) => msg !== null) as string[]

  // Initialize analysis data structure
  const analysisData: AnalysisData = {
    commitFrequency: {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0,
      '21': 0,
      '22': 0,
      '23': 0,
    },
    languageDistribution: {},
    repoActivity: {
      totalRepos: repos.length,
      forkedRepos: repos.filter((repo) => repo.fork).length,
      originalRepos: repos.filter((repo) => !repo.fork).length,
      abandonedRepos: 0, // To be calculated
    },
    commitMessagePatterns: {
      todoCount: 0,
      fixmeCount: 0,
      avgMessageLength: 0,
    },
  }

  // Populate commit frequency
  flatCommits.forEach((c) => {
    if (!c.commit.author || !c.commit.author.date) return // Skip if author or date is null/undefined
    const date = new Date(c.commit.author.date)
    const dayOfWeek = date.getDay() // 0 for Sunday, 1 for Monday, etc.
    const hourOfDay = date.getHours()

    const dayNames = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ]
    analysisData.commitFrequency[dayNames[dayOfWeek]]++
    analysisData.commitFrequency[hourOfDay.toString()]++
  })

  // Populate language distribution
  for (const repoFullName in allLanguages) {
    for (const lang in allLanguages[repoFullName]) {
      if (analysisData.languageDistribution[lang]) {
        analysisData.languageDistribution[lang] +=
          allLanguages[repoFullName][lang]
      } else {
        analysisData.languageDistribution[lang] =
          allLanguages[repoFullName][lang]
      }
    }
  }

  // Calculate abandoned repos (no commits in the last 6 months)
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  analysisData.repoActivity.abandonedRepos = repos.filter((repo) => {
    const repoCommits = allCommits[`${username}/${repo.name}`]
    if (
      !repoCommits ||
      repoCommits.length === 0 ||
      !repoCommits[0].commit.author ||
      !repoCommits[0].commit.author.date
    )
      return true // No commits or author or date is null/undefined
    const latestCommitDate = new Date(repoCommits[0].commit.author.date) // Commits are usually ordered newest first
    return latestCommitDate < sixMonthsAgo
  }).length

  // Analyze commit message patterns
  let totalMessageLength = 0
  commitMessages.forEach((msg) => {
    if (msg.toUpperCase().includes('TODO'))
      analysisData.commitMessagePatterns.todoCount++
    if (msg.toUpperCase().includes('FIXME'))
      analysisData.commitMessagePatterns.fixmeCount++
    totalMessageLength += msg.length
  })
  analysisData.commitMessagePatterns.avgMessageLength =
    commitMessages.length > 0 ? totalMessageLength / commitMessages.length : 0

  // const personalityArchetypes = await getPersonalityArchetypesFromDB()
  // const personalityArchetypes = ;

  // --- Scoring ---
  const personalityScores: PersonalityScore = {}

  // 1. The Midnight Warrior
  const totalCommits = flatCommits.length
  const nightCommits = flatCommits.filter((c) => {
    if (!c.commit.author || !c.commit.author.date) return false // Skip if author or date is null/undefined
    const hour = new Date(c.commit.author.date).getHours()
    return hour >= 22 || hour <= 4
  }).length
  personalityScores['The Midnight Warrior'] =
    totalCommits > 0 ? nightCommits / totalCommits : 0

  // 2. The Perfectionist Procrastinator (Approximation: High commit count, low public repos/stars, or many small repos)
  // This is a difficult one to accurately assess without more context like release cycles.
  // Approximation: High commit count relative to the number of public repos, and low stars/forks.
  const avgCommitsPerRepo = repos.length > 0 ? totalCommits / repos.length : 0
  const totalStars = repos.reduce(
    (sum, repo) => sum + (repo.stargazers_count ?? 0),
    0
  )
  const perfectionistScore =
    avgCommitsPerRepo > 50 && totalStars < 10 ? 0.8 : 0.2 // Heuristic
  personalityScores['The Perfectionist Procrastinator'] = perfectionistScore

  // 3. The Framework Hopper
  const uniqueLanguages = Object.keys(analysisData.languageDistribution).length
  personalityScores['The Framework Hopper'] = Math.min(uniqueLanguages / 5, 1) // Score higher for more languages

  // 4. The Documentation Dodger (Approximation: Check for README.md presence and size)
  let docsScore = 0
  const hasReadme = repos.some(
    (repo) => repo.description && repo.description.length > 0
  ) // Simple check for description
  if (!hasReadme) docsScore = 0.8 // High score if no good READMEs
  personalityScores['The Documentation Dodger'] = docsScore

  // 5. The Micro-Commit Maniac
  const shortMessageCommits = commitMessages.filter(
    (msg) => msg.length < 30
  ).length
  personalityScores['The Micro-Commit Maniac'] =
    totalCommits > 0 ? shortMessageCommits / totalCommits : 0

  // 6. The Merge Conflict Magician (Approximation: Look for keywords in commit messages)
  const mergeConflictKeywords = [
    'merge conflict',
    'resolve conflict',
    'fix merge',
  ]
  const mergeConflictCommits = commitMessages.filter((msg) =>
    mergeConflictKeywords.some((keyword) => msg.toLowerCase().includes(keyword))
  ).length
  personalityScores['The Merge Conflict Magician'] =
    totalCommits > 0 ? mergeConflictCommits / totalCommits : 0

  // 7. The Open Source Evangelist
  const publicRepos = repos.filter((repo) => !repo.private).length
  const publicRepoRatio = repos.length > 0 ? publicRepos / repos.length : 0
  const totalForks = repos.reduce(
    (sum, repo) => sum + (repo.forks_count ?? 0),
    0
  )
  personalityScores['The Open Source Evangelist'] =
    publicRepoRatio * 0.6 + Math.min(totalForks / 100, 0.4) // Weighted

  // 8. The Todo List Terrorist
  const todoFixmeRatio =
    totalCommits > 0
      ? (analysisData.commitMessagePatterns.todoCount +
          analysisData.commitMessagePatterns.fixmeCount) /
        totalCommits
      : 0
  personalityScores['The Todo List Terrorist'] = todoFixmeRatio

  // 9. The Refactoring Rebel
  const refactorKeywords = ['refactor', 'cleanup', 'improve', 'optimize']
  const refactorCommits = commitMessages.filter((msg) =>
    refactorKeywords.some((keyword) => msg.toLowerCase().includes(keyword))
  ).length
  personalityScores['The Refactoring Rebel'] =
    totalCommits > 0 ? refactorCommits / totalCommits : 0

  // 10. The Silent Contributor (Approximation: High commit count, but low bio/description length)
  const silentContributorScore =
    totalCommits > 50 && (!user.bio || user.bio.length < 20) ? 0.7 : 0.1 // Heuristic
  personalityScores['The Silent Contributor'] = silentContributorScore

  // Find the personality with the highest score
  let topPersonalityName: string = 'The Silent Contributor' // Default
  let maxScore = -1

  for (const archetype of personalityArchetypes) {
    const score = personalityScores[archetype.name]
    if (score !== undefined && score > maxScore) {
      maxScore = score
      topPersonalityName = archetype.name
    }
  }

  const finalPersonalityType = personalityArchetypes.find(
    (p) => p.name === topPersonalityName
  )

  return {
    personality: finalPersonalityType,
    personality_score: personalityScores,
    analysis_data: analysisData,
    github_data_snapshot: githubDataSnapshot,
  }
}
