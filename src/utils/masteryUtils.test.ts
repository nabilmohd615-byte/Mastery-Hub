import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildWhatsAppUrl,
  computePointerGlow,
  filterPortfolioItems,
  sanitizeWhatsAppNumber,
  type PortfolioItem,
} from './masteryUtils';

test('sanitizeWhatsAppNumber strips spaces, dashes, and plus sign', () => {
  assert.equal(sanitizeWhatsAppNumber('+880 1328-750810'), '8801328750810');
  assert.equal(sanitizeWhatsAppNumber('+966509850428'), '966509850428');
});

test('buildWhatsAppUrl generates valid wa.me links with optional encoded message', () => {
  assert.equal(
    buildWhatsAppUrl('+8801328750810'),
    'https://wa.me/8801328750810'
  );
  assert.equal(
    buildWhatsAppUrl('+966509850428', 'Hello Mastery Hub!'),
    'https://wa.me/966509850428?text=Hello%20Mastery%20Hub!'
  );
});

test('filterPortfolioItems filters by category and preserves all on "all"', () => {
  const sample: PortfolioItem[] = [
    {
      id: '1',
      title: 'Meta Ad',
      client: 'Client A',
      category: 'meta-ads',
      categoryLabel: 'Meta Ads',
      summary: 'Summary',
      imageSrc: '/a.jpg',
      imageAlt: 'A',
      metrics: [],
    },
    {
      id: '2',
      title: 'Brand Setup',
      client: 'Client B',
      category: 'branding',
      categoryLabel: 'Page & Brand Setup',
      summary: 'Summary',
      imageSrc: '/b.jpg',
      imageAlt: 'B',
      metrics: [],
    },
  ];

  assert.equal(filterPortfolioItems(sample, 'all').length, 2);
  assert.equal(filterPortfolioItems(sample, 'meta-ads').length, 1);
  assert.equal(filterPortfolioItems(sample, 'meta-ads')[0].id, '1');
  assert.equal(filterPortfolioItems(sample, 'branding')[0].id, '2');
});

test('computePointerGlow calculates centered, clamped coordinates and tilt', () => {
  const rect = { left: 100, top: 100, width: 200, height: 200 };

  const center = computePointerGlow(200, 200, rect);
  assert.deepEqual(center, { xPct: 50, yPct: 50, tiltX: 0, tiltY: 0 });

  const topLeft = computePointerGlow(100, 100, rect);
  assert.deepEqual(topLeft, { xPct: 0, yPct: 0, tiltX: 7, tiltY: -7 });

  const clampedOut = computePointerGlow(500, -50, rect);
  assert.deepEqual(clampedOut, { xPct: 100, yPct: 0, tiltX: 7, tiltY: 7 });
});
