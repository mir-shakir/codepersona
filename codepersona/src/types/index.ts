import {
  User as PrismaUser,
  Analysis as PrismaAnalysis,
  PersonalityType as PrismaPersonalityType,
} from '@prisma/client'

// GitHub API Types
export interface GitHubUser {
  [key: string]: unknown

  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id?: string | null
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name?: string | null
  company?: string | null
  blog?: string | null
  location?: string | null
  email?: string | null
  hireable?: boolean | null
  bio?: string | null
  twitter_username?: string | null
  public_repos?: number
  public_gists?: number
  followers?: number
  following?: number
  created_at?: string | null
  updated_at?: string | null
}

export interface Repository {
  [key: string]: unknown // For Prisma/JSON flexibility

  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner?: GitHubUser | null

  html_url: string
  description?: string | null
  fork: boolean

  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string

  created_at?: string | null
  updated_at?: string | null
  pushed_at?: string | null

  git_url?: string
  ssh_url?: string
  clone_url?: string
  svn_url?: string
  homepage?: string | null
  size?: number
  stargazers_count?: number
  watchers_count?: number
  language?: string | null
  has_issues?: boolean
  has_projects?: boolean
  has_downloads?: boolean
  has_wiki?: boolean
  has_pages?: boolean
  has_discussions?: boolean
  forks_count?: number
  mirror_url?: string | null
  archived?: boolean
  disabled?: boolean
  open_issues_count?: number
  license?: {
    key?: string
    name?: string
    spdx_id?: string
    url?: string
    node_id?: string
  } | null

  allow_forking?: boolean
  is_template?: boolean
  web_commit_signoff_required?: boolean
  topics?: string[]
  visibility?: string
  forks?: number
  open_issues?: number
  watchers?: number
  default_branch?: string
  temp_clone_token?: string | null
  network_count?: number
  subscribers_count?: number

  // ✅ This is the key change:
  security_and_analysis?: {
    advanced_security?: { status?: string }
    code_scanning?: { status?: string }
    secret_scanning?: { status?: string }
    secret_scanning_push_protection?: { status?: string }
    dependabot_security_updates?: { status?: string }
  } | null
}

export interface Commit {
  [key: string]: unknown

  sha: string
  node_id: string
  commit: {
    author?: {
      name?: string | null
      email?: string | null
      date?: string | null
    } | null
    committer?: {
      name?: string | null
      email?: string | null
      date?: string | null
    } | null
    message?: string | null
    tree: {
      sha: string
      url: string
    }
    url: string
    comment_count: number
    verification?: {
      verified: boolean
      reason: string
      signature?: string | null
      payload?: string | null
    }
  }
  url: string
  html_url: string
  comments_url: string

  author?: GitHubUser | Record<string, never> | null
  committer?: GitHubUser | Record<string, never> | null

  parents: {
    sha: string
    url: string
    html_url?: string
  }[]

  files?: {
    sha?: string
    filename?: string
    status?: string
    additions?: number
    deletions?: number
    changes?: number
    blob_url?: string
    raw_url?: string
    contents_url?: string
    patch?: string
  }[]
}

// Prisma Model Types
export type User = PrismaUser
export type Analysis = PrismaAnalysis
export type PersonalityType = PrismaPersonalityType

// Custom Analysis Types
export interface PersonalityScore {
  [key: string]: number
}

export type GitHubDataSnapshot = {
  [key: string]: unknown // Prisma JSON compatibility
  user: GitHubUser
  repositories: Repository[]
  commits: Record<string, Commit[]>
  languages: Record<string, Record<string, number>>
}

export type AnalysisData = {
  [key: string]: unknown
  commitFrequency: Record<string, number>
  languageDistribution: Record<string, number>
  repoActivity: {
    totalRepos: number
    forkedRepos: number
    originalRepos: number
    abandonedRepos: number
  }
  commitMessagePatterns: {
    todoCount: number
    fixmeCount: number
    avgMessageLength: number
  }
}

export interface CodePersonaAnalysisResult extends Analysis {
  user: User
  personalityType: PersonalityType
}
