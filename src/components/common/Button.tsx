import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'rounded-full font-semibold transition-all duration-300';

  const variantStyles = {
    primary:
      'bg-accent-primary text-white hover:bg-accent-primary/90 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
    ghost:
      'text-accent-primary hover:bg-accent-primary/10 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const sizeStyles = {
    sm: 'px-6 py-2 text-body-sm',
    md: 'px-8 py-3 text-body',
    lg: 'px-10 py-4 text-body-lg',
  };

  return (
    <motion.button
      type={type}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
