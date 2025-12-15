export interface QuestionMapping {
  artistic: number[];
  sensual: number[];
  private: number[];
  mainstream: number[];
  creative: number[];
  logical: number[];
}

// Question numbers (1-based) mapped to dimensions
export const QUESTION_MAPPING: QuestionMapping = {
  artistic: [1, 3, 4, 6, 9, 11, 12, 31, 32],
  sensual: [2, 5, 7, 8, 10, 13, 14, 15, 33, 34],
  private: [16, 17, 19, 21, 23, 26, 27, 29, 35, 36],
  mainstream: [18, 20, 22, 24, 25, 28, 30, 37, 38, 39, 40],
  creative: [41, 42, 43, 44, 45],
  logical: [46, 47, 48, 49, 50],
};

export const ANSWER_OPTIONS = [
  { value: -2, label: '전혀 아니다' },
  { value: -1, label: '아니다' },
  { value: 0, label: '보통' },
  { value: 1, label: '그렇다' },
  { value: 2, label: '매우 그렇다' },
];
