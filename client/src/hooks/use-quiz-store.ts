
import { create } from 'zustand';
import { QuizResult } from '@/types/quiz';

interface QuizStore {
  quizResults: QuizResult | null;
  showForm: boolean;
  setQuizResults: (results: QuizResult) => void;
  setShowForm: (show: boolean) => void;
  clearQuizResults: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  quizResults: null,
  showForm: false,
  setQuizResults: (results) => set({ quizResults: results }),
  setShowForm: (show) => set({ showForm: show }),
  clearQuizResults: () => set({ quizResults: null }),
}));
