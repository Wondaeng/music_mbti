import { useEffect } from 'react';
import { useQuizStore } from '@/store/quizStore';

export const useQuizPersistence = () => {
  const loadFromLocalStorage = useQuizStore(
    (state) => state.loadFromLocalStorage
  );

  // Load from localStorage on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);
};
