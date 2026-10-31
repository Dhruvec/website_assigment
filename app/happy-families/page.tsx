import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Star, Heart, MessageCircle, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonials';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Happy Families — Photo Wall & Reviews',
  description:
    'Read real verified reviews and view our alumni photo wall from puppy parents in Dubai, Abu Dhabi, and across the UAE.',
};

export default function HappyFamiliesPage() {
  return (
    <div className="py-12 sm:py-20 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
            <Heart className="w-4 h-4 fill-caramel text-caramel" />
            <span className="font-accent text-xl text-caramel font-bold">testimonials & smiles</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-ink tracking-tight mb-4">
            Happy families gallery
          </h1>
          <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
            Every puppy we place is family. Read heartfelt stories and browse photos from our adopters
            throughout Dubai, Abu Dhabi, and the GCC.
          </p>
        </div>

        {/* Masonry / Photo Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border-2 border-ink bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo with Overlay Badge */}
                <div className="relative w-full h-72 overflow-hidden bg-cream-100">
                  <Image
                    src={item.image}
                    alt={`${item.customerName} with ${item.puppyName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-xs font-bold text-ink shadow-sm border border-ink/10 flex items-center gap-1.5">
                    <span>{item.emoji}</span>
                    <span>{item.puppyName}</span>
                    <span className="text-ink-muted">({item.breed})</span>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[11px] font-medium backdrop-blur-sm">
                    {item.date}
                  </div>
                </div>

                {/* Testimonial Quote Body */}
                <div className="p-6">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-3 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>

                  <blockquote className="text-sm sm:text-base text-ink/85 italic leading-relaxed mb-4">
                    “{item.quote}”
                  </blockquote>
                </div>
              </div>

              {/* Adopter Information Card Footer */}
              <div className="p-6 pt-0 border-t border-ink/10 mt-auto">
                <div className="font-display font-bold text-base text-ink pt-3">
                  {item.customerName}
                </div>
                <div className="text-xs text-ink-muted">
                  {item.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Submission / WhatsApp Banner */}
        <div className="rounded-3xl border-2 border-ink bg-cream p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-card">
          <Heart className="w-12 h-12 fill-caramel text-caramel mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
            Are you a Petite Paws parent?
          </h2>
          <p className="text-ink/80 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto">
            We love seeing our babies grow! Send us photos and updates on WhatsApp to be featured on our
            happy families wall.
          </p>
          <Button
            href={getWhatsAppLink('Hi Petite Paws! I would love to share an update and photo of my puppy for your gallery!')}
            isExternal
            variant="whatsapp"
            size="lg"
            icon={<MessageCircle className="w-5 h-5 fill-white/20" />}
          >
            Share your story on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
