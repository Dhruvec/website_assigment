'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Sparkles } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { Button } from '@/components/ui/Button';
import { Mascot } from '@/components/ui/Mascot';

export function FinalCtaSection() {
  return (
    <section className="py-20 sm:py-28 bg-bg relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border-2 border-ink bg-cream p-8 sm:p-14 text-center shadow-card overflow-hidden">
          {/* Background whimsical decor */}
          <div className="absolute top-4 left-6 text-caramel/20 text-3xl font-accent -rotate-12 pointer-events-none select-none">
            🐾 sweet paws
          </div>
          <div className="absolute bottom-4 right-8 text-caramel/20 text-3xl font-accent rotate-6 pointer-events-none select-none">
            pure joy ✨
          </div>

          {/* Arched Doorway with Puppy Peeking Out & "welcome home" label */}
          <div className="relative inline-block mx-auto mb-8">
            <div className="w-36 h-44 sm:w-44 sm:h-52 rounded-t-full rounded-b-xl border-2 border-ink bg-cream-100 overflow-hidden shadow-md relative">
              <Image
                src="/media/welcome-pup.jpg"
                alt="Fluffy puppy peeking from doorway"
                fill
                className="object-cover"
              />
              {/* Mascot Peeking Over Top */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                <Mascot pose="peek" className="w-20 h-16" />
              </div>
            </div>

            {/* Handwritten "welcome home" label sticker */}
            <motion.div
              initial={{ rotate: -8, scale: 0.9 }}
              animate={{ rotate: [-8, -4, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-3 -right-6 bg-white px-3.5 py-1 rounded-full border-2 border-caramel shadow-sm z-20"
            >
              <span className="font-accent text-xl text-caramel-dark font-black tracking-wide">
                welcome home ✨
              </span>
            </motion.div>
          </div>

          {/* Heading */}
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight mb-4 max-w-2xl mx-auto">
            Ready to meet your new best friend?
          </h2>

          {/* Paragraph */}
          <p className="text-ink/80 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Your dream teacup companion is waiting to shower your home with warmth and smiles.
            Visit our boutique showroom in {SITE_CONFIG.city} or start a personal chat with our concierge.
          </p>

          {/* Two Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/puppies"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-chunky-caramel"
            >
              View available puppies
            </Button>

            <Button
              href={getWhatsAppLink('Hi Petite Paws! I am ready to adopt and would love to speak to your concierge.')}
              isExternal
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="w-5 h-5 fill-white/20" />}
              className="w-full sm:w-auto"
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

