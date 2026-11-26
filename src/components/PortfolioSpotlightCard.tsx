import React, { useRef, useState } from 'react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import {
  computePointerGlow,
  type PointerGlowState,
  type PortfolioItem,
} from '../utils/masteryUtils';

interface PortfolioSpotlightCardProps {
  item: PortfolioItem;
  onSelect: (item: PortfolioItem) => void;
}

const DEFAULT_GLOW: PointerGlowState = {
  xPct: 50,
  yPct: 50,
  tiltX: 0,
  tiltY: 0,
};

export const PortfolioSpotlightCard: React.FC<PortfolioSpotlightCardProps> = ({
  item,
  onSelect,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [glow, setGlow] = useState<PointerGlowState>(DEFAULT_GLOW);
  const [imgFailed, setImgFailed] = useState(false);

  const updatePointer = (clientX: number, clientY: number) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setGlow(computePointerGlow(clientX, clientY, rect));
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    setIsActive(true);
    updatePointer(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isActive) setIsActive(true);
    updatePointer(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    setIsActive(false);
    setGlow(DEFAULT_GLOW);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    setIsActive(true);
    if (e.touches[0]) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches[0]) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsActive(false);
    setGlow(DEFAULT_GLOW);
  };

  return (
    <div className="relative flex flex-col">
      {/* Ambient radial maroon glow halo behind card */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-3 rounded-[2rem] transition-all duration-500 blur-2xl ${
          isActive ? 'opacity-90 scale-[1.02] animate-pulse-aura' : 'opacity-0 scale-95'
        }`}
        style={{
          background: `radial-gradient(circle at ${glow.xPct}% ${glow.yPct}%, rgba(244, 63, 94, 0.45), rgba(128, 0, 32, 0.25) 55%, transparent 80%)`,
        }}
      />

      <article
        ref={cardRef}
        data-testid={`portfolio-card-${item.id}`}
        data-glow-active={isActive ? 'true' : 'false'}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onFocusCapture={() => setIsActive(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setIsActive(false);
            setGlow(DEFAULT_GLOW);
          }
        }}
        className="group relative flex flex-1 flex-col rounded-3xl p-[2px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{
          transform: isActive
            ? `perspective(1100px) rotateX(${(glow.tiltX * 0.45).toFixed(2)}deg) rotateY(${(
                glow.tiltY * 0.45
              ).toFixed(2)}deg) translateY(-4px)`
            : 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)',
          boxShadow: isActive
            ? '0 24px 54px -14px rgba(128, 0, 32, 0.36), 0 0 34px 4px rgba(244, 63, 94, 0.24)'
            : '0 12px 36px -12px rgba(74, 4, 22, 0.1)',
        }}
      >
        {/* Rotating animated conic glow ring */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 rounded-3xl overflow-hidden transition-opacity duration-300 ${
            isActive ? 'opacity-100' : 'opacity-20'
          }`}
        >
          <div
            className="absolute -inset-[60%] animate-spin-slow"
            style={{
              background:
                'conic-gradient(from 0deg, #800020, #FB7185, #FFFFFF, #FDA4AF, #9F1239, #800020)',
            }}
          />
        </div>

        {/* Inner frosted glass card body */}
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-[calc(1.5rem-2px)] bg-white/88 backdrop-blur-xl border border-[#800020]/10">
          <button
            type="button"
            onClick={() => onSelect(item)}
            aria-label={`Inspect ${item.title}`}
            className="relative block w-full aspect-[4/3] overflow-hidden bg-white p-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#800020]"
          >
            {!imgFailed ? (
              <img
                src={item.imageSrc}
                alt={item.imageAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className={`h-full w-full rounded-2xl object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? 'scale-[1.025]' : 'scale-100'
                }`}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#800020]/10 to-[#4A0416]/15 p-6 text-center">
                <span className="font-display text-lg font-semibold text-[#4A0416]">
                  {item.title}
                </span>
                <span className="mt-1 text-xs text-[#800020]">{item.client}</span>
              </div>
            )}

            {/* Cursor-following luminous glass spotlight overlay on image */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background: `radial-gradient(circle 220px at ${glow.xPct}% ${glow.yPct}%, rgba(255, 255, 255, 0.35), rgba(225, 29, 72, 0.16) 45%, transparent 78%)`,
              }}
            />

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2D020D]/40 via-transparent to-transparent transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <span
              className={`pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#4A0416] shadow-sm transition-opacity duration-200 backdrop-blur-md ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Maximize2 className="h-3.5 w-3.5 text-[#800020]" />
              <span>View Case Study</span>
            </span>
          </button>

          <div className="relative flex flex-1 flex-col justify-between p-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#800020]">
                <span>{item.client}</span>
                <span aria-hidden="true">·</span>
                <span>{item.categoryLabel}</span>
              </div>
              <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-[#1A080D]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4A0416]/80">
                {item.summary}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#800020]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#4A0416]/75">
                {item.metrics.map((metric, metricIdx) => (
                  <React.Fragment key={metric.label}>
                    {metricIdx > 0 && <span aria-hidden="true">·</span>}
                    <span>
                      {metric.label}:{' '}
                      <strong className="font-semibold text-[#1A080D] tabular-nums">
                        {metric.value}
                      </strong>
                    </span>
                  </React.Fragment>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onSelect(item)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#800020] hover:text-[#4A0416] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Details</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
