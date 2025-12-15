import { useMemo } from 'react';
import { useQuizStore } from '@/store/quizStore';
import { getQuizResults } from '@/utils/calculatePersonality';
import { results } from '@/data/results';

export const useQuizResults = () => {
  const answers = useQuizStore((state) => state.answers);
  const isComplete = useQuizStore((state) => state.getIsComplete());

  const quizResults = useMemo(() => {
    if (!isComplete) return null;

    const { personalityType, scores, dimensionScores } = getQuizResults(answers);
    const personalityResult = results[personalityType];

    return {
      personalityType,
      personalityResult,
      scores,
      dimensionScores,
    };
  }, [answers, isComplete]);

  return quizResults;
};
