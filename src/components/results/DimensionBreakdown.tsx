import { motion } from 'framer-motion';
import Card from '@/components/common/Card';
import { DimensionScore } from '@/types';

interface DimensionBreakdownProps {
  scores: DimensionScore[];
}

export default function DimensionBreakdown({ scores }: DimensionBreakdownProps) {
  const dimensionColors: Record<string, string> = {
    AS: '#EC4899',
    PM: '#6366F1',
    CL: '#8B5CF6',
  };

  const dimensionNames: Record<string, string> = {
    AS: '예술 vs 감각',
    PM: '개인 vs 대중',
    CL: '창의 vs 분석',
  };

  const sideDescriptions: Record<
    string,
    { left: string; right: string }
  > = {
    AS: { left: 'Artistic', right: 'Sensual' },
    PM: { left: 'Private', right: 'Mainstream' },
    CL: { left: 'Creative', right: 'Logical' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="max-w-3xl mx-auto"
    >
      <Card className="relative overflow-hidden">
        {/* Decorative corner sparkles */}
        <div className="absolute top-4 right-4 text-2xl opacity-20">✨</div>
        <div className="absolute bottom-4 left-4 text-2xl opacity-20">✨</div>

        <motion.h2
          className="text-h3 font-semibold mb-8 text-center bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          성향 분석
        </motion.h2>

        <div className="space-y-6">
          {scores.map((score, index) => {
            // Calculate proportions from center (50%)
            const leftPercentage = score.percentage;
            const rightPercentage = 100 - score.percentage;

            // Determine which side is dominant
            const leftIsDominant = leftPercentage >= 50;

            return (
              <motion.div
                key={score.dimension}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="group"
              >
                {/* Dimension name */}
                <motion.div
                  className="text-body-sm text-text-secondary mb-2 text-center font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  {dimensionNames[score.dimension]}
                </motion.div>

                {/* Bar container */}
                <div className="flex items-center gap-4">
                  {/* Left label */}
                  <motion.div
                    className="w-16 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className="text-h4 font-bold"
                      style={{
                        color: leftIsDominant
                          ? dimensionColors[score.dimension]
                          : '#9CA3AF',
                      }}
                    >
                      {score.leftLabel}
                    </div>
                    <div className="text-xs font-medium text-text-secondary">
                      {sideDescriptions[score.dimension].left}
                    </div>
                  </motion.div>

                  {/* Progress bar - fills both sides from center */}
                  <div className="flex-1 relative h-8 bg-background-secondary rounded-full overflow-hidden shadow-inner group-hover:shadow-lg transition-shadow duration-300">
                    {/* Left bar - fills from center to left */}
                    <motion.div
                      className="absolute h-full right-1/2"
                      style={{
                        background: leftIsDominant ? dimensionColors[score.dimension] : '#9CA3AF', // Gray if minor
                        width: `${leftPercentage / 2}%`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${leftPercentage / 2}%` }}
                      transition={{
                        delay: 0.6 + index * 0.1,
                        duration: 0.8,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Right bar - fills from center to right */}
                    <motion.div
                      className="absolute h-full left-1/2"
                      style={{
                        background: !leftIsDominant ? dimensionColors[score.dimension] : '#9CA3AF', // Gray if minor
                        width: `${rightPercentage / 2}%`,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${rightPercentage / 2}%` }}
                      transition={{
                        delay: 0.6 + index * 0.1,
                        duration: 0.8,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Center line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black/40 z-10" />

                    {/* Percentage text */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="text-body-sm font-semibold text-text-primary">
                        {score.leftLabel} {leftPercentage}% - {rightPercentage}% {score.rightLabel}
                      </span>
                    </div>
                  </div>

                  {/* Right label */}
                  <motion.div
                    className="w-16 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className="text-h4 font-bold"
                      style={{
                        color: !leftIsDominant
                          ? dimensionColors[score.dimension]
                          : '#9CA3AF',
                      }}
                    >
                      {score.rightLabel}
                    </div>
                    <div className="text-xs font-medium text-text-secondary">
                      {sideDescriptions[score.dimension].right}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
