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

  const { userId, loginData } = req.body;

  if (userId !== session.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    // Get client IP address
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? 
      (forwarded as string).split(',')[0] : 
      req.connection.remoteAddress || 
      req.socket.remoteAddress;

    // Create login stat entry
    await prisma.loginStat.create({
      data: {
        userId,
        ipAddress: ip as string,
        userAgent: loginData.userAgent || req.headers['user-agent']
      }
    });

    // Update user login stats
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (user) {
      const now = new Date();
      const lastLogin = user.lastLoginAt ? new Date(user.lastLoginAt) : null;
      
      // Check if this is a new day for streak
      const isNewDay = lastLogin ? 
        lastLogin.toDateString() !== now.toDateString() : 
        true;
      
      // Check if streak is broken (more than 1 day since last login)
      const isStreakBroken = lastLogin ? 
        (now.getTime() - lastLogin.getTime()) > (2 * 24 * 60 * 60 * 1000) : 
        false;

      const newStreak = isStreakBroken ? 1 : 
        (isNewDay ? user.currentStreak + 1 : user.currentStreak);
      
      const longestStreak = Math.max(newStreak, user.longestStreak);

      // Award daily login XP if it's a new day
      let xpToAward = 0;
      if (isNewDay) {
        xpToAward = 5; // Daily login XP
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          loginCount: { increment: 1 },
          lastLoginAt: now,
          currentStreak: newStreak,
          longestStreak,
          xp: { increment: xpToAward },
          totalXp: { increment: xpToAward },
          level: calculateLevel(user.totalXp + xpToAward)
        }
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating login stats:', error);
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
