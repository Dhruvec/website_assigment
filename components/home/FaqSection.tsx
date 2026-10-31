'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/faq';
import { Accordion } from '@/components/ui/Accordion';
import { PawIcon } from '@/components/ui/PawIcon';

export function FaqSection() {
  // First 3 items for home
  const homeFaqs = FAQ_ITEMS.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-[#fde8c4]/30 border-y border-caramel/15 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
            <HelpCircle className="w-4 h-4 text-caramel" />
            <span className="font-accent text-xl text-caramel font-bold">got questions?</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight mb-4">
            Frequently asked questions
          </h2>
          <p className="text-ink/80 text-base sm:text-lg">
            Everything you need to know about our health guarantees, adoption procedures, and boutique visits.
          </p>
        </div>

        {/* 3 Accordion items on home */}
        <Accordion items={homeFaqs} />

        {/* Link to /faq */}
        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 font-bold text-base text-caramel hover:text-caramel-dark transition-colors underline decoration-caramel/30 underline-offset-4"
          >
            <span>Read all {FAQ_ITEMS.length} questions & answers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

