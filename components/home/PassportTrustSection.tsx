'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Plane, HeartHandshake, Award, CheckCircle } from 'lucide-react';
import { PawIcon } from '@/components/ui/PawIcon';

const PASSPORT_STAMPS = [
  {
    icon: ShieldCheck,
    title: 'Vet-checked & healthy',
    badge: '1-Year Warranty',
    description:
      'Rigorous multi-stage veterinary inspections, ISO microchips, complete age-appropriate vaccine series, and 1-Year Genetic Health Warranty.',
    stampNumber: 'VET-CERT 01',
    accentColor: '#1f7a4d',
  },
  {
    icon: Plane,
    title: 'Imported safely',
    badge: 'VIP Cabin Handover',
    description:
      'Hand-carried by dedicated puppy flight nannies in passenger cabins. Flown in temperature control with official UAE MOCCAE ministry clearances.',
    stampNumber: 'TRANSIT 02',
    accentColor: '#a14a1c',
  },
  {
    icon: HeartHandshake,
    title: 'Support 24/7',
    badge: 'Lifetime Hotline',
    description:
      'Direct WhatsApp access to our pet care specialists anytime. We help with feeding schedules, toilet training, grooming and veterinary queries.',
    stampNumber: 'CARE-LINE 03',
    accentColor: '#6f2f10',
  },
  {
    icon: Award,
    title: 'Trusted by families',
    badge: '500+ Happy Homes',
    description:
      'Celebrated across Dubai, Abu Dhabi, and the GCC. Certified 5-star customer ratings, ethical preservation breeding, and total transparency.',
    stampNumber: 'DUBAI-EST 04',
    accentColor: '#934e26',
  },
];

export function PassportTrustSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#fde8c4]/30 border-y border-caramel/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
            <PawIcon className="w-4 h-4 fill-caramel" />
            <span className="font-accent text-xl text-caramel font-bold">our sacred promise</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight mb-4">
            The puppy passport standards
          </h2>
          <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
            Every puppy is a precious family member. We hold our breeding, welfare, transport, and
            aftercare to the world’s most stringent ethical benchmarks.
          </p>
        </div>

        {/* 4 Stamp-style Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {PASSPORT_STAMPS.map((stamp, index) => {
            const IconComponent = stamp.icon;

            return (
              <motion.div
                key={stamp.title}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, rotate: index % 2 === 0 ? 1 : -1 }}
                className="relative rounded-2xl border-2 border-dashed border-caramel/40 bg-white p-6 sm:p-7 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
              >
                {/* Vintage Passport Stamp Watermark in top right */}
                <div className="absolute top-4 right-4 text-[11px] font-mono font-bold tracking-widest text-caramel/30 uppercase border border-caramel/25 px-2 py-0.5 rounded rotate-6">
                  {stamp.stampNumber}
                </div>

                <div>
                  {/* Circular Stamp Icon Badge */}
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-caramel bg-cream-100 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7 text-caramel" />
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-cream text-caramel-dark font-bold text-xs mb-2">
                    {stamp.badge}
                  </span>

                  <h3 className="font-display font-bold text-xl text-ink mb-3">
                    {stamp.title}
                  </h3>

                  <p className="text-ink/80 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {stamp.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-ink/10 flex items-center gap-1.5 text-xs font-semibold text-whatsapp">
                  <CheckCircle className="w-4 h-4 text-whatsapp shrink-0" />
                  <span>Guaranteed Standards</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
