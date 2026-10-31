export interface JourneyStep {
  step: number;
  title: string;
  description: string;
  tagline: string;
  icon: string;
  highlight: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    step: 1,
    title: 'Choose your breed',
    tagline: 'Match your lifestyle & energy',
    description:
      'Browse our curated boutique collection of hypoallergenic teacup and toy breeds — from fluffy teddy-bear Maltipoos to regal Pomeranians. Tell our concierge your preferred size, temperament, and family dynamics.',
    icon: 'paw',
    highlight: 'Handpicked European & Korean bloodlines',
  },
  {
    step: 2,
    title: 'Get photos & details',
    tagline: 'High-res videos, vet scans & pedigree',
    description:
      'Receive full 4K nursery videos, parent certificates, comprehensive veterinary health reports, and microchip registration. You can also book a private showroom play-date in Business Bay, Dubai.',
    icon: 'sparkles',
    highlight: 'Complete health guarantee & DNA verified',
  },
  {
    step: 3,
    title: 'Secure & safe delivery',
    tagline: 'Temperature-controlled nanny handover',
    description:
      'Your puppy travels in VIP comfort. We handle official UAE Ministry (MOCCAE) import clearances, airport transfers, and climate-controlled home delivery directly to your doorstep with a welcome hamper.',
    icon: 'heart-handshake',
    highlight: 'VIP Doorstep Handover across UAE & GCC',
  },
];

