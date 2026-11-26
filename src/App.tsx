import React, { useMemo, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { PortraitSpotlight } from './components/PortraitSpotlight';
import { PortfolioLightbox } from './components/PortfolioLightbox';
import { PortfolioSpotlightCard } from './components/PortfolioSpotlightCard';
import { WhatsAppModal } from './components/WhatsAppModal';
import {
  PORTFOLIO_ITEMS,
  SERVICES_LIST,
  WHATSAPP_CONTACTS,
} from './data/portfolioData';
import {
  buildWhatsAppUrl,
  filterPortfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from './utils/masteryUtils';

const FILTER_OPTIONS: { id: PortfolioCategory; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'meta-ads', label: 'Meta Ads' },
  { id: 'branding', label: 'Page & Brand Setup' },
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [modalService, setModalService] = useState<string>('Digital marketing');
  const [contactService, setContactService] = useState<string>('Facebook Ads');
  const [contactNote, setContactNote] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visiblePortfolio = useMemo(
    () => filterPortfolioItems(PORTFOLIO_ITEMS, activeFilter),
    [activeFilter]
  );

  const openWhatsAppFor = (serviceName: string) => {
    setModalService(serviceName);
    setIsWhatsAppOpen(true);
  };

  const handleCopyNumber = async (id: string, rawNumber: string) => {
    try {
      await navigator.clipboard.writeText(rawNumber);
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const directMessage = contactNote.trim()
    ? `Hello Mastery Hub! I need help with ${contactService}. ${contactNote.trim()}`
    : `Hello Mastery Hub! I want to grow my business with ${contactService}.`;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#FDFBFB] text-[#1A080D]">
      {/* Subtle maroon ambient gradient blobs behind glass surfaces */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="animate-float-slow absolute -top-40 -right-32 h-[540px] w-[540px] rounded-full blur-3xl opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgba(128, 0, 32, 0.28) 0%, rgba(190, 18, 60, 0.08) 60%, transparent 100%)',
          }}
        />
        <div
          className="animate-float-slow absolute top-[45%] -left-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-25"
          style={{
            animationDelay: '2.5s',
            background:
              'radial-gradient(circle, rgba(159, 18, 57, 0.22) 0%, rgba(128, 0, 32, 0.06) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* Top Navigation Bar: Clean 3-zone contract with Mastery Hub & WhatsApp button */}
      <header className="sticky top-0 z-40 border-b border-[#800020]/10 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="font-display text-xl font-bold tracking-tight text-[#800020] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-lg"
          >
            Mastery hub
          </a>

          {/* Zone 2: Minimal Single-line Anchor Links */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A0416]/80"
          >
            <a
              href="#services"
              className="hover:text-[#800020] transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="hover:text-[#800020] transition-colors whitespace-nowrap shrink-0"
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="hover:text-[#800020] transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Single Primary WhatsApp Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => openWhatsAppFor('Digital marketing')}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#800020] px-4 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#6B0F24] transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Contact</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Split Section */}
        <section
          id="services"
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Side: Exact User Script & Core Services */}
            <div className="lg:col-span-7 space-y-6 animate-fade-up">
              <div className="space-y-3">
                <p className="text-sm font-semibold tracking-wide text-[#800020]">
                  Welcome To Mastery hub Platform
                </p>

                <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-[#1A080D] text-balance">
                  Ai expert and <span className="text-[#800020]">Digital Marketer</span>
                </h1>

                <p className="text-base sm:text-lg font-semibold text-[#4A0416]">
                  🚀 Your One-Stop Digital Growth Partner
                </p>
              </div>

              {/* Frosted Glass Services Card */}
              <div className="glass-surface rounded-3xl p-5 sm:p-6">
                <p className="text-sm font-semibold text-[#4A0416] mb-3.5">
                  We help businesses grow online with:
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-stretch">
                  {SERVICES_LIST.map((service) => (
                    <li key={service} className="h-full">
                      <button
                        type="button"
                        onClick={() => openWhatsAppFor(service)}
                        className="group h-full w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-[#1A080D] bg-white/75 border border-[#800020]/10 hover:border-[#800020]/40 hover:bg-[#FFF5F7] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#800020] group-hover:scale-110 transition-transform" />
                        <span className="leading-snug">{service}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-[#800020]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-[#4A0416]">
                    📩 Message us today and let&apos;s build your success!
                  </p>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => openWhatsAppFor('Digital marketing')}
                      className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#800020] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(128,0,32,0.55)] hover:bg-[#6B0F24] transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Message on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Glowing Portrait */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end animate-scale-in">
              <PortraitSpotlight />
            </div>
          </div>
        </section>

        {/* Portfolio Proof Section */}
        <section
          id="portfolio"
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-18 border-t border-[#800020]/10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#800020]">
                Verified Client Results
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1A080D]">
                Selected Portfolio &amp; Campaign Proof
              </h2>
            </div>

            {/* Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter portfolio works"
              className="inline-flex items-center gap-1 rounded-xl bg-[#800020]/[0.06] p-1 border border-[#800020]/10 self-start md:self-auto"
            >
              {FILTER_OPTIONS.map((option) => {
                const isSelected = activeFilter === option.id;
                return (
                  <button
                    key={option.id}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    onClick={() => setActiveFilter(option.id)}
                    className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] ${
                      isSelected
                        ? 'bg-[#800020] text-white shadow-sm'
                        : 'text-[#4A0416]/75 hover:text-[#800020]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            data-testid="portfolio-grid"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {visiblePortfolio.map((item) => (
              <PortfolioSpotlightCard
                key={item.id}
                item={item}
                onSelect={setSelectedItem}
              />
            ))}
          </div>
        </section>

        {/* Maroon & White Glass WhatsApp Contact Band */}
        <section
          id="contact"
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 pt-4"
        >
          <div className="glass-maroon relative overflow-hidden rounded-[2rem] p-6 sm:p-10 text-white">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <p className="text-xs font-semibold tracking-wide text-white/80">
                  Start Your Growth Project
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-balance">
                  Message us today and let&apos;s build your success
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-lg">
                  Choose a service below and connect directly via WhatsApp on either our
                  Bangladesh or Saudi Arabia line.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label
                      htmlFor="contact-service-select"
                      className="block text-xs font-medium text-white/75 mb-1.5"
                    >
                      Service Needed
                    </label>
                    <select
                      id="contact-service-select"
                      value={contactService}
                      onChange={(e) => setContactService(e.target.value)}
                      className="w-full rounded-xl border border-white/25 bg-white/15 pl-3.5 pr-8 py-2.5 text-sm font-medium text-white backdrop-blur-md focus:border-white focus:outline-none"
                    >
                      {SERVICES_LIST.map((service) => (
                        <option key={service} value={service} className="text-[#1A080D]">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-note-input"
                      className="block text-xs font-medium text-white/75 mb-1.5"
                    >
                      Quick Note
                    </label>
                    <input
                      id="contact-note-input"
                      type="text"
                      value={contactNote}
                      onChange={(e) => setContactNote(e.target.value)}
                      placeholder="Your business or goal"
                      className="w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/50 backdrop-blur-md focus:border-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHATSAPP_CONTACTS.map((contact) => {
                  const waHref = buildWhatsAppUrl(contact.rawNumber, directMessage);
                  const isCopied = copiedId === contact.id;

                  return (
                    <div
                      key={contact.id}
                      className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 flex flex-col justify-between gap-4"
                    >
                      <div>
                        <p className="text-xs font-medium text-white/75">
                          WhatsApp · {contact.region}
                        </p>
                        <p className="mt-1 font-display text-lg font-bold tabular-nums text-white">
                          {contact.rawNumber}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={waHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-white px-3.5 text-xs font-bold text-[#800020] hover:bg-[#FFF5F7] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Chat WhatsApp</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopyNumber(contact.id, contact.rawNumber)}
                          aria-label={`Copy ${contact.rawNumber}`}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white hover:bg-white/20 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          {isCopied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Minimal Footer */}
      <footer className="border-t border-[#800020]/10 bg-white/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-6 text-xs text-[#4A0416]/75">
          <p className="font-medium">
            © {new Date().getFullYear()} Mastery hub · AI Expert &amp; Digital Marketer
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="mailto:mnnabil170@gmail.com"
              className="inline-flex items-center gap-1.5 hover:text-[#800020] transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>mnnabil170@gmail.com</span>
            </a>
            <a
              href={buildWhatsAppUrl('+8801328750810')}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#800020] transition-colors tabular-nums"
            >
              +8801328750810
            </a>
            <a
              href={buildWhatsAppUrl('+966509850428')}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#800020] transition-colors tabular-nums"
            >
              +966509850428
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        initialService={modalService}
      />

      <PortfolioLightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onInquire={(service) => openWhatsAppFor(service)}
      />
    </div>
  );
}
