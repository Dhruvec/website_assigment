export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'health' | 'delivery' | 'showroom';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'health',
    question: 'How are your teacup puppies bred and are they healthy?',
    answer:
      'Every puppy at Petite Paws comes exclusively from certified ethical preservation breeders in South Korea and Europe who prioritize genetic health, parent DNA screening, and temperament above all. Our puppies undergo multiple veterinary health inspections, are microchipped, fully vaccinated for their age, and accompanied by a 1-Year Genetic Health Guarantee.',
  },
  {
    id: 'faq-2',
    category: 'showroom',
    question: 'Can I visit and play with the puppies before adopting?',
    answer:
      'Yes, absolutely! We welcome you to our private luxury boutique showroom located at Bay Square, Business Bay, Dubai. You can schedule a private playdate where our concierge will introduce you to available puppies in a sanitized, relaxed environment.',
  },
  {
    id: 'faq-3',
    category: 'delivery',
    question: 'How does safe delivery work within Dubai and across the UAE?',
    answer:
      'We offer VIP door-to-door puppy nanny delivery across Dubai, Abu Dhabi, Sharjah, and all UAE emirates. Your puppy travels in a temperature-controlled luxury vehicle accompanied by our trained pet care specialist. We also deliver across the GCC (Saudi Arabia, Qatar, Kuwait, Bahrain, Oman) with all official import clearance and health documentation.',
  },
  {
    id: 'faq-4',
    category: 'general',
    question: 'What is the difference between Showroom Ready and Imported for You?',
    answer:
      'Showroom Ready puppies are currently in our Dubai nursery, fully transitioned, vaccinated, and available for same-day adoption or immediate viewing. "Imported for You" allows you to reserve a specific bloodline, color, or micro-size from our vetted elite partner nurseries in South Korea and Europe, with guaranteed VIP flight transit directly to Dubai in 7–14 days.',
  },
  {
    id: 'faq-5',
    category: 'health',
    question: 'Are your puppies hypoallergenic and non-shedding?',
    answer:
      'Most of our popular breeds—such as Maltipoos, Toy Poodles, Cavapoos, and Bichon Frisés—have single-layer fleece or hair coats rather than fur. This makes them significantly hypoallergenic, dander-free, and practically non-shedding, making them ideal companions for apartments and families with mild pet sensitivities.',
  },
  {
    id: 'faq-6',
    category: 'general',
    question: 'What is included in the puppy starter package?',
    answer:
      'Every Petite Paws puppy goes home with a comprehensive luxury starter hamper: an official MOCCAE veterinary health passport, ISO microchip registration, 1-Year Genetic Health Guarantee contract, premium food starter pack, custom ceramic bowls, nursery scent blanket, training pads, collar & leash, chew toys, and 24/7 lifetime concierge support.',
  },
  {
    id: 'faq-7',
    category: 'health',
    question: 'What vaccinations will my puppy have upon arrival?',
    answer:
      'All puppies receive comprehensive age-appropriate vaccination protocols (DHPPi, Parvovirus, Distemper, Leptospirosis, Hepatitis, and Rabies where applicable for international transport), alongside multiple deworming cycles and external parasite preventive treatments recorded in their official health passport.',
  },
  {
    id: 'faq-8',
    category: 'showroom',
    question: 'Do I need an appointment to visit your Dubai showroom?',
    answer:
      'While walk-ins are warmly welcomed during boutique hours (10:00 AM – 9:00 PM daily), we strongly recommend booking a private nursery appointment via WhatsApp or our contact page to ensure one-on-one attention from our puppy specialist.',
  },
  {
    id: 'faq-9',
    category: 'general',
    question: 'What ongoing support do you provide after adoption?',
    answer:
      'Our relationship does not end at delivery. Every family receives direct access to our 24/7 WhatsApp puppy care hotline for questions about feeding schedules, crate training, grooming tips, veterinary recommendations, and milestone care throughout your puppy’s life.',
  },
];

export function getFAQSchemaJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

