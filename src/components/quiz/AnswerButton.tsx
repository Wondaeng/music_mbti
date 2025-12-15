import { motion } from 'framer-motion';
import clsx from 'clsx';

interface AnswerButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function AnswerButton({
  label,
  selected,
  onClick,
}: AnswerButtonProps) {
  return (
    <motion.button
      className={clsx(
        'w-full rounded-xl border-2 transition-all duration-300 p-4',
        'text-body font-medium',
        'min-h-[56px]', // Touch-friendly target
        selected
          ? 'border-accent-primary bg-accent-primary/20 shadow-lg shadow-accent-primary/20'
          : 'border-black/10 bg-white/50 hover:border-accent-primary/50 hover:bg-white/80'
      )}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.button>
  );
}
