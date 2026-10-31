export interface Testimonial {
  id: string;
  customerName: string;
  location: string;
  puppyName: string;
  breed: string;
  quote: string;
  rating: number;
  image: string;
  emoji: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    customerName: 'Fatima Al Mansoori',
    location: 'Dubai Hills Estate, Dubai (Sample customer, Dubai)',
    puppyName: 'Bella',
    breed: 'Teacup Maltipoo',
    quote:
      'Bringing Bella home was the most seamless luxury experience. The concierge sent daily 4K video updates while she was in the nursery, and her health documentation was impeccable. She is healthy, loving, and truly our baby.',
    rating: 5,
    image: '/media/family-1.jpg',
    emoji: '💖',
    date: '2 weeks ago',
  },
  {
    id: '2',
    customerName: 'Marcus & Elena Vance',
    location: 'Downtown Dubai (Sample customer, Dubai)',
    puppyName: 'Archie',
    breed: 'Toy Poodle',
    quote:
      'Archie is so smart! Zero shedding, perfectly calm in our apartment, and the 24/7 puppy nanny support helped us with his first week schedule.',
    rating: 5,
    image: '/media/family-2.jpg',
    emoji: '🧸',
    date: '1 month ago',
  },
  {
    id: '3',
    customerName: 'Sarah Jenkins',
    location: 'Palm Jumeirah, Dubai (Sample customer, Dubai)',
    puppyName: 'Coco',
    breed: 'Teacup Pomeranian',
    quote:
      'I was looking for an ethical breeder with pure Korean bloodlines. Petite Paws handled all MOCCAE UAE customs, health clearances, and brought her to our villa in a climate-controlled limousine!',
    rating: 5,
    image: '/media/family-3.jpg',
    emoji: '✨',
    date: '3 weeks ago',
  },
  {
    id: '4',
    customerName: 'Tariq & Reem',
    location: 'Jumeirah Golf Estates (Sample customer, Dubai)',
    puppyName: 'Mochi',
    breed: 'Bichon Frisé',
    quote:
      'Our children are in love with Mochi. His temperament is angelic and gentle. Thank you Petite Paws team for finding our dream puppy!',
    rating: 5,
    image: '/media/family-4.jpg',
    emoji: '🐶',
    date: '2 months ago',
  },
  {
    id: '5',
    customerName: 'Lina K.',
    location: 'Business Bay, Dubai (Sample customer, Dubai)',
    puppyName: 'Peanut',
    breed: 'Teacup Pomeranian',
    quote:
      'The boutique showroom in Bay Square is so clean and comforting. Visiting Peanut before making our decision gave us so much peace of mind.',
    rating: 5,
    image: '/media/family-5.jpg',
    emoji: '🐾',
    date: '3 weeks ago',
  },
  {
    id: '6',
    customerName: 'David H.',
    location: 'Emirates Hills, Dubai (Sample customer, Dubai)',
    puppyName: 'Ruby',
    breed: 'Mini Cavapoo',
    quote:
      'High-tier veterinary checks and genuine genetic guarantees. You can tell these puppies are loved and raised with family warmth from day one.',
    rating: 5,
    image: '/media/family-6.jpg',
    emoji: '🏆',
    date: '1 month ago',
  },
  {
    id: '7',
    customerName: 'Noor Al Qasimi',
    location: 'Al Barari, Dubai (Sample customer, Dubai)',
    puppyName: 'Leo',
    breed: 'Mini Frenchie',
    quote:
      'Leo breathes wonderfully and has the cutest personality! The travel crate and puppy welcome gift box were so luxurious.',
    rating: 5,
    image: '/media/family-7.jpg',
    emoji: '👑',
    date: '2 months ago',
  },
  {
    id: '8',
    customerName: 'Chloe & Alex',
    location: 'Dubai Marina (Sample customer, Dubai)',
    puppyName: 'Daisy',
    breed: 'Toy Poodle',
    quote:
      'We cannot imagine our home without Daisy. The WhatsApp concierge answered every question we had about nutrition and vaccinations.',
    rating: 5,
    image: '/media/family-8.jpg',
    emoji: '🌸',
    date: 'Just recently',
  },
];

