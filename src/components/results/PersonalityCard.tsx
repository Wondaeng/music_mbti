import { motion } from 'framer-motion';
import Card from '@/components/common/Card';
import { PersonalityResult } from '@/types';

interface PersonalityCardProps {
  result: PersonalityResult;
}

export default function PersonalityCard({ result }: PersonalityCardProps) {
  const sections = result.sections ?? [];

  const renderBold = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, index) => {
      const isBold = index % 2 === 1;
      if (!isBold) return <span key={index}>{part}</span>;
      return (
        <strong key={index} className="font-semibold text-text-primary">
          {part}
        </strong>
      );
    });
  };

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
            {result.tagline}
          </motion.p>

          {sections.length > 0 ? (
            <motion.div
              className="text-left mt-6 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl bg-background-secondary border border-border-default p-5 lg:p-6"
                >
                  <h3 className="text-body font-semibold text-text-primary mb-3">
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.body
                      .split(/\n\s*\n/g)
                      .map((paragraph) => paragraph.trim())
                      .filter(Boolean)
                      .map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-body lg:text-body-lg text-text-secondary leading-relaxed whitespace-pre-wrap"
                        >
                          {renderBold(paragraph)}
                        </p>
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
