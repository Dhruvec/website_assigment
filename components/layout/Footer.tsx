'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { Scallop } from '@/components/ui/Scallop';
import { BasketBack, BasketFront } from '@/components/ui/Basket';
import { Mascot, MascotPeek } from '@/components/ui/Mascot';

const STARS = [
  { top: '14%', left: '8%', size: 14, delay: '0s' },
  { top: '28%', left: '19%', size: 10, delay: '1.2s' },
  { top: '12%', left: '33%', size: 15, delay: '2.4s' },
  { top: '38%', left: '44%', size: 11, delay: '0.6s' },
  { top: '16%', left: '55%', size: 13, delay: '1.8s' },
  { top: '26%', left: '67%', size: 14, delay: '3.0s' },
  { top: '44%', left: '77%', size: 9, delay: '0.9s' },
  { top: '18%', left: '84%', size: 15, delay: '2.1s' },
  { top: '36%', left: '93%', size: 12, delay: '1.5s' },
  { top: '10%', left: '62%', size: 11, delay: '2.7s' },
];

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      {/* Scallop transition from cream page into dark night footer */}
      <div className="w-full relative pointer-events-none -mb-[1px]">
        <Scallop position="top" fillColor="#241309" showArgyle={false} />
      </div>

      {/* Footer element: NO transform, z-index, isolation or overflow-hidden */}
      <footer className="relative bg-[#241309] text-[#fde8c4] pt-10 sm:pt-16 pb-24 md:pb-16">
        {/* Sky layer: absolute inset-0 pointer-events-none overflow-hidden (clipping on this layer only) */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          {/* ~10 Twinkling 4-point stars with CSS clip-path & 3.2s staggered delay */}
          {STARS.map((star, i) => (
            <div
              key={i}
              className="absolute bg-[#f0b45a] motion-reduce:animate-none"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                clipPath:
                  'polygon(50% 0%, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0% 50%, 38% 38%)',
                animation: 'starTwinkle 3.2s ease-in-out infinite',
                animationDelay: star.delay,
              }}
            />
          ))}

          {/* Crescent moon top-right with soft glow and 8s float */}
          <div
            className="absolute top-6 sm:top-10 right-6 sm:right-14 w-12 h-12 sm:w-16 sm:h-16 motion-reduce:animate-none pointer-events-none"
            style={{
              animation: 'moonFloat 8s ease-in-out infinite',
              filter:
                'drop-shadow(0 0 16px rgba(240, 180, 90, 0.45)) drop-shadow(0 0 32px rgba(240, 180, 90, 0.2))',
            }}
          >
            <svg
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M 30 6 C 43.25 6 54 16.75 54 30 C 54 43.25 43.25 54 30 54 C 23.5 54 17.5 51.5 13 47.3 C 24 47.3 33 38.3 33 27.3 C 33 18.2 26.5 10.7 18 8.4 C 21.7 6.9 25.7 6 30 6 Z"
                fill="#fde8c4"
              />
            </svg>
          </div>
        </div>

        {/* 3-Column Content Layout (md) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-14 pb-12">
            {/* Column 1: Left (md:col-span-5) */}
            <div className="md:col-span-5 flex flex-col items-start">
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#fde8c4] tracking-tight leading-tight">
                Welcome home.
              </h2>
              <p className="text-[#fde8c4]/80 text-sm sm:text-base leading-relaxed mt-4 max-w-sm font-normal">
                {SITE_CONFIG.name} is Dubai’s premier boutique for healthy,
                ethically raised teacup and toy puppies from world-renowned
                champion pedigrees.
              </p>

              {/* Basket Container: wraps empty #pup-basket target (260x190) */}
              <div className="relative w-[260px] h-[190px] mt-8 select-none">
                {/* Empty target for ScrollPup live rect measurement */}
                <div
                  id="pup-basket"
                  className="absolute inset-0 w-[260px] h-[190px] pointer-events-none"
                />

                {/* Basket Back at z-10 (behind mascot) */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <BasketBack />
                </div>

                {/* On routes other than "/", render static, tail-wagging MascotPeek inside basket */}
                {!isHome ? (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[72px] z-20 pointer-events-none">
                    <MascotPeek className="w-[150px] h-auto" />
                  </div>
                ) : (
                  /* On "/", mobile & reduced motion static peek dog (since roaming dog is md:block only) */
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[72px] z-20 pointer-events-none md:hidden motion-reduce:block">
                    <MascotPeek className="w-[150px] h-auto" />
                  </div>
                )}

                {/* Basket Front at z-30 (paints over the dog's body at z-20) */}
                <div className="absolute inset-0 z-30 pointer-events-none">
                  <BasketFront />
                </div>
              </div>
            </div>

            {/* Column 2: Middle - Explore (md:col-span-3) */}
            <div className="md:col-span-3">
              <h3 className="font-accent text-3xl sm:text-4xl text-[#f0b45a] font-bold mb-5 tracking-wide">
                Explore
              </h3>
              <ul className="space-y-3 text-sm sm:text-base font-medium">
                <li>
                  <Link
                    href="/puppies"
                    className="text-[#fde8c4]/85 hover:text-[#f0b45a] transition-colors"
                  >
                    Available puppies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gone-home"
                    className="text-[#fde8c4]/85 hover:text-[#f0b45a] transition-colors"
                  >
                    Gone home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/happy-families"
                    className="text-[#fde8c4]/85 hover:text-[#f0b45a] transition-colors"
                  >
                    Happy families
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-[#fde8c4]/85 hover:text-[#f0b45a] transition-colors"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-[#fde8c4]/85 hover:text-[#f0b45a] transition-colors"
                  >
                    Delivery & collection
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-[#fde8c4]/85 hover:text-[#f0b45a] transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#fde8c4]/85 hover:text-[#f0b45a] transition-colors"
                  >
                    Visit & contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Right - Say hello (md:col-span-4) */}
            <div className="md:col-span-4">
              <h3 className="font-accent text-3xl sm:text-4xl text-[#f0b45a] font-bold mb-5 tracking-wide">
                Say hello
              </h3>
              <div className="space-y-3.5 text-sm sm:text-base">
                <div>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#fde8c4]/90 hover:text-[#f0b45a] transition-colors font-medium"
                  >
                    WhatsApp {SITE_CONFIG.phone}
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-[#fde8c4]/90 hover:text-[#f0b45a] transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
                <div className="text-[#fde8c4]/80 leading-relaxed max-w-xs">
                  {SITE_CONFIG.address}
                </div>

                {/* Social Pill Buttons (2px cream outline, rounded-full) */}
                <div className="flex flex-wrap items-center gap-2.5 pt-4">
                  <a
                    href={SITE_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-[#fde8c4] rounded-full px-4 py-1.5 text-xs font-bold text-[#fde8c4] hover:bg-[#fde8c4] hover:text-[#241309] transition-all"
                  >
                    Instagram
                  </a>
                  <a
                    href={SITE_CONFIG.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-[#fde8c4] rounded-full px-4 py-1.5 text-xs font-bold text-[#fde8c4] hover:bg-[#fde8c4] hover:text-[#241309] transition-all"
                  >
                    TikTok
                  </a>
                  <a
                    href="https://facebook.com/petitepaws"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-[#fde8c4] rounded-full px-4 py-1.5 text-xs font-bold text-[#fde8c4] hover:bg-[#fde8c4] hover:text-[#241309] transition-all"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & City Line */}
          <div className="pt-8 border-t border-[#fde8c4]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#fde8c4]/60 gap-4 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <p className="font-medium">
              Every puppy is family. Licensed luxury pet boutique in {SITE_CONFIG.city}, UAE.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Bar for Mobile (WhatsApp + Call) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[#241309]/95 backdrop-blur-md border-t border-[#fde8c4]/20 md:hidden flex items-center gap-2.5 shadow-lg">
        <a
          href={getWhatsAppLink('Hi! I am enquiring via your website.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-12 rounded-full bg-whatsapp text-white font-bold text-sm flex items-center justify-center gap-2 shadow-chunky-whatsapp active:translate-y-0.5 transition-all"
        >
          <span>WhatsApp Concierge</span>
        </a>

        <a
          href={`tel:${SITE_CONFIG.phoneDigits}`}
          className="h-12 px-5 rounded-full border-2 border-[#fde8c4] bg-[#241309] text-[#fde8c4] font-bold text-sm flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all"
          aria-label="Call Concierge"
        >
          <span>Call</span>
        </a>
      </div>
    </>
  );
}

export default Footer;
