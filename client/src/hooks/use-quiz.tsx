import { useState, useCallback } from 'react';
import { QuizQuestion, QuizResponse, QuizResult } from '@/types/quiz';
import { apiRequest } from '@/lib/queryClient';

interface UseQuizProps {
  questions: QuizQuestion[];
  leadId?: number;
}

export function useQuiz({ questions, leadId }: UseQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<QuizResponse>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const totalSteps = questions.length;
  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const showResults = currentStep === totalSteps;

  const updateResponse = useCallback((questionNumber: number, value: number) => {
    setResponses(prev => ({
      ...prev,
      [`q${questionNumber}`]: value
    }));
  }, []);

  const goToNext = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const goToPrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const submitQuiz = useCallback(async () => {
    if (Object.keys(responses).length === 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const quizData = leadId 
        ? { ...responses, leadId } 
        : responses;
      
      const res = await apiRequest('POST', '/api/quiz-responses', quizData);
      const data = await res.json();
      
      setResult({
        score: data.score,
        recommendation: data.recommendation
      });
      
      setCurrentStep(totalSteps); // Show results
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [responses, leadId, totalSteps]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setResponses({});
    setResult(null);
  }, []);

  return {
    currentStep,
    totalSteps,
    currentQuestion,
    responses,
    isSubmitting,
    result,
    isLastStep,
    showResults,
    updateResponse,
    goToNext,
    goToPrevious,
    submitQuiz,
    reset
  };
}
