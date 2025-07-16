// src/data/personalities.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getPersonalityArchetypesFromDB() {
  return await prisma.personalityType.findMany()
}

export const personalityArchetypes = [
  {
    name: 'The Midnight Warrior',
    description:
      'Commits mostly between 10 PM and 4 AM. Fueled by caffeine and deadlines.',
    characteristics: { nightOwl: 0.8, earlyBird: 0.1, consistent: 0.3 },
  },
  {
    name: 'The Perfectionist Procrastinator',
    description:
      'Many commits, but few actual releases. Always tweaking and refining.',
    characteristics: { frequentCommits: 0.9, lowReleases: 0.8, tweaking: 0.9 },
  },
  {
    name: 'The Framework Hopper',
    description:
      'Constantly trying out new technologies and frameworks. A new project for every new trend.',
    characteristics: {
      diverseLanguages: 0.9,
      newRepos: 0.8,
      shortLivedRepos: 0.7,
    },
  },
  {
    name: 'The Documentation Dodger',
    description: "Writes brilliant code, but the README file is always 'TODO'.",
    characteristics: {
      lowDocumentation: 0.9,
      highCodeQuality: 0.7,
      readmeTodo: 0.8,
    },
  },
  {
    name: 'The Micro-Commit Maniac',
    description:
      "Hundreds of tiny, atomic commits. 'Fix typo' is a common commit message.",
    characteristics: {
      highCommitFrequency: 0.9,
      smallCommits: 0.9,
      trivialMessages: 0.7,
    },
  },
  {
    name: 'The Merge Conflict Magician',
    description:
      'Frequently and successfully resolves complex merge conflicts. A true Git wizard.',
    characteristics: {
      highMergeRate: 0.8,
      complexMerges: 0.8,
      teamPlayer: 0.7,
    },
  },
  {
    name: 'The Open Source Evangelist',
    description:
      'Contributes to many public repositories and champions the open-source ethos.',
    characteristics: {
      highPublicContribs: 0.9,
      communityEngagement: 0.8,
      diverseProjects: 0.7,
    },
  },
  {
    name: 'The Todo List Terrorist',
    description: "Leaves a trail of 'TODO' and 'FIXME' comments in their wake.",
    characteristics: {
      highTodoComments: 0.9,
      fixmeComments: 0.8,
      futureWork: 0.7,
    },
  },
  {
    name: 'The Refactoring Rebel',
    description:
      'Constantly improving and refactoring existing code, sometimes to the dismay of teammates.',
    characteristics: {
      highRefactoring: 0.9,
      codeChurn: 0.7,
      perfectionist: 0.8,
    },
  },
  {
    name: 'The Silent Contributor',
    description:
      'Produces high-quality code but rarely engages in discussions or social channels.',
    characteristics: {
      lowSocialInteraction: 0.9,
      highCodeQuality: 0.8,
      independent: 0.7,
    },
  },
]
