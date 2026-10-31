'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Dog, Camera, ShieldCheck } from 'lucide-react';
import { JOURNEY_STEPS } from '@/data/steps';
import { PawIcon } from '@/components/ui/PawIcon';

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="py-20 sm:py-28 bg-[#fde8c4]/30 border-y border-caramel/15 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
            <PawIcon className="w-4 h-4 fill-caramel" />
            <span className="font-accent text-xl text-caramel font-bold">simple & transparent</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight mb-4">
            Your puppy journey
          </h2>
          <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
            From your very first conversation to your puppy bouncing through your front door, our
            care-first boutique process ensures joyful peace of mind.
          </p>
        </div>

        {/* Steps Grid with Connecting Scroll-drawn SVG Path */}
        <div className="relative">
          {/* Desktop Connecting SVG Path line */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-12 pointer-events-none z-0">
            <svg
              viewBox="0 0 1000 60"
              fill="none"
              className="w-full h-full text-caramel/30"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background dashed guideline */}
              <path
                d="M 50 30 Q 250 -10, 500 30 T 950 30"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="6 6"
              />
              {/* Active scroll drawing stroke */}
              <motion.path
                d="M 50 30 Q 250 -10, 500 30 T 950 30"
                stroke="#a14a1c"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {JOURNEY_STEPS.map((step, idx) => {
              const iconMap = [
                <Dog key="1" className="w-6 h-6 text-caramel" />,
                <Camera key="2" className="w-6 h-6 text-caramel" />,
                <ShieldCheck key="3" className="w-6 h-6 text-caramel" />,
              ];

              return (
                <motion.div
                  key={step.step}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="rounded-3xl border-2 border-ink bg-white p-7 sm:p-8 flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all relative group"
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="w-14 h-14 rounded-2xl bg-cream border-2 border-ink flex items-center justify-center font-display font-black text-2xl text-caramel-dark shadow-sm"
                    >
                      0{step.step}
                    </motion.div>

                    <div className="w-11 h-11 rounded-full bg-cream-100 border border-caramel/20 flex items-center justify-center shadow-inner">
                      {iconMap[idx]}
                    </div>
                  </div>

                  <div>
                    <span className="font-accent text-xl text-caramel font-bold block mb-1">
                      {step.tagline}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-ink mb-3">
                      {step.title}
                    </h3>
                    <p className="text-ink/80 text-sm leading-relaxed mb-6 font-normal">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Highlight pill */}
                  <div className="pt-4 border-t border-ink/10 flex items-center gap-2 text-xs font-semibold text-caramel-dark">
                    <Sparkles className="w-3.5 h-3.5 text-caramel shrink-0" />
                    <span>{step.highlight}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Link to Full Process */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-base font-bold text-caramel hover:text-caramel-dark transition-colors group underline decoration-caramel/30 underline-offset-4"
          >
            <span>Learn more about our comprehensive delivery & warranty process</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
