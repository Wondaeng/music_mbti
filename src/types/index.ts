export interface Question {
  id: number;
  text: string;
  dimension: 'A' | 'S' | 'P' | 'M' | 'C' | 'L';
  category: 'artistic-sensual' | 'private-mainstream' | 'creative-logical';
}

export interface AnswerOption {
  value: number;
  label: string;
}

export interface PersonalityResult {
  type: string;
  name: string;
  tagline: string;
  description: string;
  characteristics: string[];
  color: {
    primary: string;
    secondary: string;
  };
}

export interface ScoreBreakdown {
  artistic: number;
  sensual: number;
  private: number;
  mainstream: number;
  creative: number;
  logical: number;
}

export interface DimensionScore {
  dimension: 'AS' | 'PM' | 'CL';
  leftLabel: string;
  rightLabel: string;
  leftScore: number;
  rightScore: number;
  percentage: number;
  dominant: 'left' | 'right' | 'balanced';
}

export type PageType = 'start' | 'quiz' | 'results';
