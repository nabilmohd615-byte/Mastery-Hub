import React, { useRef, useState } from 'react';
import { HERO_PORTRAIT } from '../data/portfolioData';
import { computePointerGlow, type PointerGlowState } from '../utils/masteryUtils';

const DEFAULT_GLOW: PointerGlowState = {
  xPct: 50,
  yPct: 50,
  tiltX: 0,
  tiltY: 0,
};

export const PortraitSpotlight: React.FC = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [glow, setGlow] = useState<PointerGlowState>(DEFAULT_GLOW);
  const [imageError, setImageError] = useState(false);

  const updatePointer = (clientX: number, clientY: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setGlow(computePointerGlow(clientX, clientY, rect));
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsActive(true);
    updatePointer(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isActive) setIsActive(true);
    updatePointer(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    setIsActive(false);
    setGlow(DEFAULT_GLOW);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsActive(true);
    if (e.touches[0]) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsActive(false);
    setGlow(DEFAULT_GLOW);
  };

  return (
    <div className="relative flex items-center justify-center w-full lg:h-full">
      {/* Ambient backdrop glow behind portrait */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-6 rounded-[2.25rem] transition-all duration-500 blur-3xl ${
          isActive ? 'opacity-100 scale-105 animate-pulse-aura' : 'opacity-40 scale-95'
        }`}
        style={{
          background: `radial-gradient(circle at ${glow.xPct}% ${glow.yPct}%, rgba(244, 63, 94, 0.72), rgba(128, 0, 32, 0.42) 52%, transparent 80%)`,
        }}
      />

      {/* Interactive tilt & animated glowing container */}
      <div
        ref={frameRef}
        data-testid="hero-portrait-interactive"
        data-glow-active={isActive ? 'true' : 'false'}
        tabIndex={0}
        aria-label="Mastery Hub founder portrait — hover or touch for interactive glow"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onFocus={() => setIsActive(true)}
        onBlur={() => {
          setIsActive(false);
          setGlow(DEFAULT_GLOW);
        }}
        className="group relative w-full max-w-[490px] aspect-square rounded-[1.75rem] p-[3px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform select-none"
        style={{
          transform: isActive
            ? `perspective(1000px) rotateX(${glow.tiltX}deg) rotateY(${glow.tiltY}deg) scale(1.025)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
          boxShadow: isActive
            ? '0 32px 72px -12px rgba(128, 0, 32, 0.68), 0 0 56px 10px rgba(244, 63, 94, 0.48), 0 0 18px 2px rgba(255, 255, 255, 0.45)'
            : '0 20px 44px -18px rgba(74, 4, 22, 0.28)',
        }}
      >
        {/* Rotating animated conic glow ring */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -inset-[3px] rounded-[1.85rem] overflow-hidden transition-opacity duration-300 ${
            isActive ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <div
            className="absolute -inset-[55%] animate-spin-slow"
            style={{
              background:
                'conic-gradient(from 0deg, #800020, #FB7185, #FFFFFF, #FDA4AF, #9F1239, #800020)',
            }}
          />
        </div>

        {/* Inner frosted glass frame */}
        <div className="relative h-full w-full overflow-hidden rounded-[calc(1.75rem-3px)] bg-[#2D020D]">
          {!imageError ? (
            <img
              src={HERO_PORTRAIT.src}
              alt={HERO_PORTRAIT.alt}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className={`h-full w-full object-cover object-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive ? 'scale-[1.04]' : 'scale-100'
              }`}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#4A0416] to-[#800020] p-8 text-center text-white">
              <span className="font-display text-2xl font-bold tracking-tight">Mastery Hub</span>
              <span className="mt-2 text-sm text-white/80">AI Expert &amp; Digital Marketer</span>
            </div>
          )}

          {/* Cursor-following luminous glass spotlight overlay */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: `radial-gradient(circle 220px at ${glow.xPct}% ${glow.yPct}%, rgba(255, 255, 255, 0.24), rgba(225, 29, 72, 0.22) 45%, transparent 78%)`,
              mixBlendMode: 'screen',
            }}
          />

          {/* Subtle glass edge sheen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[calc(1.75rem-3px)] ring-1 ring-inset ring-white/25"
          />

          {/* Subtle bottom glass caption bar */}
          <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-xl bg-white/15 px-4 py-2.5 backdrop-blur-md border border-white/25 text-white flex items-center justify-between">
            <div>
              <p className="font-display text-sm font-semibold leading-tight">Mastery Hub</p>
              <p className="text-xs text-white/85">AI Expert &amp; Digital Marketer</p>
            </div>
            <span className="text-xs font-medium text-white/90 whitespace-nowrap">
              Growth Partner
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
