import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/common/PageTransition';
import ProgressBar from '@/components/common/ProgressBar';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { useQuizStore } from '@/store/quizStore';
import { questions } from '@/data/questions';
import { ANSWER_OPTIONS } from '@/data/scoring';

export default function QuizPage() {
  const currentBatch = useQuizStore((state) => state.currentBatch);
  const getCurrentQuestions = useQuizStore((state) => state.getCurrentQuestions);
  const answers = useQuizStore((state) => state.answers);
  const answerQuestion = useQuizStore((state) => state.answerQuestion);
  const nextBatch = useQuizStore((state) => state.nextBatch);
  const previousBatch = useQuizStore((state) => state.previousBatch);
  const getCanGoNext = useQuizStore((state) => state.getCanGoNext);
  const getCanGoPrevious = useQuizStore((state) => state.getCanGoPrevious);

  const currentQuestions = getCurrentQuestions();
  const canGoNext = getCanGoNext();
  const canGoPrevious = getCanGoPrevious();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && canGoPrevious) {
        previousBatch();
      } else if (e.key === 'ArrowRight' && canGoNext) {
        nextBatch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoNext, canGoPrevious, nextBatch, previousBatch]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background-primary">
        <ProgressBar />

        <div className="container mx-auto px-4 py-8 lg:py-12 max-w-5xl">
          <motion.div
            key={currentBatch}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Card>
              <div className="space-y-10">
                {currentQuestions.map((questionId) => {
                  const question = questions[questionId];
                  const selectedAnswer = answers.get(questionId) ?? null;

                  return (
                    <div key={questionId} className="border-b border-black/5 last:border-b-0 pb-8 last:pb-0">
                      {/* Question number and text */}
                      <div className="mb-4">
                        <div className="inline-block px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-body-sm font-semibold mb-3">
                          Q{questionId + 1}
                        </div>
                        <h3 className="text-body-lg lg:text-h4 font-medium leading-relaxed">
                          {question.text}
                        </h3>
                      </div>

                      {/* Horizontal radio buttons */}
                      <div className="grid grid-cols-5 gap-2 lg:gap-3">
                        {ANSWER_OPTIONS.map((option) => {
                          const isSelected = selectedAnswer === option.value;
                          return (
                            <button
                              key={option.value}
                              onClick={() => answerQuestion(questionId, option.value)}
                              className={`
                                flex flex-col items-center justify-center
                                p-3 lg:p-4 rounded-xl border-2 transition-all duration-200
                                min-h-[80px] lg:min-h-[90px]
                                ${
                                  isSelected
                                    ? 'border-accent-primary bg-accent-primary/10 shadow-md'
                                    : 'border-black/10 bg-white/50 hover:border-accent-primary/50 hover:bg-white/80'
                                }
                              `}
                            >
                              {/* Radio circle */}
                              <div className={`
                                w-5 h-5 rounded-full border-2 mb-2 flex items-center justify-center
                                ${isSelected ? 'border-accent-primary' : 'border-black/20'}
                              `}>
                                {isSelected && (
                                  <div className="w-3 h-3 rounded-full bg-accent-primary" />
                                )}
                              </div>

                              {/* Label */}
                              <span className={`
                                text-xs lg:text-sm font-medium text-center
                                ${isSelected ? 'text-accent-primary' : 'text-text-secondary'}
                              `}>
                                {option.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="ghost"
              onClick={previousBatch}
              disabled={!canGoPrevious}
              className="flex items-center gap-2"
            >
              <span>←</span>
              이전
            </Button>

            <Button
              variant="primary"
              onClick={nextBatch}
              disabled={!canGoNext}
              className="flex items-center gap-2"
            >
              {currentBatch === 9 ? '결과 보기' : '다음'}
              {currentBatch !== 9 && <span>→</span>}
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
