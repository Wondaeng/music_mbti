import Button from '@/components/common/Button';
import { useQuizStore } from '@/store/quizStore';

export default function NavigationControls() {
  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const getCanGoNext = useQuizStore((state) => state.getCanGoNext);
  const getCanGoPrevious = useQuizStore((state) => state.getCanGoPrevious);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);
  const previousQuestion = useQuizStore((state) => state.previousQuestion);

  const canGoNext = getCanGoNext();
  const canGoPrevious = getCanGoPrevious();

  return (
    <div className="flex justify-between items-center max-w-3xl mx-auto mt-8">
      <Button
        variant="ghost"
        onClick={previousQuestion}
        disabled={!canGoPrevious}
        className="flex items-center gap-2"
      >
        <span>←</span>
        이전
      </Button>

      <Button
        variant="primary"
        onClick={nextQuestion}
        disabled={!canGoNext}
        className="flex items-center gap-2"
      >
        {currentQuestion === 49 ? '결과 보기' : '다음'}
        {currentQuestion !== 49 && <span>→</span>}
      </Button>
    </div>
  );
}
