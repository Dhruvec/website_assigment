export const SITE_CONFIG = {
  name: "Petite Paws",
  tagline: "Every puppy is family",
  city: "Dubai",
  fullLocation: "Downtown Dubai & Business Bay",
  phone: "+971 50 123 4567",
  phoneDigits: "971501234567",
  email: "concierge@petitepaws.ae",
  address: "Showroom 03, Building 4, Bay Square, Business Bay, Dubai, UAE",
  openingHours: "Monday - Sunday: 10:00 AM - 9:00 PM (By Appointment & Walk-in)",
  url: "https://petitepaws-boutique.vercel.app",
  socials: {
    instagram: "https://instagram.com/petitepaws.official",
    whatsapp: "https://wa.me/971501234567",
    tiktok: "https://tiktok.com/@petitepaws",
  },
};

export function getWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${SITE_CONFIG.phoneDigits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
