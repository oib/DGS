import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create levels
  await prisma.level.createMany({
    data: [
      { id: 1, name: 'Anfänger', minXp: 0, maxXp: 100 },
      { id: 2, name: 'Grundlagen', minXp: 100, maxXp: 250 },
      { id: 3, name: 'Fortgeschritten', minXp: 250, maxXp: 500 },
      { id: 4, name: 'Kompetent', minXp: 500, maxXp: 1000 },
      { id: 5, name: 'Experte', minXp: 1000, maxXp: 2000 },
      { id: 6, name: 'Meister', minXp: 2000, maxXp: 3500 },
      { id: 7, name: 'Gebärdensprache-Profi', minXp: 3500, maxXp: 5000 },
      { id: 8, name: 'Lehrer', minXp: 5000, maxXp: 7500 },
      { id: 9, name: 'Guru', minXp: 7500, maxXp: 10000 },
      { id: 10, name: 'Meister der Gebärdensprache', minXp: 10000, maxXp: 999999 },
    ]
  })

  // Create sample test
  const test = await prisma.test.create({
    data: {
      title: 'Grundlegende Begrüßungen in DGS',
      description: 'Teste deine Kenntnisse über grundlegende Begrüßungen in der Deutschen Gebärdensprache',
      level: 1,
      category: 'Grundlagen',
      timeLimit: 10,
      passingScore: 70,
      questions: {
        create: [
          {
            text: 'Wie zeigt man "Hallo" in der Deutschen Gebärdensprache?',
            order: 1,
            points: 1,
            options: {
              create: [
                { text: 'Die flache Hand heben und von links nach rechts bewegen', isCorrect: true, order: 1 },
                { text: 'Die Faust schütteln', isCorrect: false, order: 2 },
                { text: 'Mit dem Kopf nicken', isCorrect: false, order: 3 },
                { text: 'Die Hände zusammenklatschen', isCorrect: false, order: 4 },
              ]
            }
          },
          {
            text: 'Welche Handform wird bei der Gebärde für "Danke" verwendet?',
            order: 2,
            points: 1,
            options: {
              create: [
                { text: 'Flache Hand auf dem Herzen', isCorrect: true, order: 1 },
                { text: 'Faust', isCorrect: false, order: 2 },
                { text: 'Zeigefinger', isCorrect: false, order: 3 },
                { text: 'Alle Finger gespreizt', isCorrect: false, order: 4 },
              ]
            }
          },
          {
            text: 'Bei welcher Gebärde wird die Hand vom Mund weg bewegt?',
            order: 3,
            points: 1,
            options: {
              create: [
                { text: 'Bitte', isCorrect: true, order: 1 },
                { text: 'Hallo', isCorrect: false, order: 2 },
                { text: 'Danke', isCorrect: false, order: 3 },
                { text: 'Auf Wiedersehen', isCorrect: false, order: 4 },
              ]
            }
          },
          {
            text: 'Wie zeigt man "Auf Wiedersehen" in DGS?',
            order: 4,
            points: 1,
            options: {
              create: [
                { text: 'Die flache Hand vom Gesicht weg bewegen', isCorrect: true, order: 1 },
                { text: 'Die Hand zum Mund führen', isCorrect: false, order: 2 },
                { text: 'Die Faust öffnen und schließen', isCorrect: false, order: 3 },
                { text: 'Mit beiden Händen winken', isCorrect: false, order: 4 },
              ]
            }
          },
          {
            text: 'Welche Gebärde wird mit zwei Händen ausgeführt?',
            order: 5,
            points: 1,
            options: {
              create: [
                { text: 'Entschuldigung (Hände drehen)', isCorrect: true, order: 1 },
                { text: 'Hallo', isCorrect: false, order: 2 },
                { text: 'Bitte', isCorrect: false, order: 3 },
                { text: 'Danke', isCorrect: false, order: 4 },
              ]
            }
          }
        ]
      }
    }
  })

  // Create another test
  const grammarTest = await prisma.test.create({
    data: {
      title: 'DGS Satzbau Grundlagen',
      description: 'Lerne die Grundlagen des Satzbaus in der Deutschen Gebärdensprache',
      level: 2,
      category: 'Grammatik',
      timeLimit: 15,
      passingScore: 70,
      questions: {
        create: [
          {
            text: 'In welcher Reihenfolge werden Sätze in DGS normalerweise gebaut?',
            order: 1,
            points: 1,
            options: {
              create: [
                { text: 'Subjekt - Verb - Objekt', isCorrect: true, order: 1 },
                { text: 'Verb - Subjekt - Objekt', isCorrect: false, order: 2 },
                { text: 'Objekt - Subjekt - Verb', isCorrect: false, order: 3 },
                { text: 'Wie im gesprochenen Deutsch', isCorrect: false, order: 4 },
              ]
            }
          },
          {
            text: 'Was bedeutet die Rolle "R" in DGS?',
            order: 2,
            points: 1,
            options: {
              create: [
                { text: 'Rollenwechsel zwischen Personen', isCorrect: true, order: 1 },
                { text: 'Richtig', isCorrect: false, order: 2 },
                { text: 'Rechts', isCorrect: false, order: 3 },
                { text: 'Rot', isCorrect: false, order: 4 },
              ]
            }
          },
          {
            text: 'Wo werden Zeitangaben in DGS normalerweise platziert?',
            order: 3,
            points: 1,
            options: {
              create: [
                { text: 'Am Anfang des Satzes', isCorrect: true, order: 1 },
                { text: 'Am Ende des Satzes', isCorrect: false, order: 2 },
                { text: 'In der Mitte', isCorrect: false, order: 3 },
                { text: 'Überall im Satz verteilt', isCorrect: false, order: 4 },
              ]
            }
          }
        ]
      }
    }
  })

  // Create sample achievements
  await prisma.achievement.createMany({
    data: [
      {
        id: 'first-test',
        name: 'Erste Schritte',
        description: 'Ersten Test abgeschlossen',
        xpReward: 10,
        condition: 'complete_first_test'
      },
      {
        id: 'perfect-score',
        name: 'Perfektionist',
        description: '100% in einem Test erreicht',
        xpReward: 25,
        condition: 'perfect_test_score'
      },
      {
        id: 'week-streak',
        name: 'Streak Meister',
        description: '7 Tage in Folge eingeloggt',
        xpReward: 50,
        condition: 'seven_day_streak'
      }
    ]
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📚 Created ${await prisma.test.count()} tests`)
  console.log(`❓ Created ${await prisma.question.count()} questions`)
  console.log(`🏆 Created ${await prisma.achievement.count()} achievements`)
  console.log(`📊 Created ${await prisma.level.count()} levels`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
