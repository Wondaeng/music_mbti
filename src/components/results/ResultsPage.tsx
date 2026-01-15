import { motion } from 'framer-motion';
import PageTransition from '@/components/common/PageTransition';
import PersonalityCard from './PersonalityCard';
import DimensionBreakdown from './DimensionBreakdown';
import ShareButtons from './ShareButtons';
import PlanBBanner from './PlanBBanner';
import Button from '@/components/common/Button';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useQuizStore } from '@/store/quizStore';

export default function ResultsPage() {
  const results = useQuizResults();
  const restartQuiz = useQuizStore((state) => state.restartQuiz);

  if (!results) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <p className="text-h3 text-text-secondary">결과를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background-primary via-background-secondary to-background-primary relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs */}
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent-tertiary/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-3xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Confetti particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
              }}
              initial={{ y: 0, opacity: 0, rotate: 0 }}
              animate={{
                y: '120vh',
                opacity: [0, 1, 1, 0],
                rotate: 360,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {['🎵', '🎶', '⭐', '✨', '🎧', '🎤'][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 py-12 lg:py-20 max-w-6xl relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Completion badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <span className="text-2xl">🎉</span>
              <span className="text-body font-semibold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                분석 완료!
              </span>
            </motion.div>

            <h2 className="text-h3 lg:text-h2 text-text-secondary mb-2">
              당신의 음악 성향은...
            </h2>
          </motion.div>

          {/* Personality card */}
          <div className="mb-12">
            <PersonalityCard result={results.personalityResult} />
          </div>

          {/* Dimension breakdown */}
          <div className="mb-12">
            <DimensionBreakdown scores={results.dimensionScores} />
          </div>

          {/* External banner */}
          <motion.div
            className="mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <PlanBBanner />
          </motion.div>

          {/* Share buttons */}
          <div className="mb-8">
            <ShareButtons personalityName={results.personalityResult.name} />
          </div>

          {/* Restart button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <Button variant="ghost" onClick={restartQuiz}>
              다시 테스트하기
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
