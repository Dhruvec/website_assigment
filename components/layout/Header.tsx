'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Menu, X, Phone, Heart } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { PawIcon } from '@/components/ui/PawIcon';
import { Mascot } from '@/components/ui/Mascot';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Puppies', href: '/puppies' },
  { name: 'Happy families', href: '/happy-families' },
  { name: 'How it works', href: '/how-it-works' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Visit & contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#fde8c4]/90 backdrop-blur-md shadow-sm border-b border-caramel/15 py-3'
            : 'bg-[#fde8c4]/80 backdrop-blur-sm border-b border-caramel/10 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label={`${SITE_CONFIG.name} homepage`}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-caramel flex items-center justify-center p-0.5 shadow-sm group-hover:rotate-6 transition-transform">
              <Mascot pose="idle" animated={false} className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl text-ink tracking-tight leading-none group-hover:text-caramel transition-colors">
                {SITE_CONFIG.name}
              </span>
              <span className="font-accent text-sm text-caramel font-semibold tracking-wide -mt-0.5">
                {SITE_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Centered Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-2 rounded-full font-medium text-sm transition-colors duration-150 flex flex-col items-center group ${
                    isActive
                      ? 'text-caramel font-bold'
                      : 'text-ink/80 hover:text-ink font-semibold'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-paw"
                      className="absolute -bottom-1.5 flex justify-center text-caramel"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    >
                      <PawIcon className="w-3.5 h-3.5 fill-caramel" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: WhatsApp CTA (Desktop) + Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppLink('Hi Petite Paws! I would like to enquire about your available puppies.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-whatsapp text-white shadow-chunky-whatsapp hover:-translate-y-0.5 hover:shadow-chunky-whatsapp-hover active:translate-y-0.5 active:shadow-chunky-whatsapp-active transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp us</span>
            </a>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-cream-100 border border-ink/15 text-ink hover:bg-cream-200 transition-colors focus-visible:ring-2 focus-visible:ring-caramel"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-[#fffdf8] flex flex-col p-6 overflow-y-auto lg:hidden"
          >
            {/* Mobile Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-ink/10">
              <div className="flex items-center gap-2.5">
                <Mascot pose="idle" animated={false} className="w-8 h-8" />
                <span className="font-display font-extrabold text-xl text-ink">
                  {SITE_CONFIG.name}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-cream-100 border border-ink/20 text-ink hover:bg-cream-200"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cheerful Greeting Header */}
            <div className="pt-6 pb-4">
              <span className="font-accent text-2xl text-caramel block -rotate-1 font-bold">
                where to, friend?
              </span>
              <p className="text-xs text-ink-muted mt-0.5">
                Explore our teacup companions & boutique showroom in {SITE_CONFIG.city}
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2 my-auto py-4">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3.5 rounded-2xl text-lg font-bold transition-all ${
                      isActive
                        ? 'bg-cream text-caramel border-2 border-caramel/30 pl-5'
                        : 'text-ink hover:bg-cream-100'
                    }`}
                  >
                    <span className="font-display text-xl">{link.name}</span>
                    {isActive ? (
                      <PawIcon className="w-5 h-5 fill-caramel" />
                    ) : (
                      <span className="text-ink-muted text-sm font-normal">→</span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile CTAs & Phone */}
            <div className="pt-6 border-t border-ink/10 flex flex-col gap-3">
              <a
                href={getWhatsAppLink('Hi! I am enquiring from your website.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-14 rounded-full bg-whatsapp text-white font-bold flex items-center justify-center gap-2 shadow-chunky-whatsapp"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp concierge</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phoneDigits}`}
                className="w-full h-12 rounded-full border-2 border-ink text-ink font-bold flex items-center justify-center gap-2 hover:bg-cream-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-caramel" />
                <span>Call {SITE_CONFIG.phone}</span>
              </a>

              <div className="flex items-center justify-center gap-1.5 text-xs text-ink-muted pt-2">
                <Heart className="w-3.5 h-3.5 fill-caramel text-caramel" />
                <span>{SITE_CONFIG.tagline} • {SITE_CONFIG.city}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

