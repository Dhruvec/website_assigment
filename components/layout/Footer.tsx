'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Phone, Mail, MapPin, Instagram, Heart, Clock } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { Scallop } from '@/components/ui/Scallop';
import { Mascot } from '@/components/ui/Mascot';

export function Footer() {
  return (
    <>
      <footer className="relative bg-[#fde8c4] text-ink pt-12 pb-24 md:pb-14 border-t border-caramel/20 overflow-hidden">
        {/* Scallop Divider at top of footer */}
        <div className="absolute top-0 left-0 right-0 -translate-y-full">
          <Scallop position="top" fillColor="#fde8c4" showArgyle={true} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-caramel/25">
            {/* Column 1: Brand & Blurb (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-caramel flex items-center justify-center p-1 shadow-sm">
                  <Mascot pose="idle" animated={false} className="w-full h-full" />
                </div>
                <div>
                  <span className="font-display font-black text-2xl text-ink tracking-tight block">
                    {SITE_CONFIG.name}
                  </span>
                  <span className="font-accent text-base text-caramel font-semibold">
                    {SITE_CONFIG.tagline}
                  </span>
                </div>
              </Link>
              <p className="text-ink/80 text-sm leading-relaxed max-w-md mb-6">
                Dubai’s premier teacup and toy dog boutique. We partner exclusively with ethical,
                world-champion pedigree breeders across Europe and South Korea to bring loving,
                healthy, and vet-certified puppies safely into their forever homes.
              </p>
              {/* Handwritten Tagline with cute heart */}
              <div className="flex items-center gap-2 bg-white/70 px-4 py-2 rounded-full border border-caramel/20">
                <Heart className="w-4 h-4 fill-caramel text-caramel" />
                <span className="font-accent text-lg text-caramel-dark font-bold">
                  “every puppy is family”
                </span>
              </div>
            </div>

            {/* Column 2: Explore Links (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="font-display font-bold text-lg text-ink mb-4 flex items-center gap-2">
                <span>Explore</span>
                <span className="w-8 h-0.5 bg-caramel rounded-full" />
              </h3>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <Link href="/puppies" className="hover:text-caramel transition-colors flex items-center gap-1.5">
                    <span>Available Puppies</span>
                  </Link>
                </li>
                <li>
                  <Link href="/puppies?origin=local" className="hover:text-caramel transition-colors flex items-center gap-1.5">
                    <span>In Our Showroom</span>
                  </Link>
                </li>
                <li>
                  <Link href="/puppies?origin=imported" className="hover:text-caramel transition-colors flex items-center gap-1.5">
                    <span>Imported For You</span>
                  </Link>
                </li>
                <li>
                  <Link href="/happy-families" className="hover:text-caramel transition-colors flex items-center gap-1.5">
                    <span>Happy Families Gallery</span>
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-caramel transition-colors flex items-center gap-1.5">
                    <span>How It Works & Delivery</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-caramel transition-colors flex items-center gap-1.5">
                    <span>Frequently Asked Questions</span>
                  </Link>
                </li>
                <li>
                  <Link href="/gone-home" className="hover:text-caramel transition-colors flex items-center gap-1.5">
                    <span>Puppies Gone Home</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Say Hello (4 cols) */}
            <div className="lg:col-span-4">
              <h3 className="font-display font-bold text-lg text-ink mb-4 flex items-center gap-2">
                <span>Say Hello</span>
                <span className="w-8 h-0.5 bg-caramel rounded-full" />
              </h3>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
                  <span className="text-ink/85">{SITE_CONFIG.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-caramel shrink-0" />
                  <span className="text-ink/85">{SITE_CONFIG.openingHours}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-whatsapp shrink-0" />
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink font-semibold hover:text-whatsapp transition-colors underline decoration-whatsapp/30"
                  >
                    WhatsApp: {SITE_CONFIG.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-caramel shrink-0" />
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-ink hover:text-caramel transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-6">
                <a
                  href={SITE_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-caramel/30 flex items-center justify-center text-caramel hover:bg-caramel hover:text-white transition-all shadow-sm"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-whatsapp/30 flex items-center justify-center text-whatsapp hover:bg-whatsapp hover:text-white transition-all shadow-sm"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a
                  href={`tel:${SITE_CONFIG.phoneDigits}`}
                  className="w-10 h-10 rounded-full bg-white border border-caramel/30 flex items-center justify-center text-caramel hover:bg-caramel hover:text-white transition-all shadow-sm"
                  aria-label="Call concierge"
                >
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-ink/70 gap-4 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved. Demo sample data for technical evaluation.
            </p>
            <p className="flex items-center justify-center gap-1 font-medium">
              <span>Licensed luxury pet concierge in {SITE_CONFIG.city}, UAE</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Bar for Mobile (WhatsApp + Call) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-bg/95 backdrop-blur-md border-t border-caramel/20 md:hidden flex items-center gap-2.5 shadow-lg">
        <a
          href={getWhatsAppLink('Hi! I am enquiring via your website.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-12 rounded-full bg-whatsapp text-white font-bold text-sm flex items-center justify-center gap-2 shadow-chunky-whatsapp active:translate-y-0.5 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Concierge</span>
        </a>

        <a
          href={`tel:${SITE_CONFIG.phoneDigits}`}
          className="h-12 px-4 rounded-full border-2 border-ink bg-white text-ink font-bold text-sm flex items-center justify-center gap-1.5 shadow-sm active:translate-y-0.5 transition-all"
          aria-label="Call Concierge"
        >
          <Phone className="w-4 h-4 text-caramel" />
          <span>Call</span>
        </a>
      </div>
    </>
  );
}

