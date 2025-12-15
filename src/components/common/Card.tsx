import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children?: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className,
  hover = false,
}: CardProps) {
  return (
    <motion.div
      className={clsx('glass-card p-6 lg:p-8', className)}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)' } : {}}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
