import React from 'react';
import type { Metadata } from 'next';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Navigation,
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { ContactForm } from '@/components/contact/ContactForm';
import { PawIcon } from '@/components/ui/PawIcon';
import { Mascot } from '@/components/ui/Mascot';

export const metadata: Metadata = {
  title: 'Visit Showroom & Contact Us',
  description:
    'Visit our luxury teacup puppy boutique in Bay Square, Business Bay, Dubai. Book private showroom playdates or chat with our 24/7 concierge.',
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-cream px-3.5 py-1 rounded-full border border-caramel/20 mb-3 shadow-sm">
            <PawIcon className="w-4 h-4 fill-caramel" />
            <span className="font-accent text-xl text-caramel font-bold">boutique showroom</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl text-ink tracking-tight mb-4">
            Visit us in {SITE_CONFIG.city}
          </h1>
          <p className="text-ink/80 text-base sm:text-lg leading-relaxed">
            Come cuddle our puppies in a private, sanitized play suite. Walk-ins are warmly welcomed,
            or reserve a private nursery appointment below.
          </p>
        </div>

        {/* Main Grid: Left Contact Info & Map + Right Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Left Column: Direct Info & Map Embed */}
          <div className="lg:col-span-5 space-y-6">
            {/* Showroom Details Box */}
            <div className="rounded-3xl border-2 border-ink bg-cream-50 p-6 sm:p-8 shadow-card space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-ink/10">
                <div className="w-12 h-12 rounded-full bg-cream border-2 border-caramel flex items-center justify-center p-0.5">
                  <Mascot pose="idle" animated={false} className="w-9 h-9" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-ink">
                    {SITE_CONFIG.name} Boutique
                  </h2>
                  <p className="text-xs text-caramel font-bold">Bay Square • Business Bay</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-ink/85">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">Showroom Address</strong>
                    <span>{SITE_CONFIG.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">Visiting Hours</strong>
                    <span>{SITE_CONFIG.openingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-whatsapp shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">WhatsApp Concierge</strong>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-whatsapp hover:underline font-semibold"
                    >
                      {SITE_CONFIG.phone} (Instant Reply)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">Direct Phone</strong>
                    <a href={`tel:${SITE_CONFIG.phoneDigits}`} className="hover:text-caramel font-semibold">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ink font-bold">Concierge Email</strong>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-caramel">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Embed Placeholder */}
            <div className="rounded-3xl border-2 border-ink overflow-hidden bg-cream-100 shadow-card relative h-72 sm:h-80">
              {/* Map Canvas Background Styling */}
              <div className="absolute inset-0 bg-[#f4ebd9] opacity-90">
                {/* Simulated Map Streets & Grid */}
                <div className="w-full h-full bg-[linear-gradient(to_right,#e8ddc7_1px,transparent_1px),linear-gradient(to_bottom,#e8ddc7_1px,transparent_1px)] bg-[size:32px_32px]" />
                {/* Simulated Canal / Water Feature in Business Bay */}
                <div className="absolute bottom-6 left-0 right-0 h-14 bg-[#c8e2ee] -rotate-3 border-y-2 border-[#b5d5e3]" />
              </div>

              {/* Pin Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="bg-white px-3 py-1 rounded-full border-2 border-caramel shadow-lg text-xs font-bold text-ink whitespace-nowrap mb-1 animate-bounce">
                  🐾 {SITE_CONFIG.name} Boutique
                </div>
                <div className="w-8 h-8 rounded-full bg-caramel border-2 border-white flex items-center justify-center shadow-md">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Map Footer Link Button */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(SITE_CONFIG.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 rounded-full bg-white/95 backdrop-blur-md border border-ink/15 text-ink font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:bg-cream-50 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-caramel" />
                  <span>Open in Google Maps / Navigation</span>
                  <ExternalLink className="w-3 h-3 text-ink-muted ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Booking Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

