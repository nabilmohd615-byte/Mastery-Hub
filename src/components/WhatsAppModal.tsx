import React, { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, MessageCircle, X } from 'lucide-react';
import { SERVICES_LIST, WHATSAPP_CONTACTS } from '../data/portfolioData';
import { buildWhatsAppUrl } from '../utils/masteryUtils';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  initialService = 'Digital marketing',
}) => {
  const [selectedService, setSelectedService] = useState(initialService);
  const [customNote, setCustomNote] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedService(initialService);
  }, [initialService]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const fullMessage = customNote.trim()
    ? `Hello Mastery Hub! I am interested in ${selectedService}. ${customNote.trim()}`
    : `Hello Mastery Hub! I would like to discuss ${selectedService} for my business.`;

  const handleCopy = async (id: string, rawNumber: string) => {
    try {
      await navigator.clipboard.writeText(rawNumber);
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 2000);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D020D]/55 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white/90 backdrop-blur-2xl border border-[#800020]/15 shadow-[0_24px_64px_-12px_rgba(74,4,22,0.38)] p-6 sm:p-8 text-[#1A080D]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#800020]">
              Direct WhatsApp Connect
            </p>
            <h2
              id="whatsapp-modal-title"
              className="mt-1 font-display text-2xl font-bold tracking-tight text-[#1A080D]"
            >
              Message Mastery Hub
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close WhatsApp contact dialog"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#800020]/15 bg-white/80 text-[#4A0416] hover:bg-[#800020] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="wa-service-select"
              className="block text-xs font-semibold text-[#4A0416]/80 mb-1.5"
            >
              Select Service
            </label>
            <select
              id="wa-service-select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full rounded-xl border border-[#800020]/20 bg-white px-3.5 py-2.5 text-sm font-medium text-[#1A080D] focus:border-[#800020] focus:outline-none focus:ring-2 focus:ring-[#800020]/20"
            >
              {SERVICES_LIST.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="wa-custom-note"
              className="block text-xs font-semibold text-[#4A0416]/80 mb-1.5"
            >
              Project Note (Optional)
            </label>
            <input
              id="wa-custom-note"
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g., Need Facebook Ads & AI website for my brand"
              className="w-full rounded-xl border border-[#800020]/20 bg-white px-3.5 py-2.5 text-sm text-[#1A080D] placeholder:text-[#4A0416]/40 focus:border-[#800020] focus:outline-none focus:ring-2 focus:ring-[#800020]/20"
            />
          </div>

          <div className="space-y-3 pt-1">
            {WHATSAPP_CONTACTS.map((contact) => {
              const href = buildWhatsAppUrl(contact.rawNumber, fullMessage);
              const isCopied = copiedId === contact.id;

              return (
                <div
                  key={contact.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#800020]/15 bg-[#FFF5F7]/70 p-4"
                >
                  <div>
                    <p className="text-xs font-medium text-[#800020]">
                      WhatsApp · {contact.region}
                    </p>
                    <p className="mt-0.5 font-display text-base font-bold tabular-nums text-[#1A080D]">
                      {contact.rawNumber}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(contact.id, contact.rawNumber)}
                      aria-label={`Copy ${contact.region} WhatsApp number`}
                      className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[#800020]/20 bg-white px-3 text-xs font-semibold text-[#4A0416] hover:bg-[#FCE7EC] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#800020]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#800020] px-4 text-xs font-semibold text-white hover:bg-[#6B0F24] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Chat Now</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
