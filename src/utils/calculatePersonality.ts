import { ScoreBreakdown, DimensionScore } from '@/types';
import { QUESTION_MAPPING } from '@/data/scoring';

/**
 * Calculate raw scores for each dimension
 */
export function calculateScores(answers: Map<number, number>): ScoreBreakdown {
  const scores: ScoreBreakdown = {
    artistic: 0,
    sensual: 0,
    private: 0,
    mainstream: 0,
    creative: 0,
    logical: 0,
  };

  // Iterate through all answers
  answers.forEach((value, questionId) => {
    const questionNumber = questionId + 1; // Convert to 1-based

    // Check which dimension this question belongs to
    if (QUESTION_MAPPING.artistic.includes(questionNumber)) {
      scores.artistic += value;
    }
    if (QUESTION_MAPPING.sensual.includes(questionNumber)) {
      scores.sensual += value;
    }
    if (QUESTION_MAPPING.private.includes(questionNumber)) {
      scores.private += value;
    }
    if (QUESTION_MAPPING.mainstream.includes(questionNumber)) {
      scores.mainstream += value;
    }
    if (QUESTION_MAPPING.creative.includes(questionNumber)) {
      scores.creative += value;
    }
    if (QUESTION_MAPPING.logical.includes(questionNumber)) {
      scores.logical += value;
    }
  });

  return scores;
}

/**
 * Determine personality type from scores
 */
export function calculatePersonalityType(scores: ScoreBreakdown): string {
  const firstDimension = scores.artistic >= scores.sensual ? 'A' : 'S';
  const secondDimension = scores.private >= scores.mainstream ? 'P' : 'M';
  const thirdDimension = scores.creative >= scores.logical ? 'C' : 'L';

  return `${firstDimension}${thirdDimension}-${secondDimension}`;
}

/**
 * Calculate percentage for dimension bar display
 */
function calculatePercentage(leftScore: number, rightScore: number): number {
  // Normalize scores to positive values
  const normalizedLeft = leftScore + 20;
  const normalizedRight = rightScore + 20;

  const total = normalizedLeft + normalizedRight;
  if (total === 0) return 50;

  // Percentage from 0-100 where 50 is balanced
  return Math.round((normalizedLeft / total) * 100);
}

/**
 * Determine dominant side of dimension
 */
function getDominant(
  leftScore: number,
  rightScore: number
): 'left' | 'right' | 'balanced' {
  const diff = Math.abs(leftScore - rightScore);

  // Consider balanced if within 3 points
  if (diff <= 3) return 'balanced';

  return leftScore > rightScore ? 'left' : 'right';
}

/**
 * Calculate dimension scores for visualization
 */
export function calculateDimensionScores(
  scores: ScoreBreakdown
): DimensionScore[] {
  return [
    {
      dimension: 'AS',
      leftLabel: 'A',
      rightLabel: 'S',
      leftScore: scores.artistic,
      rightScore: scores.sensual,
      percentage: calculatePercentage(scores.artistic, scores.sensual),
      dominant: getDominant(scores.artistic, scores.sensual),
    },
    {
      dimension: 'CL',
      leftLabel: 'C',
      rightLabel: 'L',
      leftScore: scores.creative,
      rightScore: scores.logical,
      percentage: calculatePercentage(scores.creative, scores.logical),
      dominant: getDominant(scores.creative, scores.logical),
    },
    {
      dimension: 'PM',
      leftLabel: 'P',
      rightLabel: 'M',
      leftScore: scores.private,
      rightScore: scores.mainstream,
      percentage: calculatePercentage(scores.private, scores.mainstream),
      dominant: getDominant(scores.private, scores.mainstream),
    },
  ];
}

/**
 * Main function to get complete results
 */
export function getQuizResults(answers: Map<number, number>) {
  const scores = calculateScores(answers);
  const personalityType = calculatePersonalityType(scores);
  const dimensionScores = calculateDimensionScores(scores);

  return {
    personalityType,
    scores,
    dimensionScores,
  };
}
