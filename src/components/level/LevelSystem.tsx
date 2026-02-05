import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Zap } from 'lucide-react';
import { User } from '@prisma/client';

interface LevelSystemProps {
  user: User;
  showDetails?: boolean;
}

interface LevelInfo {
  level: number;
  name: string;
  minXp: number;
  maxXp: number;
  badgeUrl?: string;
  color: string;
}

const LEVELS: LevelInfo[] = [
  { level: 1, name: 'Anfänger', minXp: 0, maxXp: 100, color: 'bg-gray-500' },
  { level: 2, name: 'Grundlagen', minXp: 100, maxXp: 250, color: 'bg-green-500' },
  { level: 3, name: 'Fortgeschritten', minXp: 250, maxXp: 500, color: 'bg-blue-500' },
  { level: 4, name: 'Kompetent', minXp: 500, maxXp: 1000, color: 'bg-purple-500' },
  { level: 5, name: 'Experte', minXp: 1000, maxXp: 2000, color: 'bg-orange-500' },
  { level: 6, name: 'Meister', minXp: 2000, maxXp: 3500, color: 'bg-red-500' },
  { level: 7, name: 'Gebärdensprache-Profi', minXp: 3500, maxXp: 5000, color: 'bg-yellow-500' },
  { level: 8, name: 'Lehrer', minXp: 5000, maxXp: 7500, color: 'bg-indigo-500' },
  { level: 9, name: 'Guru', minXp: 7500, maxXp: 10000, color: 'bg-pink-500' },
  { level: 10, name: 'Meister der Gebärdensprache', minXp: 10000, maxXp: Infinity, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
];

export function LevelSystem({ user, showDetails = false }: LevelSystemProps) {
  const currentLevel = LEVELS.find(l => l.level === user.level) || LEVELS[0];
  const nextLevel = LEVELS.find(l => l.level === user.level + 1);
  
  const currentLevelXp = user.totalXp - currentLevel.minXp;
  const levelRange = currentLevel.maxXp - currentLevel.minXp;
  const progress = nextLevel ? (currentLevelXp / levelRange) * 100 : 100;
  
  const xpToNextLevel = nextLevel ? nextLevel.minXp - user.totalXp : 0;

  return (
    <Card className={showDetails ? 'w-full' : 'w-auto'}>
      <CardHeader className={showDetails ? '' : 'pb-3'}>
        <CardTitle className="flex items-center gap-2">
          <Trophy suppressHydrationWarning className={`w-5 h-5 ${currentLevel.color.replace('bg-', 'text-')}`} />
          <span>Level {user.level}</span>
          <Badge variant="secondary">{currentLevel.name}</Badge>
        </CardTitle>
      </CardHeader>
      {showDetails && (
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="flex items-center gap-1">
                <Zap suppressHydrationWarning className="w-4 h-4 text-yellow-500" />
                {user.xp} XP
              </span>
              {xpToNextLevel > 0 && (
                <span className="text-muted-foreground">
                  {xpToNextLevel} XP bis Level {user.level + 1}
                </span>
              )}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Star suppressHydrationWarning className="w-4 h-4 text-yellow-500" />
              <span>Gesamte XP: {user.totalXp}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy suppressHydrationWarning className="w-4 h-4 text-blue-500" />
              <span>Logins: {user.loginCount}</span>
            </div>
          </div>
          
          {user.currentStreak > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Zap suppressHydrationWarning className="w-4 h-4 text-orange-500" />
              <span>Aktuelle Serie: {user.currentStreak} Tage</span>
            </div>
          )}
          
          {user.longestStreak > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy suppressHydrationWarning className="w-4 h-4" />
              <span>Längste Serie: {user.longestStreak} Tage</span>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export function getXpForAction(action: 'lesson_completed' | 'test_passed' | 'vocabulary_learned' | 'daily_login'): number {
  const xpRewards = {
    lesson_completed: 10,
    test_passed: 25,
    vocabulary_learned: 5,
    daily_login: 5
  };
  
  return xpRewards[action] || 0;
}

export function calculateLevel(totalXp: number): number {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVELS[i].minXp) {
      return LEVELS[i].level;
    }
  }
  return 1;
}
