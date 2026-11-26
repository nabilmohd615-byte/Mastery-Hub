import type { PortfolioItem } from '../utils/masteryUtils';

export interface WhatsAppContact {
  id: string;
  region: string;
  displayNumber: string;
  rawNumber: string;
}

export const WHATSAPP_CONTACTS: WhatsAppContact[] = [
  {
    id: 'bd',
    region: 'Bangladesh',
    displayNumber: '+880 1328-750810',
    rawNumber: '+8801328750810',
  },
  {
    id: 'ksa',
    region: 'Saudi Arabia',
    displayNumber: '+966 50 985 0428',
    rawNumber: '+966509850428',
  },
];

export const HERO_PORTRAIT = {
  src: '/assets/aistudio/904552755_122159488107359196_1286053210489457002_n_0c283aae.jpg',
  alt: 'Founder of Mastery Hub — AI Expert and Digital Marketer with laptop',
};

export const SERVICES_LIST: string[] = [
  'Digital marketing',
  'Social Media Marketing',
  'Facebook Ads',
  'Motion Graphics Video Editing & Ai ads video making',
  'YouTube SEO',
  'content strategy',
  'AI Web Development',
  'brand strategy',
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'riwaaz-wear-branding',
    title: 'Facebook Page Setup, Branding & IG Optimization',
    client: 'Riwaaz Wear',
    category: 'branding',
    categoryLabel: 'Page & Brand Setup',
    summary:
      'Complete business page architecture, custom brand identity, SEO-ready profile setup, and Instagram storefront alignment.',
    imageSrc: '/assets/aistudio/Gemini_Generated_Image_cmc8bccmc8bccmc8_7ce2f9de.jpg',
    imageAlt: 'Riwaaz Wear Facebook Page Setup and Instagram Optimization case study by Mastery Hub',
    metrics: [
      { label: 'Setup', value: 'SEO Ready' },
      { label: 'Channels', value: 'FB + IG' },
      { label: 'Delivery', value: 'Full Branding' },
    ],
  },
  {
    id: 'meta-ads-purchases',
    title: 'Website Purchase Conversion Campaign',
    client: 'Meta Ads Portfolio',
    category: 'meta-ads',
    categoryLabel: 'Meta Ads',
    summary:
      'High-intent conversion campaign driving direct website purchases at an ultra-low cost per acquisition.',
    imageSrc: '/assets/aistudio/911965790_122160485769359196_523633876793634443_n_9c0f3b64.jpg',
    imageAlt: 'Meta Ads Manager Website Purchase Campaign showing 11 purchases at $0.24 cost per purchase',
    metrics: [
      { label: 'Purchases', value: '11' },
      { label: 'Cost / Purchase', value: '$0.24' },
      { label: 'Reach', value: '10,311' },
    ],
  },
  {
    id: 'meta-ads-thruplays',
    title: 'Video ThruPlays & Brand Awareness',
    client: 'Meta Ads Manager',
    category: 'meta-ads',
    categoryLabel: 'Meta Ads',
    summary:
      'Targeted video ad campaign engineered for high-retention ThruPlays and maximum brand exposure on minimal ad spend.',
    imageSrc: '/assets/aistudio/907994408_122160486987359196_3076188037669130765_n_ff5be82f.jpg',
    imageAlt: 'Meta Ads Manager Awareness Campaign showing 608 ThruPlays and 5,090 impressions for $0.67',
    metrics: [
      { label: 'ThruPlays', value: '608' },
      { label: 'Cost / ThruPlay', value: '$0.0011' },
      { label: 'Impressions', value: '5,090' },
    ],
  },
  {
    id: 'meta-ads-follows',
    title: 'Audience Growth & Engagement Campaign',
    client: 'Meta Ads Manager',
    category: 'meta-ads',
    categoryLabel: 'Meta Ads',
    summary:
      'Scalable page growth campaign generating real followers and engagement at $0.03 per follower.',
    imageSrc: '/assets/aistudio/913163536_122160488715359196_3173926176805806518_n_19d99fb1.jpg',
    imageAlt: 'Meta Ads Manager Engagement Campaign showing 670 follows at $0.0306 cost per follow',
    metrics: [
      { label: 'Follows / Likes', value: '670' },
      { label: 'Cost / Follow', value: '$0.0306' },
      { label: 'Impressions', value: '14,150' },
    ],
  },
];
