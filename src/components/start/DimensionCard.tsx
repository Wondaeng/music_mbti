import { motion } from 'framer-motion';
import Card from '@/components/common/Card';

interface DimensionCardProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  delay: number;
}

export default function DimensionCard({
  icon,
  title,
  subtitle,
  description,
  gradient,
  delay,
}: DimensionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -8 }}
    >
      <Card
        hover
        className="h-full border-t-4 relative overflow-hidden group"
        style={{ borderTopColor: gradient }}
      >
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, ${gradient}, transparent)` }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon with animation */}
          <motion.div
            className="text-5xl mb-4"
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-h4 font-semibold mb-2 group-hover:text-accent-primary transition-colors">
            {title}
          </h3>

          {/* Subtitle with gradient */}
          <p
            className="text-body-sm font-medium mb-3"
            style={{ color: gradient }}
          >
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-body text-text-secondary leading-relaxed">
            {description}
          </p>

          {/* Decorative dot */}
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: gradient }} />
        </div>
      </Card>
    </motion.div>
  );
}
