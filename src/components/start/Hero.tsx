import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { useQuizStore } from '@/store/quizStore';

export default function Hero() {
  const startQuiz = useQuizStore((state) => state.startQuiz);

  return (
    <div className="text-center mb-16 lg:mb-24 relative">
      {/* Decorative circles behind title */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-primary/20 to-accent-tertiary/20 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main badge/tag */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 border border-accent-primary/20 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.5 }}
      >
        <span className="text-2xl">🎧</span>
        <span className="text-body-sm font-semibold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
          Music Personality Test
        </span>
      </motion.div>

      {/* Main title with gradient */}
      <motion.h1
        className="text-h1 lg:text-hero font-bold mb-4 lg:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent">
          당신의 음악 성향을
        </span>
        <br />
        <span className="bg-gradient-to-r from-accent-tertiary via-accent-secondary to-accent-primary bg-clip-text text-transparent">
          알아보세요
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-body-lg lg:text-h4 text-text-secondary mb-8 lg:mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        50가지 질문으로 발견하는 나만의 음악 MBTI
      </motion.p>

      {/* CTA Button with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative inline-block"
      >
        {/* Glow effect behind button */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full blur-xl opacity-50"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <Button
          size="lg"
          onClick={startQuiz}
          className="relative shadow-2xl shadow-accent-primary/30 hover:shadow-accent-primary/50 transition-shadow duration-300"
        >
          <span className="flex items-center gap-2">
            시작하기
            <span className="text-xl">→</span>
          </span>
        </Button>
      </motion.div>

      {/* Quick info */}
      <motion.p
        className="text-body-sm text-text-tertiary mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        ⏱️ 약 5-7분 소요 · 💾 자동 저장
      </motion.p>
    </div>
  );
}
