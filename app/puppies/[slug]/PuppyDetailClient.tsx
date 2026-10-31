'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, X, Volume2, Shield } from 'lucide-react';
import { Puppy } from '@/data/puppies';

export function PuppyDetailClient({ puppy }: { puppy: Puppy }) {
  const images = puppy.additionalImages.length > 0 ? puppy.additionalImages : [puppy.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Selected Image */}
      <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl border-2 border-ink overflow-hidden bg-cream-100 shadow-card">
        <Image
          src={images[activeImageIndex] || puppy.image}
          alt={`${puppy.name} photo ${activeImageIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-all duration-300"
        />

        {/* Nursery 4K Video Button Overlay */}
        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="absolute bottom-4 left-4 bg-ink/80 hover:bg-ink backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
        >
          <div className="w-5 h-5 rounded-full bg-caramel flex items-center justify-center">
            <Play className="w-3 h-3 fill-white ml-0.5" />
          </div>
          <span>Watch 4K Nursery Video</span>
        </button>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-ink shadow-sm border border-ink/10">
          Photo {activeImageIndex + 1} of {images.length}
        </div>
      </div>

      {/* Thumbnails Strip */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className={`relative w-20 h-20 rounded-2xl border-2 overflow-hidden flex-shrink-0 transition-all ${
              activeImageIndex === idx
                ? 'border-caramel ring-2 ring-caramel/40 scale-105'
                : 'border-ink/20 opacity-70 hover:opacity-100'
            }`}
          >
            <Image src={img} alt={`${puppy.name} thumb ${idx}`} fill className="object-cover" />
          </button>
        ))}

        {/* Nursery Video Thumbnail button */}
        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="relative w-20 h-20 rounded-2xl border-2 border-dashed border-caramel bg-cream flex flex-col items-center justify-center text-caramel flex-shrink-0 hover:bg-cream-200 transition-colors"
        >
          <Play className="w-6 h-6 fill-caramel" />
          <span className="text-[10px] font-bold mt-1">4K Video</span>
        </button>
      </div>

      {/* Video Modal Simulation */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl border-2 border-caramel bg-ink overflow-hidden shadow-2xl text-white"
            >
              {/* Modal Top Bar */}
              <div className="p-4 bg-black/40 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-display font-bold text-sm">
                    {puppy.name} — Nursery Play Session (4K HDR)
                  </span>
                </div>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Video Player Display */}
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src={puppy.image}
                  alt={`${puppy.name} video frame`}
                  fill
                  className="object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-6">
                  <div className="self-end px-3 py-1 rounded bg-black/60 text-xs font-mono">
                    HD 60FPS
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-caramel/90 border-2 border-white flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Play className="w-8 h-8 fill-white text-white ml-1" />
                    </div>
                    <p className="font-display font-bold text-lg text-white">
                      Recorded today in our sanitized Dubai Nursery
                    </p>
                    <p className="text-xs text-white/80">
                      Want an uncut private WhatsApp video call with {puppy.name}? Message our concierge!
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-white/70">
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      <span>Gentle nursery playtime</span>
                    </div>
                    <span>0:45 / 1:30</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

