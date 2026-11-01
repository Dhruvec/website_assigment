'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '@/lib/site-config';
import { PawIcon } from '@/components/ui/PawIcon';

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
      const isScrolled = window.scrollY > 24;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
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
        className="sticky top-0 z-50 w-full"
        style={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: scrolled ? 'rgba(255,253,248,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(42,26,18,0.08)' : '1px solid transparent',
          transition: 'background-color 0.25s, backdrop-filter 0.25s, border-bottom 0.25s',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between w-full">
          {/* Logo Badge + Wordmark — NO tagline, NO mascot SVG in logo area */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none flex-shrink-0"
            aria-label={`${SITE_CONFIG.name} homepage`}
          >
            {/* 44px round logo badge with 2px caramel ring */}
            <div
              className="rounded-full border-2 border-caramel bg-cream-100 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform"
              style={{ width: 44, height: 44 }}
            >
              {/* Simple paw/brand mark inside the badge — not a full mascot */}
              <PawIcon className="w-5 h-5 fill-caramel" />
            </div>
            {/* Brand wordmark only — display serif, 1.6rem */}
            <span
              className="font-display font-black text-ink tracking-tight leading-none group-hover:text-caramel transition-colors"
              style={{ fontSize: '1.6rem' }}
            >
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Centered Desktop Nav — font-medium, 1rem, gap 40px */}
          <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2" style={{ gap: 40 }} aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-medium transition-colors duration-150 flex flex-col items-center pb-4 ${
                    isActive
                      ? 'text-caramel'
                      : 'text-ink/75 hover:text-ink'
                  }`}
                  style={{ fontSize: '1rem' }}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-paw"
                      className="absolute bottom-0 flex justify-center text-caramel"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    >
                      <PawIcon className="w-3.5 h-3.5 fill-caramel" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: WhatsApp pill (no icon) + Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppLink('Hi Petite Paws! I would like to enquire about your available puppies.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-full font-bold text-sm bg-whatsapp text-white transition-all duration-150 shadow-[0_4px_0_0_#124d30] hover:-translate-y-[2px] hover:shadow-[0_6px_0_0_#124d30] active:translate-y-[2px] active:shadow-[0_2px_0_0_#124d30]"
            >
              WhatsApp us
            </a>

            {/* Mobile (< 768px): "Menu" text button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden px-4 py-2 rounded-full bg-cream-100 border border-ink/15 text-ink font-bold text-sm hover:bg-cream-200 transition-colors focus-visible:ring-2 focus-visible:ring-caramel"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
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
            className="fixed inset-0 z-50 bg-[#fffdf8] flex flex-col p-6 overflow-y-auto md:hidden"
          >
            {/* Mobile Top Header */}
            <div className="flex items-center justify-between pb-4 border-b border-ink/10">
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full border-2 border-caramel bg-cream-100 flex items-center justify-center overflow-hidden flex-shrink-0"
                  style={{ width: 44, height: 44 }}
                >
                  <PawIcon className="w-5 h-5 fill-caramel" />
                </div>
                <span
                  className="font-display font-black text-ink tracking-tight leading-none"
                  style={{ fontSize: '1.6rem' }}
                >
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

            {/* Greeting */}
            <div className="pt-6 pb-4">
              <span className="font-accent text-3xl text-caramel block -rotate-1 font-bold">
                where to, friend?
              </span>
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

            {/* Mobile CTAs */}
            <div className="pt-6 border-t border-ink/10 flex flex-col gap-3">
              <a
                href={getWhatsAppLink('Hi! I am enquiring from your website.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-14 rounded-full bg-whatsapp text-white font-bold flex items-center justify-center shadow-[0_4px_0_0_#124d30] active:translate-y-[2px]"
              >
                WhatsApp us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
