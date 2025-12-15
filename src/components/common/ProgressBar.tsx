import { motion } from 'framer-motion';
import { useQuizStore } from '@/store/quizStore';

export default function ProgressBar() {
  const currentBatch = useQuizStore((state) => state.currentBatch);
  const getProgress = useQuizStore((state) => state.getProgress);

  const progress = getProgress();
  const batchStart = currentBatch * 5 + 1;
  const batchEnd = (currentBatch + 1) * 5;

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-black/10">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        {/* Progress text */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-body-sm text-text-secondary">
            질문 {batchStart}-{batchEnd} / 50 (페이지 {currentBatch + 1}/10)
          </span>
          <span className="text-body-sm font-semibold text-accent-primary">
            {progress}%
          </span>
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
