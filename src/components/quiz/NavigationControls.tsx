import Button from '@/components/common/Button';
import { useQuizStore } from '@/store/quizStore';

export default function NavigationControls() {
  const currentBatch = useQuizStore((state) => state.currentBatch);
  const getCanGoNext = useQuizStore((state) => state.getCanGoNext);
  const getCanGoPrevious = useQuizStore((state) => state.getCanGoPrevious);
  const nextBatch = useQuizStore((state) => state.nextBatch);
  const previousBatch = useQuizStore((state) => state.previousBatch);

  const canGoNext = getCanGoNext();
  const canGoPrevious = getCanGoPrevious();

  return (
    <div className="flex justify-between items-center max-w-3xl mx-auto mt-8">
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
  );
}
