import React from 'react';
import { Button } from '@/components/ui/Button';
import { Mascot } from '@/components/ui/Mascot';

export default function HomePage() {
  return (
    <main id="main-content" className="p-12 text-center">
      <Mascot pose="idle" className="w-32 h-32 mx-auto mb-6" />
      <h1 className="text-4xl font-extrabold text-ink mb-4">Petite Paws Boutique</h1>
      <p className="text-ink-muted mb-6">Every puppy is family</p>
      <div className="flex gap-4 justify-center">
        <Button variant="primary">View available puppies</Button>
        <Button variant="whatsapp">Enquire on WhatsApp</Button>
      </div>
    </main>
  );
}
