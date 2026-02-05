'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Test, Question, Option } from '@prisma/client';

interface TestWithQuestions extends Test {
  questions: (Question & {
    options: Option[];
  })[];
}

interface MultipleChoiceTestProps {
  test: TestWithQuestions;
  onComplete: (result: UserTestResult) => void;
  userId: string;
}

interface UserTestResult {
  score: number;
  totalPoints: number;
  earnedPoints: number;
  timeSpent: number;
  answers: {
    questionId: string;
    selectedOptionId: string;
    isCorrect: boolean;
  }[];
}

export function MultipleChoiceTest({ test, onComplete, userId }: MultipleChoiceTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<UserTestResult['answers']>([]);
  const [timeLeft, setTimeLeft] = useState(test.timeLimit ? test.timeLimit * 60 : null);
  const [startTime] = useState(Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [testResult, setTestResult] = useState<UserTestResult | null>(null);

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev !== null && prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev !== null ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (selectedOption) {
      const isCorrect = currentQuestion.options.find(opt => opt.id === selectedOption)?.isCorrect || false;
      
      setAnswers(prev => [...prev, {
        questionId: currentQuestion.id,
        selectedOptionId: selectedOption,
        isCorrect
      }]);

      if (currentQuestionIndex < test.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        handleSubmitTest();
      }
    }
  };

  const handleSubmitTest = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    const allAnswers = selectedOption && answers.length === currentQuestionIndex 
      ? [...answers, {
          questionId: currentQuestion.id,
          selectedOptionId: selectedOption,
          isCorrect: currentQuestion.options.find(opt => opt.id === selectedOption)?.isCorrect || false
        }]
      : answers;

    const correctAnswers = allAnswers.filter(a => a.isCorrect).length;
    const totalPoints = test.questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = allAnswers.reduce((sum, a, idx) => {
      const question = test.questions[idx];
      return sum + (a.isCorrect ? question.points : 0);
    }, 0);
    
    const score = Math.round((correctAnswers / test.questions.length) * 100);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    const result: UserTestResult = {
      score,
      totalPoints,
      earnedPoints,
      timeSpent,
      answers: allAnswers
    };

    setTestResult(result);
    setShowResults(true);
    onComplete(result);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setTimeLeft(test.timeLimit ? test.timeLimit * 60 : null);
    setIsSubmitted(false);
    setShowResults(false);
    setTestResult(null);
  };

  if (showResults && testResult) {
    const passed = testResult.score >= test.passingScore;
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {passed ? (
                <CheckCircle className="w-16 h-16 text-green-500" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {passed ? 'Test Bestanden!' : 'Test Nicht Bestanden'}
            </CardTitle>
            <p className="text-muted-foreground">
              Ihre Punktzahl: {testResult.score}% (Benötigt: {test.passingScore}%)
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{testResult.earnedPoints}</p>
                <p className="text-sm text-muted-foreground">Punkte verdient</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{formatTime(testResult.timeSpent)}</p>
                <p className="text-sm text-muted-foreground">Zeit benötigt</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Richtige Antworten:</h3>
              {test.questions.map((question, idx) => {
                const answer = testResult.answers[idx];
                const isCorrect = answer?.isCorrect || false;
                
                return (
                  <div key={question.id} className="flex items-center gap-2 p-2 rounded">
                    {isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm">Frage {idx + 1}: {question.text}</span>
                  </div>
                );
              })}
            </div>
            
            <Button onClick={handleRestart} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Test wiederholen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{test.title}</h1>
          {timeLeft !== null && (
            <Badge variant={timeLeft < 60 ? "destructive" : "secondary"}>
              <Clock className="w-4 h-4 mr-1" />
              {formatTime(timeLeft)}
            </Badge>
          )}
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-muted-foreground mt-1">
          Frage {currentQuestionIndex + 1} von {test.questions.length}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-start gap-4">
            <Badge variant="outline">{currentQuestion.points} Punkte</Badge>
            <span>{currentQuestion.text}</span>
          </CardTitle>
          {currentQuestion.imageUrl && (
            <img 
              src={currentQuestion.imageUrl} 
              alt="Question image"
              className="w-full max-w-md rounded-lg"
            />
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option) => (
            <div
              key={option.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedOption === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedOption === option.id
                    ? 'border-primary bg-primary'
                    : 'border-muted-foreground'
                }`}>
                  {selectedOption === option.id && (
                    <div className="w-2 h-2 rounded-full bg-white m-auto" />
                  )}
                </div>
                <span>{option.text}</span>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(prev => prev - 1);
                  const prevAnswer = answers[currentQuestionIndex - 1];
                  setSelectedOption(prevAnswer?.selectedOptionId || null);
                }
              }}
              disabled={currentQuestionIndex === 0}
            >
              Zurück
            </Button>
            
            {currentQuestionIndex === test.questions.length - 1 ? (
              <Button onClick={handleSubmitTest} disabled={!selectedOption || isSubmitted}>
                Test abschließen
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!selectedOption}>
                Nächste Frage
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
