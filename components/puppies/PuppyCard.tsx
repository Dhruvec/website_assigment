'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Plane, CheckCircle2, Heart } from 'lucide-react';
import { Puppy } from '@/data/puppies';
import { getWhatsAppLink } from '@/lib/site-config';

interface PuppyCardProps {
  puppy: Puppy;
  isGoneHome?: boolean;
  priority?: boolean;
}

export function PuppyCard({ puppy, isGoneHome = false, priority = false }: PuppyCardProps) {
  const isAvailable = puppy.status === 'available' && !isGoneHome;
  const isReserved = puppy.status === 'reserved' && !isGoneHome;
  const isAdopted = puppy.status === 'gone_home' || isGoneHome;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`rounded-3xl border-2 border-ink overflow-hidden flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all bg-white relative group ${
        isAdopted ? 'opacity-90 bg-cream-50/60' : ''
      }`}
    >
      {/* Corner Ribbon for Gone Home */}
      {isAdopted && (
        <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 pointer-events-none z-20">
          <div className="absolute transform rotate-45 bg-caramel text-white font-black text-[11px] py-1 right-[-35px] top-[24px] w-[140px] text-center shadow-md uppercase tracking-wider">
            Gone Home 🐾
          </div>
        </div>
      )}

      <div>
        {/* Photo Frame */}
        <div className="relative w-full h-72 sm:h-80 bg-cream-100 overflow-hidden">
          <Image
            src={puppy.image}
            alt={`${puppy.name} - ${puppy.breed}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
              isAdopted ? 'filter saturate-[0.85]' : ''
            }`}
          />

          {/* Top Left Status & Origin Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm border ${
                isAvailable
                  ? 'bg-emerald-500/95 text-white border-emerald-600'
                  : isReserved
                  ? 'bg-purple-600/95 text-white border-purple-700'
                  : 'bg-stone-700/90 text-white border-stone-800'
              }`}
            >
              {isAvailable ? '● Available' : isReserved ? '● Reserved' : '● In Forever Home'}
            </span>

            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 text-ink backdrop-blur-sm flex items-center gap-1 shadow-sm border border-ink/10">
              {puppy.origin === 'local' ? (
                <>
                  <MapPin className="w-3 h-3 text-caramel" />
                  <span>Dubai Showroom</span>
                </>
              ) : (
                <>
                  <Plane className="w-3 h-3 text-caramel" />
                  <span>Imported Korea/EU</span>
                </>
              )}
            </span>
          </div>

          {/* Bottom Right Price Pill */}
          {!isAdopted && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-black text-caramel shadow-sm border border-caramel/20">
              {puppy.price}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="font-display font-black text-2xl text-ink group-hover:text-caramel transition-colors">
              {puppy.name}
            </h3>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                puppy.sex === 'Boy'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {puppy.sex === 'Boy' ? 'Boy ♂' : 'Girl ♀'}
            </span>
          </div>

          <div className="text-xs sm:text-sm font-semibold text-caramel mb-2">
            {puppy.breed} • <span className="text-ink-muted">{puppy.age}</span>
          </div>

          <p className="text-xs sm:text-sm text-ink/75 line-clamp-2 leading-relaxed mb-4">
            {puppy.description}
          </p>

          {/* Key Traits Chips */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-cream text-ink">
              ⚖️ {puppy.weight}
            </span>
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-cream text-ink">
              ✨ {puppy.tag}
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer CTAs */}
      <div className="p-5 sm:p-6 pt-0 border-t border-ink/5 mt-auto flex items-center gap-2">
        <Link
          href={`/puppies/${puppy.slug}`}
          className="flex-1 h-12 rounded-full border-2 border-ink text-ink font-bold text-sm flex items-center justify-center gap-1.5 hover:bg-cream-100 active:translate-y-0.5 transition-all"
        >
          <span>View Profile</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {isAvailable && (
          <a
            href={getWhatsAppLink(`Hi! I am enquiring about ${puppy.name} the ${puppy.breed} (${puppy.price}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-4 rounded-full bg-whatsapp text-white font-bold text-sm flex items-center justify-center shadow-chunky-whatsapp hover:-translate-y-0.5 transition-all"
            aria-label={`Enquire on WhatsApp about ${puppy.name}`}
          >
            <span>Enquire</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
