import {
  analyzeUser,
  getGithubUser,
  getUserRepos,
  getRepoCommits,
  getRepoLanguages,
} from '../analysis'
import { Octokit } from '@octokit/rest'

// Mock Octokit
jest.mock('@octokit/rest', () => ({
  Octokit: jest.fn(() => ({
    users: {
      getByUsername: jest.fn(),
    },
    repos: {
      listForUser: jest.fn(),
      listCommits: jest.fn(),
      listLanguages: jest.fn(),
    },
  })),
}))

const mockOctokit = new Octokit()

describe('analysis', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getGithubUser', () => {
    it('should fetch user data', async () => {
      const mockUser = { login: 'testuser', id: 123 }
      ;(mockOctokit.users.getByUsername as jest.Mock).mockResolvedValueOnce({
        data: mockUser,
      })
      const user = await getGithubUser('testuser')
      expect(user).toEqual(mockUser)
      expect(mockOctokit.users.getByUsername).toHaveBeenCalledWith({
        username: 'testuser',
      })
    })

    it('should return null on error', async () => {
      ;(mockOctokit.users.getByUsername as jest.Mock).mockRejectedValueOnce(
        new Error('API Error')
      )
      const user = await getGithubUser('testuser')
      expect(user).toBeNull()
    })
  })

  describe('getUserRepos', () => {
    it('should fetch user repositories', async () => {
      const mockRepos = [{ name: 'repo1' }, { name: 'repo2' }]
      ;(mockOctokit.repos.listForUser as jest.Mock).mockResolvedValueOnce({
        data: mockRepos,
      })
      const repos = await getUserRepos('testuser')
      expect(repos).toEqual(mockRepos)
      expect(mockOctokit.repos.listForUser).toHaveBeenCalledWith({
        username: 'testuser',
        per_page: 100,
      })
    })

    it('should return empty array on error', async () => {
      ;(mockOctokit.repos.listForUser as jest.Mock).mockRejectedValueOnce(
        new Error('API Error')
      )
      const repos = await getUserRepos('testuser')
      expect(repos).toEqual([])
    })
  })

  describe('getRepoCommits', () => {
    it('should fetch repository commits', async () => {
      const mockCommits = [{ commit: { message: 'feat: add feature' } }]
      ;(mockOctokit.repos.listCommits as jest.Mock).mockResolvedValueOnce({
        data: mockCommits,
      })
      const commits = await getRepoCommits('owner', 'repo')
      expect(commits).toEqual(mockCommits)
      expect(mockOctokit.repos.listCommits).toHaveBeenCalledWith({
        owner: 'owner',
        repo: 'repo',
        per_page: 100,
      })
    })

    it('should return empty array on error', async () => {
      ;(mockOctokit.repos.listCommits as jest.Mock).mockRejectedValueOnce(
        new Error('API Error')
      )
      const commits = await getRepoCommits('owner', 'repo')
      expect(commits).toEqual([])
    })
  })

  describe('getRepoLanguages', () => {
    it('should fetch repository languages', async () => {
      const mockLanguages = { TypeScript: 1000, JavaScript: 500 }
      ;(mockOctokit.repos.listLanguages as jest.Mock).mockResolvedValueOnce({
        data: mockLanguages,
      })
      const languages = await getRepoLanguages('owner', 'repo')
      expect(languages).toEqual(mockLanguages)
      expect(mockOctokit.repos.listLanguages).toHaveBeenCalledWith({
        owner: 'owner',
        repo: 'repo',
      })
    })

    it('should return empty object on error', async () => {
      ;(mockOctokit.repos.listLanguages as jest.Mock).mockRejectedValueOnce(
        new Error('API Error')
      )
      const languages = await getRepoLanguages('owner', 'repo')
      expect(languages).toEqual({})
    })
  })

  describe('analyzeUser', () => {
    it('should throw error if user not found', async () => {
      ;(mockOctokit.users.getByUsername as jest.Mock).mockResolvedValueOnce({
        data: null,
      })
      await expect(analyzeUser('nonexistent')).rejects.toThrow('User not found')
    })

    it('should analyze user data and return personality scores', async () => {
      const mockUser = {
        login: 'testuser',
        id: 123,
        name: 'Test User',
        avatar_url: 'avatar.png',
        bio: 'A test bio',
        public_repos: 5,
        followers: 10,
        following: 5,
      }
      const mockRepos = [
        {
          name: 'repo1',
          fork: false,
          stargazers_count: 5,
          forks_count: 1,
          description: 'A good repo',
        },
        {
          name: 'repo2',
          fork: true,
          stargazers_count: 0,
          forks_count: 0,
          description: null,
        },
      ]
      const mockCommits = [
        {
          commit: {
            author: { date: '2025-07-14T01:00:00Z' },
            message: 'feat: add login',
          },
        }, // Midnight
        {
          commit: {
            author: { date: '2025-07-14T10:00:00Z' },
            message: 'fix: bug TODO: refactor auth',
          },
        }, // TODO, FIXME
        {
          commit: {
            author: { date: '2025-07-14T15:00:00Z' },
            message: 'refactor: improve performance',
          },
        }, // Refactor
        {
          commit: {
            author: { date: '2025-01-01T12:00:00Z' },
            message: 'initial commit',
          },
        }, // Old commit for abandoned repo
        {
          commit: {
            author: { date: '2025-07-14T11:00:00Z' },
            message: 'small change',
          },
        }, // Micro-commit
        {
          commit: {
            author: { date: '2025-07-14T12:00:00Z' },
            message: 'Merge pull request #1 from dev/feature',
          },
        }, // Merge conflict
      ]
      const mockLanguages = { TypeScript: 1000, JavaScript: 500, Python: 200 }

      ;(mockOctokit.users.getByUsername as jest.Mock).mockResolvedValueOnce({
        data: mockUser,
      })
      ;(mockOctokit.repos.listForUser as jest.Mock).mockResolvedValueOnce({
        data: mockRepos,
      })
      ;(mockOctokit.repos.listCommits as jest.Mock)
        .mockResolvedValueOnce({ data: mockCommits })
        .mockResolvedValueOnce({ data: [] }) // For repo2
      ;(mockOctokit.repos.listLanguages as jest.Mock)
        .mockResolvedValueOnce({ data: mockLanguages })
        .mockResolvedValueOnce({ data: {} }) // For repo2

      const result = await analyzeUser('testuser')

      expect(result).toHaveProperty('personality')
      expect(result).toHaveProperty('personality_score')
      expect(result).toHaveProperty('analysis_data')
      expect(result).toHaveProperty('github_data_snapshot')

      // Basic checks for scores (exact values depend on the heuristics)
      expect(
        result.personality_score['The Midnight Warrior']
      ).toBeGreaterThanOrEqual(0)
      expect(
        result.personality_score['The Framework Hopper']
      ).toBeGreaterThanOrEqual(0)
      expect(
        result.personality_score['The Micro-Commit Maniac']
      ).toBeGreaterThanOrEqual(0)
      expect(
        result.personality_score['The Todo List Terrorist']
      ).toBeGreaterThanOrEqual(0)
      expect(
        result.personality_score['The Refactoring Rebel']
      ).toBeGreaterThanOrEqual(0)
      expect(
        result.personality_score['The Merge Conflict Magician']
      ).toBeGreaterThanOrEqual(0)
      expect(
        result.personality_score['The Open Source Evangelist']
      ).toBeGreaterThanOrEqual(0)
      expect(
        result.personality_score['The Documentation Dodger']
      ).toBeGreaterThanOrEqual(0)
      expect(
        result.personality_score['The Perfectionist Procrastinator']
      ).toBeGreaterThanOrEqual(0)
      expect(
        result.personality_score['The Silent Contributor']
      ).toBeGreaterThanOrEqual(0)

      // Check some analysis data points
      expect(
        result.analysis_data.commitMessagePatterns.todoCount
      ).toBeGreaterThanOrEqual(1)
      expect(result.analysis_data.languageDistribution).toHaveProperty(
        'TypeScript'
      )
      expect(
        result.analysis_data.repoActivity.abandonedRepos
      ).toBeGreaterThanOrEqual(0)
    })
  })
})
