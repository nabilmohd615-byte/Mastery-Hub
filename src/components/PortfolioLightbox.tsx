import React, { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import type { PortfolioItem } from '../utils/masteryUtils';

interface PortfolioLightboxProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onInquire: (serviceName: string) => void;
}

export const PortfolioLightbox: React.FC<PortfolioLightboxProps> = ({
  item,
  onClose,
  onInquire,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgFailed(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2D020D]/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white/95 backdrop-blur-2xl border border-[#800020]/15 shadow-[0_30px_80px_-16px_rgba(45,2,13,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#800020]/10 px-6 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-[#800020] font-medium">
              <span>{item.client}</span>
              <span aria-hidden="true">·</span>
              <span>{item.categoryLabel}</span>
            </div>
            <h2
              id="lightbox-title"
              className="mt-0.5 font-display text-lg sm:text-xl font-bold text-[#1A080D] truncate"
            >
              {item.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project preview"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#800020]/15 bg-white text-[#4A0416] hover:bg-[#800020] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-[#FFF5F7] p-4 sm:p-6 flex items-center justify-center max-h-[62vh] overflow-hidden">
          {!imgFailed ? (
            <img
              src={item.imageSrc}
              alt={item.imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="max-h-[54vh] w-auto max-w-full rounded-2xl object-contain shadow-md border border-[#800020]/10"
            />
          ) : (
            <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#800020]/10 to-[#4A0416]/15 text-center p-6">
              <p className="font-display text-lg font-semibold text-[#4A0416]">{item.title}</p>
              <p className="mt-1 text-sm text-[#4A0416]/70">{item.client}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 bg-white/90 border-t border-[#800020]/10">
          <div className="space-y-2">
            <p className="text-sm text-[#4A0416]/85 max-w-xl">{item.summary}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#4A0416]/75">
              {item.metrics.map((m, idx) => (
                <React.Fragment key={m.label}>
                  {idx > 0 && <span aria-hidden="true">·</span>}
                  <span>
                    {m.label}:{' '}
                    <strong className="font-semibold text-[#800020] tabular-nums">
                      {m.value}
                    </strong>
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onInquire(item.category === 'meta-ads' ? 'Facebook Ads' : 'brand strategy');
            }}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#800020] px-5 text-sm font-semibold text-white hover:bg-[#6B0F24] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Discuss Similar Project</span>
          </button>
        </div>
      </div>
    </div>
  );
};
