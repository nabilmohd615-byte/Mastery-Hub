export type PortfolioCategory = 'all' | 'meta-ads' | 'branding';

export interface PortfolioMetric {
  label: string;
  value: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: Exclude<PortfolioCategory, 'all'>;
  categoryLabel: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  metrics: PortfolioMetric[];
}

export interface PointerGlowState {
  xPct: number;
  yPct: number;
  tiltX: number;
  tiltY: number;
}

export function sanitizeWhatsAppNumber(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

export function buildWhatsAppUrl(phone: string, message?: string): string {
  const digits = sanitizeWhatsAppNumber(phone);
  if (!digits) {
    return 'https://wa.me/';
  }
  const base = `https://wa.me/${digits}`;
  const trimmed = message?.trim();
  if (!trimmed) {
    return base;
  }
  return `${base}?text=${encodeURIComponent(trimmed)}`;
}

export function filterPortfolioItems(
  items: PortfolioItem[],
  category: PortfolioCategory
): PortfolioItem[] {
  if (category === 'all') {
    return items;
  }
  return items.filter((item) => item.category === category);
}

export function computePointerGlow(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number }
): PointerGlowState {
  const safeWidth = rect.width > 0 ? rect.width : 1;
  const safeHeight = rect.height > 0 ? rect.height : 1;

  const rawX = ((clientX - rect.left) / safeWidth) * 100;
  const rawY = ((clientY - rect.top) / safeHeight) * 100;

  const xPct = Math.min(100, Math.max(0, Number(rawX.toFixed(2))));
  const yPct = Math.min(100, Math.max(0, Number(rawY.toFixed(2))));

  const normX = (xPct - 50) / 50; // -1 to 1
  const normY = (yPct - 50) / 50; // -1 to 1

  const maxTilt = 7;
  const tiltY = Number((normX * maxTilt).toFixed(2));
  const tiltX = Number((-normY * maxTilt).toFixed(2));

  return { xPct, yPct, tiltX, tiltY };
}
