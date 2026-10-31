import React from 'react';
import { Hero } from '@/components/home/Hero';
import { DoorsSection } from '@/components/home/DoorsSection';
import { TwoWaysSection } from '@/components/home/TwoWaysSection';
import { JourneySection } from '@/components/home/JourneySection';
import { ChatSection } from '@/components/home/ChatSection';
import { PassportTrustSection } from '@/components/home/PassportTrustSection';
import { HappyFamiliesSection } from '@/components/home/HappyFamiliesSection';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCtaSection } from '@/components/home/FinalCtaSection';

export default function HomePage() {
  return (
    <>
      {/* 2. Hero */}
      <Hero />

      {/* 3. "Meet the pups" Doors Section */}
      <DoorsSection />

      {/* 4. "Two ways to meet your puppy" */}
      <TwoWaysSection />

      {/* 5. "Your puppy journey" */}
      <JourneySection />

      {/* 6. WhatsApp-style chat block */}
      <ChatSection />

      {/* 7. "Puppy passport" trust section */}
      <PassportTrustSection />

      {/* 8. "Happy families" */}
      <HappyFamiliesSection />

      {/* 9. FAQ */}
      <FaqSection />

      {/* 10. Final CTA */}
      <FinalCtaSection />
    </>
  );
}
