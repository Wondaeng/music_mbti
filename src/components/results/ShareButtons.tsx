import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/common/Button';
import { shareKakaoText } from '@/utils/kakao';

interface ShareButtonsProps {
  personalityName: string;
}

export default function ShareButtons({ personalityName }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = `나의 음악 MBTI는 ${personalityName}입니다! 당신의 음악 성향은 무엇인가요?`;
    const url = window.location.origin;

    const kakaoShared = await shareKakaoText({ text, url });
    if (kakaoShared) return;

    if (navigator.share) {
      navigator.share({
        title: '음악 MBTI 테스트',
        text: text,
        url: url,
      });
    } else {
      // Fallback to Twitter
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        '_blank'
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="max-w-3xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="secondary" onClick={() => void handleShare()} className="relative">
          공유하기
        </Button>

        <Button variant="secondary" onClick={handleCopyLink} className="relative">
          {copied ? '링크 복사됨!' : '링크 복사'}
        </Button>
      </div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center mt-4 text-body-sm text-accent-primary"
          >
            ✓ 클립보드에 복사되었습니다
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
