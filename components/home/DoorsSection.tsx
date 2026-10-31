'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { PUPPIES, Puppy } from '@/data/puppies';
import { Mascot } from '@/components/ui/Mascot';
import { PawIcon } from '@/components/ui/PawIcon';
import { Button } from '@/components/ui/Button';

export function DoorsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [hoveredDoor, setHoveredDoor] = useState<string | null>(null);
  const [clickedDoors, setClickedDoors] = useState<Record<string, boolean>>({});

  // Scroll tracking for mascot walking and door progressive reveals
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Mascot walks across the floor as user scrolls
  const mascotX = useTransform(scrollYProgress, [0.15, 0.85], ['5%', '85%']);

  const toggleDoor = (id: string) => {
    setClickedDoors((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-24 bg-[#fde8c4]/40 border-b border-caramel/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center sm:text-left sm:flex sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3">
            <PawIcon className="w-4 h-4 fill-caramel" />
            <span className="font-accent text-xl text-caramel font-bold">peek inside nursery</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight mb-3">
            Meet the pups
          </h2>
          <p className="text-ink/80 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
            Every puppy has their own nursery suite. Tap or hover any door to open it and meet our
            pampered teacup companions.
          </p>
        </div>

        <div className="mt-6 sm:mt-0 shrink-0">
          <Button href="/puppies" variant="secondary" size="md">
            <span>See all available puppies</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* Horizontal Strip of Arched Wooden Doors */}
      <div className="relative w-full">
        <div
          ref={scrollTrackRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-8 pb-10 pt-4 scrollbar-none snap-x snap-mandatory focus:outline-none"
          style={{ WebkitOverflowScrolling: 'touch' }}
          tabIndex={0}
          aria-label="Interactive puppy nursery doors"
        >
          {PUPPIES.map((puppy, index) => {
            const isHovered = hoveredDoor === puppy.id;
            const isClicked = !!clickedDoors[puppy.id];
            const isOpen = isHovered || isClicked;

            return (
              <div
                key={puppy.id}
                className="flex-shrink-0 w-[240px] sm:w-[270px] snap-center select-none"
              >
                {/* Header Tag Info Above Door */}
                <div className="text-center mb-3">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className="font-display font-extrabold text-xl text-ink">
                      {puppy.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        puppy.sex === 'Boy'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {puppy.sex === 'Boy' ? 'Boy ♂' : 'Girl ♀'}
                    </span>
                  </div>
                  <div className="text-xs text-ink/70 font-medium">
                    {puppy.breed} • {puppy.age}
                  </div>
                </div>

                {/* Arched Door Frame Container */}
                <div
                  className="relative h-[340px] sm:h-[370px] rounded-t-[130px] rounded-b-xl border-2 border-ink overflow-hidden bg-cream-100 shadow-card cursor-pointer group"
                  style={{ perspective: 1000 }}
                  onMouseEnter={() => setHoveredDoor(puppy.id)}
                  onMouseLeave={() => setHoveredDoor(null)}
                  onClick={() => toggleDoor(puppy.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleDoor(puppy.id);
                    }
                  }}
                  aria-expanded={isOpen}
                  aria-label={`Door for ${puppy.name}, click to open and see photo`}
                >
                  {/* Inside Room (Puppy Photo Revealed Behind Door) */}
                  <div className="absolute inset-0 z-0 bg-[#faecd4] flex flex-col">
                    <div className="relative w-full h-[260px] sm:h-[280px]">
                      <Image
                        src={puppy.image}
                        alt={`${puppy.name} the ${puppy.breed}`}
                        fill
                        sizes="270px"
                        className="object-cover"
                      />
                      {/* Price / Status Overlay Pill */}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-caramel shadow-sm border border-caramel/20">
                        {puppy.price}
                      </div>
                    </div>

                    <div className="p-3 bg-white flex items-center justify-between mt-auto border-t border-ink/10">
                      <div>
                        <div className="text-xs font-bold text-ink">{puppy.tag}</div>
                        <div className="text-[11px] text-ink-muted">{puppy.weight}</div>
                      </div>
                      <Link
                        href={`/puppies/${puppy.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-caramel text-white hover:bg-caramel-hover transition-colors shadow-sm"
                        aria-label={`View details for ${puppy.name}`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Arched Wooden Door Panel (Rotates Open from Hinge on Left) */}
                  <motion.div
                    animate={{
                      rotateY: isOpen ? -108 : 0,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 240,
                      damping: 22,
                    }}
                    style={{
                      transformOrigin: 'left center',
                      transformStyle: 'preserve-3d',
                      backgroundColor: puppy.doorColor,
                    }}
                    className="absolute inset-0 z-10 rounded-t-[130px] rounded-b-xl border-r-2 border-b-2 border-black/30 shadow-md p-3 flex flex-col items-center justify-between"
                  >
                    {/* Wood Texture Planks & Arched Recessed Paneling */}
                    <div className="w-full h-full rounded-t-[115px] rounded-b-lg border-2 border-black/25 p-2 flex flex-col items-center justify-between bg-black/10">
                      {/* Top Door Window / Arch Accent */}
                      <div className="w-20 h-10 rounded-t-full border-2 border-black/20 bg-black/15 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-amber-200/60" />
                      </div>

                      {/* Rotated "Available" / Status Sticker */}
                      <div
                        className={`px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider transform -rotate-12 shadow-sm border ${
                          puppy.status === 'available'
                            ? 'bg-amber-100 text-caramel-dark border-caramel/40'
                            : puppy.status === 'reserved'
                            ? 'bg-purple-100 text-purple-900 border-purple-400'
                            : 'bg-stone-200 text-stone-700 border-stone-400'
                        }`}
                      >
                        {puppy.status === 'available'
                          ? 'Available'
                          : puppy.status === 'reserved'
                          ? 'Reserved'
                          : 'Gone Home'}
                      </div>

                      {/* Paw Door Knocker (Center) */}
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border-2 border-black/40 shadow-md flex items-center justify-center">
                          <PawIcon className="w-5 h-5 fill-ink" />
                        </div>
                        <div className="w-2 h-3 bg-amber-500 rounded-b border-x border-b border-black/30" />
                      </div>

                      {/* Brass Door Knob (Right edge) */}
                      <div className="w-full flex justify-end pr-2 pb-6">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 border-2 border-black/40 shadow-inner" />
                      </div>

                      {/* Interactive Hint */}
                      <div className="text-[10px] uppercase font-bold text-amber-100/80 tracking-widest pb-1">
                        {isOpen ? 'Door open' : 'Tap to open'}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}

          {/* Last Card: "Meet them all" */}
          <div className="flex-shrink-0 w-[240px] sm:w-[270px] snap-center">
            <div className="text-center mb-3">
              <span className="font-display font-extrabold text-xl text-ink">
                All 15+ Puppies
              </span>
              <div className="text-xs text-ink/70 font-medium">Boutique Collection</div>
            </div>

            <Link
              href="/puppies"
              className="h-[340px] sm:h-[370px] rounded-t-[130px] rounded-b-xl border-2 border-dashed border-caramel bg-white/80 p-6 flex flex-col items-center justify-center text-center shadow-card hover:bg-white hover:border-solid hover:shadow-card-hover transition-all group block"
            >
              <div className="w-16 h-16 rounded-full bg-cream border-2 border-caramel flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 fill-caramel text-caramel" />
              </div>
              <h3 className="font-display font-bold text-2xl text-ink mb-2">
                Meet them all
              </h3>
              <p className="text-xs text-ink/70 leading-relaxed mb-6">
                Explore our complete gallery of toy poodles, maltipoos, pomeranians and cavapoos.
              </p>
              <span className="px-5 py-2.5 rounded-full bg-caramel text-white text-sm font-bold shadow-chunky-caramel group-hover:-translate-y-0.5 transition-transform flex items-center gap-1.5">
                <span>View all puppies</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>

        {/* Wooden Floor running beneath the doors */}
        <div className="relative w-full h-14 bg-gradient-to-b from-[#8a4a24] to-[#5a2a12] border-t-4 border-[#3f1908] shadow-inner overflow-hidden">
          {/* Floor Planks Texture Lines */}
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,#000_0,#000_2px,transparent_0,transparent_120px)]" />
          <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(0deg,#fff_0,#fff_1px,transparent_0,transparent_14px)]" />

          {/* Mascot Walking Along the Floor driven by scroll progress */}
          <motion.div
            style={{ left: mascotX }}
            className="absolute -top-7 z-20 pointer-events-none hidden sm:block"
          >
            <Mascot pose="walk" className="w-16 h-16 drop-shadow-md" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

