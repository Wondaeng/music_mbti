import PageTransition from '@/components/common/PageTransition';
import Hero from './Hero';
import DimensionCard from './DimensionCard';

export default function StartPage() {
  const dimensions = [
    {
      icon: '🎨',
      title: '예술적 vs 감각적',
      subtitle: 'Artistic vs Sensual',
      description: '메시지 중심 vs 느낌 중심',
      gradient: '#EC4899',
    },
    {
      icon: '🎵',
      title: '개인적 vs 대중적',
      subtitle: 'Private vs Mainstream',
      description: '나만의 취향 vs 함께 즐기는 음악',
      gradient: '#6366F1',
    },
    {
      icon: '🎼',
      title: '창의적 vs 분석적',
      subtitle: 'Creative vs Logical',
      description: '즉흥적인 아이디어 vs 체계적인 완성도',
      gradient: '#8B5CF6',
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-background-primary via-background-secondary to-background-primary relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-accent-tertiary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          {/* Floating musical notes */}
          <div className="absolute top-32 left-1/4 text-4xl opacity-5 animate-float">♪</div>
          <div className="absolute top-48 right-1/3 text-5xl opacity-5 animate-float" style={{ animationDelay: '0.5s' }}>♫</div>
          <div className="absolute bottom-32 right-1/4 text-6xl opacity-5 animate-float" style={{ animationDelay: '1s' }}>♬</div>
          <div className="absolute top-2/3 left-1/5 text-4xl opacity-5 animate-float" style={{ animationDelay: '1.5s' }}>♩</div>
        </div>

        <div className="container mx-auto px-4 py-12 lg:py-20 max-w-6xl relative z-10">
          <Hero />

          {/* Section subtitle */}
          <div className="text-center mb-8">
            <h2 className="text-h4 font-semibold text-text-primary mb-2">
              3가지 음악 성향 차원
            </h2>
            <p className="text-body text-text-secondary">
              당신의 음악 취향을 세 가지 관점에서 분석합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {dimensions.map((dimension, index) => (
              <DimensionCard
                key={dimension.title}
                {...dimension}
                delay={0.4 + index * 0.1}
              />
            ))}
          </div>

          {/* Additional info section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-black/10">
              <div className="text-center">
                <div className="text-h2 font-bold text-accent-primary">50</div>
                <div className="text-body-sm text-text-secondary">질문</div>
              </div>
              <div className="w-px h-12 bg-black/10" />
              <div className="text-center">
                <div className="text-h2 font-bold text-accent-secondary">8</div>
                <div className="text-body-sm text-text-secondary">성향 유형</div>
              </div>
              <div className="w-px h-12 bg-black/10" />
              <div className="text-center">
                <div className="text-h2 font-bold text-accent-tertiary">3</div>
                <div className="text-body-sm text-text-secondary">분석 차원</div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 max-w-2xl mx-auto">
              <div className="rounded-2xl bg-white/40 backdrop-blur-sm border border-black/10 px-6 py-4">
                <p className="text-body-sm text-text-tertiary leading-relaxed">
                  이 테스트는 전문적인 진단 소견이 아닙니다. 결과는
                  재미로만 즐겨주세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
