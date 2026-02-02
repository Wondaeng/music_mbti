import { ScoreBreakdown, DimensionScore, Question } from '@/types';
import { questions } from '@/data/questions';

const QUESTION_DIMENSION_BY_ID = new Map<number, Question['dimension']>(
  questions.map((q) => [q.id, q.dimension])
);

function applyBipolar(
  scores: ScoreBreakdown,
  value: number,
  primary: keyof ScoreBreakdown,
  opposite: keyof ScoreBreakdown
) {
  if (value > 0) scores[primary] += value;
  else if (value < 0) scores[opposite] += -value;
}

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

  // Iterate through all answers (bipolar scoring per question dimension)
  answers.forEach((value, questionId) => {
    const dimension = QUESTION_DIMENSION_BY_ID.get(questionId);
    if (!dimension) return;

    switch (dimension) {
      case 'A':
        applyBipolar(scores, value, 'artistic', 'sensual');
        return;
      case 'S':
        applyBipolar(scores, value, 'sensual', 'artistic');
        return;
      case 'P':
        applyBipolar(scores, value, 'private', 'mainstream');
        return;
      case 'M':
        applyBipolar(scores, value, 'mainstream', 'private');
        return;
      case 'C':
        applyBipolar(scores, value, 'creative', 'logical');
        return;
      case 'L':
        applyBipolar(scores, value, 'logical', 'creative');
        return;
      default:
        return;
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
  const total = leftScore + rightScore;
  if (total === 0) return 50;

  return Math.round((leftScore / total) * 100);
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
