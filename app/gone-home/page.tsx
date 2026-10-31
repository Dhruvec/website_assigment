import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Heart, Sparkles } from 'lucide-react';
import { PUPPIES } from '@/data/puppies';
import { PuppyCard } from '@/components/puppies/PuppyCard';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Puppies Gone Home — Alumni Gallery',
  description:
    'Celebrate our beloved teacup puppy alumni who found their forever families across Dubai, Abu Dhabi, and the GCC.',
};

export default function GoneHomePage() {
  // Display alumni puppies (either marked gone_home or first 6 with isGoneHome styling)
  const alumniPuppies = PUPPIES.filter((p) => p.status === 'gone_home');
  const otherAlumni = PUPPIES.filter((p) => p.status !== 'gone_home').slice(0, 6);
  const displayList = [...alumniPuppies, ...otherAlumni];

  return (
    <div className="py-12 sm:py-20 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
            <Heart className="w-4 h-4 fill-caramel text-caramel" />
            <span className="font-accent text-xl text-caramel font-bold">forever love stories</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-ink tracking-tight mb-4">
            Puppies gone home
          </h1>
          <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
            These cherished teacup puppies have already joined their loving forever families in Dubai
            and across the Emirates. Each represents our lifelong commitment to ethical care and pure joy.
          </p>
        </div>

        {/* Gone Home Puppy Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {displayList.map((puppy) => (
            <PuppyCard key={puppy.id} puppy={puppy} isGoneHome={true} />
          ))}
        </div>

        {/* Bottom Reservation Banner */}
        <div className="rounded-3xl border-2 border-ink bg-cream-100 p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-card">
          <div className="w-14 h-14 rounded-full bg-cream border-2 border-caramel flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7 text-caramel" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink mb-3">
            Looking for a puppy just like one of these?
          </h2>
          <p className="text-ink/80 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Our ethical breeding partners in South Korea and Europe have new litters arriving monthly.
            Share your preferred breed, color, and size with our concierge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/puppies" variant="primary" size="lg">
              View available puppies
            </Button>
            <Button
              href={getWhatsAppLink('Hi! I saw a puppy in your Gone Home gallery and would like to reserve a similar companion.')}
              isExternal
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="w-5 h-5 fill-white/20" />}
            >
              Enquire on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

