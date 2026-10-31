import React from 'react';
import Link from 'next/link';
import { Mascot } from '@/components/ui/Mascot';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-20 px-4 bg-bg">
      <div className="max-w-md w-full text-center">
        {/* Mascot */}
        <div className="mb-6 inline-block">
          <Mascot pose="idle" className="w-40 h-40 mx-auto" />
        </div>

        <div className="inline-block px-3.5 py-1 rounded-full bg-cream text-caramel-dark font-accent text-xl font-bold mb-3 border border-caramel/20">
          ruff... where are we? 🐾
        </div>

        <h1 className="font-display font-black text-5xl sm:text-6xl text-ink mb-3 tracking-tight">
          404
        </h1>

        <h2 className="font-display font-bold text-2xl text-ink mb-3">
          This puppy wandered off!
        </h2>

        <p className="text-sm text-ink/75 leading-relaxed mb-8">
          The page or nursery link you were looking for doesn’t exist or has moved. Let’s lead you
          back to our cozy showroom!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            Return to Homepage
          </Button>
          <Button href="/puppies" variant="secondary" size="md">
            View available puppies
          </Button>
        </div>
      </div>
    </div>
  );
}

