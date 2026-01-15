import planbLogoUrl from '@/assets/logo_horizontal.jpg';

export default function PlanBBanner() {

  return (
    <a
      href="https://planb-ac.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label="Plan.B Academy 사이트로 이동"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border-default bg-white/80 backdrop-blur-xl shadow-lg transition-shadow duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-border-focus">
        {/* Trend-style gradient sheen */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(120deg, rgba(99,102,241,0.10), rgba(139,92,246,0.08), rgba(236,72,153,0.08))',
          }}
        />

        {/* Subtle top accent line */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary" />

        <div className="relative z-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background-secondary border border-border-default">
              <span className="text-2xl" aria-hidden>
                🎹
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-body font-semibold text-text-primary">
                늘 마음속에만 담아두던 음악, 이제 직접 시작해볼까요?
              </p>
              <p className="text-body-sm text-text-secondary">
                1:1 맞춤 커리큘럼으로 첫 곡부터 완성까지 — Plan.B ACADEMY
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <img
              src={planbLogoUrl}
              alt="Plan.B Academy"
              className="h-8 w-auto object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              loading="lazy"
            />

            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary px-5 py-2.5 text-body-sm font-semibold text-white shadow-lg shadow-accent-primary/20 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-accent-primary/30">
              사이트 방문하기
              <span aria-hidden className="text-lg leading-none">
                ↗
              </span>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
