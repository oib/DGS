import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Trophy, 
  TrendingUp, 
  BookOpen, 
  Target,
  Award,
  Activity
} from 'lucide-react';
import { User, UserTestResult, LoginStat } from '@prisma/client';

interface StatsDashboardProps {
  user: User & {
    testResults: (UserTestResult & {
      test: {
        title: string;
        category?: string;
      };
    })[];
    loginStats: LoginStat[];
  };
}

interface WeeklyStats {
  week: string;
  logins: number;
  testsTaken: number;
  avgScore: number;
  xpEarned: number;
}

export function StatsDashboard({ user }: StatsDashboardProps) {
  // Calculate stats
  const totalTestsTaken = user.testResults.length;
  const passedTests = user.testResults.filter(r => r.score >= 70).length;
  const averageScore = totalTestsTaken > 0 
    ? Math.round(user.testResults.reduce((sum, r) => sum + r.score, 0) / totalTestsTaken)
    : 0;
  
  const totalTimeSpent = user.testResults.reduce((sum, r) => sum + r.timeSpent, 0);
  const averageTimePerTest = totalTestsTaken > 0 
    ? Math.round(totalTimeSpent / totalTestsTaken)
    : 0;
  
  // Calculate weekly stats (last 4 weeks)
  const weeklyStats: WeeklyStats[] = calculateWeeklyStats(user.loginStats, user.testResults);
  
  // Achievement progress
  const achievements = [
    { name: 'Erste Schritte', description: 'Ersten Test abgeschlossen', progress: totalTestsTaken > 0 ? 100 : 0, icon: BookOpen },
    { name: 'Lernanfänger', description: '5 Tests bestanden', progress: Math.min((passedTests / 5) * 100, 100), icon: Target },
    { name: 'Streak Meister', description: '7 Tage Serie', progress: Math.min((user.currentStreak / 7) * 100, 100), icon: Calendar },
    { name: 'XP Sammler', description: '100 XP gesammelt', progress: Math.min((user.totalXp / 100) * 100, 100), icon: Trophy },
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests abgeschlossen</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTestsTaken}</div>
            <p className="text-xs text-muted-foreground">
              {passedTests} bestanden
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Durchschnittliche Punktzahl</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Über allen Tests
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lernzeit</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(totalTimeSpent)}</div>
            <p className="text-xs text-muted-foreground">
              Ø {formatTime(averageTimePerTest)} pro Test
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktuelle Serie</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.currentStreak}</div>
            <p className="text-xs text-muted-foreground">
              Tage in Folge
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Wöchentlicher Fortschritt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyStats.map((week, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{week.week}</span>
                  <span className="text-muted-foreground">
                    {week.testsTaken} Tests, {week.logins} Logins
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Durchschnittliche Punktzahl</span>
                      <span>{week.avgScore}%</span>
                    </div>
                    <Progress value={week.avgScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>XP verdient</span>
                      <span>{week.xpEarned}</span>
                    </div>
                    <Progress value={Math.min((week.xpEarned / 100) * 100, 100)} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Test Results */}
      <Card>
        <CardHeader>
          <CardTitle>Letzte Testergebnisse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {user.testResults.slice(-5).reverse().map((result) => (
              <div key={result.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">{result.test.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(result.completedAt || result.startedAt).toLocaleDateString('de-DE')}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant={result.score >= 70 ? 'default' : 'secondary'}>
                    {result.score}%
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(result.timeSpent)}
                  </p>
                </div>
              </div>
            ))}
            {user.testResults.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                Noch keine Tests absolviert
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Achievements Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Erfolge in Arbeit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{achievement.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  <Progress value={achievement.progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function calculateWeeklyStats(loginStats: LoginStat[], testResults: any[]): WeeklyStats[] {
  const weeks: WeeklyStats[] = [];
  const now = new Date();
  
  for (let i = 3; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - (i * 7) - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    
    const weekLogins = loginStats.filter(
      login => login.loginAt >= weekStart && login.loginAt < weekEnd
    ).length;
    
    const weekTests = testResults.filter(
      test => test.completedAt && 
      new Date(test.completedAt) >= weekStart && 
      new Date(test.completedAt) < weekEnd
    );
    
    const avgScore = weekTests.length > 0
      ? Math.round(weekTests.reduce((sum, t) => sum + t.score, 0) / weekTests.length)
      : 0;
    
    const weekName = i === 0 ? 'Diese Woche' : i === 1 ? 'Letzte Woche' : `Vor ${i} Wochen`;
    
    weeks.push({
      week: weekName,
      logins: weekLogins,
      testsTaken: weekTests.length,
      avgScore,
      xpEarned: weekTests.reduce((sum, t) => sum + t.earnedPoints, 0)
    });
  }
  
  return weeks;
}
