import React from 'react';
import type { Metadata } from 'next';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS, getFAQSchemaJsonLd } from '@/data/faq';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { PawIcon } from '@/components/ui/PawIcon';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers to all questions regarding health guarantees, teacup puppy breeds, showroom visits in Dubai, and UAE delivery.',
};

export default function FAQPage() {
  const schemaJsonLd = getFAQSchemaJsonLd();

  return (
    <>
      {/* JSON-LD FAQPage Schema for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <div className="py-12 sm:py-20 bg-bg min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
              <PawIcon className="w-4 h-4 fill-caramel" />
              <span className="font-accent text-xl text-caramel font-bold">knowledge base</span>
            </div>
            <h1 className="font-display font-black text-4xl sm:text-6xl text-ink tracking-tight mb-4">
              Frequently asked questions
            </h1>
            <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
              Clear, transparent answers on puppy health, pedigree screening, boutique visits, and our
              exclusive door-to-door delivery across Dubai and the UAE.
            </p>
          </div>

          {/* Full Accordion of All 9+ Questions */}
          <div className="mb-16">
            <Accordion items={FAQ_ITEMS} allowMultiple={true} />
          </div>

          {/* Still Have Questions Banner */}
          <div className="rounded-3xl border-2 border-ink bg-cream p-8 sm:p-10 text-center shadow-card">
            <div className="w-12 h-12 rounded-full bg-white border border-caramel/20 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-caramel" />
            </div>
            <h2 className="font-display font-bold text-2xl text-ink mb-2">
              Have a specific question not listed here?
            </h2>
            <p className="text-sm text-ink/80 leading-relaxed mb-6 max-w-lg mx-auto">
              Our puppy concierge is online daily from 10:00 AM to 9:00 PM to help you with detailed
              medical questions, parent lineage, or nursery viewings.
            </p>
            <Button
              href={getWhatsAppLink('Hi Petite Paws! I have a question that was not listed on your FAQ page.')}
              isExternal
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="w-5 h-5 fill-white/20" />}
            >
              Ask on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
