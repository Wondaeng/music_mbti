import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';
import Button from '@/components/common/Button';

export default function ProgressBar() {
  const currentBatch = useQuizStore((state) => state.currentBatch);
  const getProgress = useQuizStore((state) => state.getProgress);
  const restartQuiz = useQuizStore((state) => state.restartQuiz);

  const progress = getProgress();
  const batchStart = currentBatch * 5 + 1;
  const batchEnd = (currentBatch + 1) * 5;

  const handleQuit = () => {
    const ok = window.confirm(
      '현재 진행 중인 테스트를 종료하고 처음으로 돌아갈까요?\n(선택한 답변은 초기화됩니다)'
    );
    if (!ok) return;
    restartQuiz();
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-black/10">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        {/* Progress text */}
        <div className="flex justify-between items-center mb-2 gap-3">
          <span className="text-body-sm text-text-secondary">
            질문 {batchStart}-{batchEnd} / 50 (페이지 {currentBatch + 1}/10)
          </span>
          <div className="flex items-center gap-3">
            <span className="text-body-sm font-semibold text-accent-primary">
              {progress}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleQuit}
              className="whitespace-nowrap"
            >
              그만하기
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>
    </div>
  );
}
