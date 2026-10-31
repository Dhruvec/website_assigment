'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, CheckCheck, Sparkles, Send } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { Mascot } from '@/components/ui/Mascot';

const BREED_CHIPS = [
  { name: 'Maltipoo', href: '/puppies?breed=Maltipoo' },
  { name: 'Pomeranian', href: '/puppies?breed=Pomeranian' },
  { name: 'Poodle', href: '/puppies?breed=Poodle' },
  { name: 'Cavapoo', href: '/puppies?breed=Cavapoo' },
  { name: 'Shih Tzu', href: '/puppies?breed=Shih Tzu' },
];

export function ChatSection() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 600);
    const timer2 = setTimeout(() => setStep(2), 2200);
    const timer3 = setTimeout(() => setStep(3), 3800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-bg relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
            <MessageCircle className="w-4 h-4 text-whatsapp" />
            <span className="font-accent text-xl text-whatsapp-dark font-bold">direct concierge</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight mb-3">
            Ask us anything on WhatsApp
          </h2>
          <p className="text-ink/80 text-base sm:text-lg">
            Get instant puppy videos, veterinary documents, and book private showroom viewings with our team.
          </p>
        </div>

        {/* WhatsApp-Style Chat Mockup Box */}
        <div className="max-w-2xl mx-auto rounded-3xl border-2 border-ink bg-[#efeae2] shadow-card overflow-hidden">
          {/* WhatsApp Header */}
          <div className="bg-[#075e54] text-white px-5 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-cream border-2 border-white flex items-center justify-center overflow-hidden">
                  <Mascot pose="idle" animated={false} className="w-9 h-9" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#075e54]" />
              </div>

              <div>
                <div className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                  <span>Petite Paws Concierge</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-white/20 rounded font-medium">Official</span>
                </div>
                <div className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  <span>Online • replies in ~5 mins</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-white/80 font-medium hidden sm:block">
              {SITE_CONFIG.city}, UAE
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="p-4 sm:p-6 space-y-4 min-h-[380px] bg-[#e5ddd5]/60 flex flex-col justify-end">
            {/* Bubble 1 */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={step >= 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl rounded-tl-none p-4 max-w-[85%] sm:max-w-[78%] shadow-sm border border-black/5 self-start text-ink text-sm sm:text-base relative"
            >
              <p className="leading-relaxed mb-1">
                Hello there! 👋 Welcome to {SITE_CONFIG.name}. Are you looking for a healthy, hypoallergenic teacup companion to join your family in {SITE_CONFIG.city}?
              </p>
              <div className="text-[11px] text-ink/50 text-right flex items-center justify-end gap-1">
                <span>10:42 AM</span>
                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </motion.div>

            {/* Bubble 2: Breed Chips */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={step >= 2 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl rounded-tl-none p-4 max-w-[92%] sm:max-w-[85%] shadow-sm border border-black/5 self-start text-ink relative"
            >
              <p className="text-sm sm:text-base leading-relaxed mb-3">
                Which breed steals your heart? Tap any to see who is currently in our nursery:
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                {BREED_CHIPS.map((chip) => (
                  <Link
                    key={chip.name}
                    href={chip.href}
                    className="px-3 py-1 rounded-full bg-cream-100 hover:bg-cream border border-caramel/25 text-xs sm:text-sm font-bold text-caramel transition-colors"
                  >
                    🐾 {chip.name}
                  </Link>
                ))}
              </div>
              <div className="text-[11px] text-ink/50 text-right flex items-center justify-end gap-1">
                <span>10:43 AM</span>
                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </motion.div>

            {/* Bubble 3: Photo Collage */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={step >= 3 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl rounded-tl-none p-3 sm:p-4 max-w-[92%] sm:max-w-[85%] shadow-sm border border-black/5 self-start text-ink relative"
            >
              <p className="text-xs sm:text-sm font-medium mb-3">
                Here are a few of our nursery favorites receiving cuddles right now:
              </p>
              {/* 4 Photo Collage */}
              <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden mb-2">
                <div className="relative aspect-square">
                  <Image src="/media/chat-1.jpg" alt="Maltipoo cuddle" fill className="object-cover" />
                </div>
                <div className="relative aspect-square">
                  <Image src="/media/chat-2.jpg" alt="Pomeranian baby" fill className="object-cover" />
                </div>
                <div className="relative aspect-square">
                  <Image src="/media/chat-3.jpg" alt="Toy Poodle curls" fill className="object-cover" />
                </div>
                <div className="relative aspect-square">
                  <Image src="/media/chat-4.jpg" alt="Cavapoo sweet face" fill className="object-cover" />
                </div>
              </div>
              <div className="text-[11px] text-ink/50 text-right flex items-center justify-end gap-1">
                <span>10:44 AM</span>
                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </motion.div>
          </div>

          {/* Bottom Chat Input Bar / CTA */}
          <div className="p-3 sm:p-4 bg-[#f0f2f5] border-t border-black/10 flex items-center gap-3">
            <a
              href={getWhatsAppLink('Hi Petite Paws! I saw your puppies on the website and would love to chat.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-12 rounded-full bg-whatsapp text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-chunky-whatsapp hover:-translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Say hello on WhatsApp</span>
              <Send className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
