// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { personalityArchetypes } from '../src/data/personalities'

const prisma = new PrismaClient()

async function main() {
  for (const archetype of personalityArchetypes) {
    await prisma.personalityType.upsert({
      where: { name: archetype.name },
      update: {},
      create: {
        name: archetype.name,
        description: archetype.description,
        characteristics: archetype.characteristics,
        color_scheme: { primary: '#000000' }, // or add real color if you have
      },
    })
  }

  console.log('Seeded personality types.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
