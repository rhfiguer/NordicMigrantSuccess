
import { create } from 'zustand';
import { QuizResult } from '@/types/quiz';

interface QuizStore {
  quizResults: QuizResult | null;
  setQuizResults: (results: QuizResult) => void;
  clearQuizResults: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  quizResults: null,
  setQuizResults: (results) => set({ quizResults: results }),
  clearQuizResults: () => set({ quizResults: null }),
}));
