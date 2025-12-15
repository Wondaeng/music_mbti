import { AnimatePresence, motion } from 'framer-motion';
import Card from '@/components/common/Card';
import AnswerButton from './AnswerButton';
import { Question } from '@/types';
import { ANSWER_OPTIONS } from '@/data/scoring';
import { useQuizStore } from '@/store/quizStore';

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const answers = useQuizStore((state) => state.answers);
  const answerQuestion = useQuizStore((state) => state.answerQuestion);

  const selectedAnswer = answers.get(question.id) ?? null;

  const handleAnswer = (value: number) => {
    answerQuestion(question.id, value);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <Card className="max-w-3xl mx-auto">
          {/* Question number badge */}
          <div className="inline-block px-4 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-body-sm font-semibold mb-6">
            Q{question.id + 1}
          </div>

          {/* Question text */}
          <h2 className="text-h4 lg:text-h3 font-semibold mb-8 lg:mb-10 leading-relaxed">
            {question.text}
          </h2>

          {/* Answer options */}
          <div className="space-y-3">
            {ANSWER_OPTIONS.map((option) => (
              <AnswerButton
                key={option.value}
                value={option.value}
                label={option.label}
                selected={selectedAnswer === option.value}
                onClick={() => handleAnswer(option.value)}
              />
            ))}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
