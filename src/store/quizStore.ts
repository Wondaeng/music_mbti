import { create } from 'zustand';
import { PageType } from '@/types';

interface QuizState {
  // Current state
  currentPage: PageType;
  currentBatch: number; // 0-9 (10 batches of 5 questions)
  answers: Map<number, number>;
  startTime: Date | null;
  completionTime: Date | null;

  // Actions
  startQuiz: () => void;
  answerQuestion: (questionId: number, value: number) => void;
  nextBatch: () => void;
  previousBatch: () => void;
  completeQuiz: () => void;
  restartQuiz: () => void;

  // Computed values
  getProgress: () => number;
  getIsComplete: () => boolean;
  getCanGoNext: () => boolean;
  getCanGoPrevious: () => boolean;
  getCurrentQuestions: () => number[];

  // Persistence
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  clearLocalStorage: () => void;
}

const STORAGE_KEY = 'music-mbti-quiz';

const QUESTIONS_PER_BATCH = 5;
const TOTAL_BATCHES = 10;

export const useQuizStore = create<QuizState>((set, get) => ({
  // Initial state
  currentPage: 'start',
  currentBatch: 0,
  answers: new Map(),
  startTime: null,
  completionTime: null,

  // Actions
  startQuiz: () => {
    set({
      currentPage: 'quiz',
      currentBatch: 0,
      startTime: new Date(),
    });
    get().saveToLocalStorage();
  },

  answerQuestion: (questionId, value) => {
    const answers = new Map(get().answers);
    answers.set(questionId, value);
    set({ answers });
    get().saveToLocalStorage();
  },

  nextBatch: () => {
    const current = get().currentBatch;
    if (current < TOTAL_BATCHES - 1) {
      set({ currentBatch: current + 1 });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    } else if (current === TOTAL_BATCHES - 1 && get().getIsComplete()) {
      get().completeQuiz();
    }
  },

  previousBatch: () => {
    const current = get().currentBatch;
    if (current > 0) {
      set({ currentBatch: current - 1 });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  },

  completeQuiz: () => {
    set({
      currentPage: 'results',
      completionTime: new Date(),
    });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
    get().saveToLocalStorage();
  },

  restartQuiz: () => {
    set({
      currentPage: 'start',
      currentBatch: 0,
      answers: new Map(),
      startTime: null,
      completionTime: null,
    });
    get().clearLocalStorage();
  },

  // Computed values
  getProgress: () => {
    return Math.round((get().answers.size / 50) * 100);
  },

  getIsComplete: () => {
    return get().answers.size === 50;
  },

  getCanGoNext: () => {
    const currentQuestions = get().getCurrentQuestions();
    return currentQuestions.every((id) => get().answers.has(id));
  },

  getCanGoPrevious: () => {
    return get().currentBatch > 0;
  },

  getCurrentQuestions: () => {
    const batch = get().currentBatch;
    const start = batch * QUESTIONS_PER_BATCH;
    return Array.from({ length: QUESTIONS_PER_BATCH }, (_, i) => start + i);
  },

  // Persistence
  saveToLocalStorage: () => {
    const state = get();
    const dataToSave = {
      currentPage: state.currentPage,
      currentBatch: state.currentBatch,
      answers: Array.from(state.answers.entries()),
      startTime: state.startTime?.toISOString(),
      completionTime: state.completionTime?.toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  },

  loadFromLocalStorage: () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        set({
          currentPage: data.currentPage,
          currentBatch: data.currentBatch ?? 0,
          answers: new Map(data.answers),
          startTime: data.startTime ? new Date(data.startTime) : null,
          completionTime: data.completionTime
            ? new Date(data.completionTime)
            : null,
        });
      } catch (error) {
        console.error('Failed to load quiz state:', error);
      }
    }
  },

  clearLocalStorage: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
}));
