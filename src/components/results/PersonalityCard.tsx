import { motion } from 'framer-motion';
import Card from '@/components/common/Card';
import { PersonalityResult } from '@/types';

interface PersonalityCardProps {
  result: PersonalityResult;
}

export default function PersonalityCard({ result }: PersonalityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.2,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Card className="max-w-3xl mx-auto text-center relative overflow-hidden">
        {/* Decorative background gradient */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at top center, ${result.color.primary}, transparent 70%)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Personality type badge */}
          <motion.div
            className="inline-block px-8 py-3 rounded-full text-h2 font-bold mb-6 relative"
            style={{
              background: `linear-gradient(135deg, ${result.color.primary}, ${result.color.secondary})`,
              color: 'white',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
          >
            {/* Pulsing glow behind badge */}
            <motion.div
              className="absolute inset-0 rounded-full -z-10"
              style={{
                background: `linear-gradient(135deg, ${result.color.primary}, ${result.color.secondary})`,
                filter: 'blur(20px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {result.type}
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-h2 lg:text-h1 font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {result.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-body-lg lg:text-h4 italic mb-8"
            style={{ color: result.color.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            "{result.tagline}"
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-body lg:text-body-lg text-text-secondary leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {result.description}
          </motion.p>

          {/* Characteristics */}
          <div className="grid grid-cols-2 gap-4">
            {result.characteristics.map((characteristic, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-xl bg-background-secondary relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${result.color.primary}, ${result.color.secondary})`,
                  }}
                />
                <p className="text-body font-medium relative z-10">{characteristic}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
