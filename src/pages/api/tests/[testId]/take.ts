import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/server/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { testId } = req.query;
  const { score, totalPoints, earnedPoints, timeSpent, answers } = req.body;

  try {
    // Create test result
    const testResult = await prisma.userTestResult.create({
      data: {
        userId: session.user.id,
        testId: testId as string,
        score,
        totalPoints,
        earnedPoints,
        timeSpent,
        completedAt: new Date(),
        answers: {
          create: answers.map((answer: any) => ({
            questionId: answer.questionId,
            selectedOptionId: answer.selectedOption,
            isCorrect: answer.isCorrect,
            pointsEarned: answer.isCorrect ? 
              prisma.question.findUnique({ where: { id: answer.questionId } }).then(q => q?.points || 0) : 
              0
          }))
        }
      },
      include: {
        answers: true,
        test: true
      }
    });

    // Update user XP and level
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (user) {
      const newTotalXp = user.totalXp + earnedPoints;
      const newLevel = calculateLevel(newTotalXp);
      
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          xp: user.xp + earnedPoints,
          totalXp: newTotalXp,
          level: newLevel
        }
      });

      // Check for new achievements
      await checkAchievements(session.user.id, testResult);
    }

    res.status(200).json(testResult);
  } catch (error) {
    console.error('Error saving test result:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function calculateLevel(totalXp: number): number {
  const LEVELS = [
    { level: 1, minXp: 0 },
    { level: 2, minXp: 100 },
    { level: 3, minXp: 250 },
    { level: 4, minXp: 500 },
    { level: 5, minXp: 1000 },
    { level: 6, minXp: 2000 },
    { level: 7, minXp: 3500 },
    { level: 8, minXp: 5000 },
    { level: 9, minXp: 7500 },
    { level: 10, minXp: 10000 }
  ];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVELS[i].minXp) {
      return LEVELS[i].level;
    }
  }
  return 1;
}

async function checkAchievements(userId: string, testResult: any) {
  // Check for first test achievement
  const testCount = await prisma.userTestResult.count({
    where: { userId }
  });

  if (testCount === 1) {
    await unlockAchievement(userId, 'first-test');
  }

  // Check for perfect score
  if (testResult.score === 100) {
    await unlockAchievement(userId, 'perfect-score');
  }

  // Check for streak achievements
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (user && user.currentStreak >= 7) {
    await unlockAchievement(userId, 'week-streak');
  }
}

async function unlockAchievement(userId: string, achievementId: string) {
  const achievement = await prisma.achievement.findUnique({
    where: { id: achievementId }
  });

  if (achievement) {
    await prisma.userAchievement.upsert({
      where: {
        userId_achievementId: {
          userId,
          achievementId
        }
      },
      update: {},
      create: {
        userId,
        achievementId
      }
    });

    // Award XP for achievement
    await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: achievement.xpReward },
        totalXp: { increment: achievement.xpReward }
      }
    });
  }
}
