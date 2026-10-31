# Petite Paws Boutique 🐾

> Premium Teacup & Toy Puppy Boutique — *“Every puppy is family”*

A production-quality luxury puppy boutique web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lenis Smooth Scroll**. Designed specifically for high-conversion, warm emotional resonance, and adherence to luxury boutique aesthetics.

---

## 🌟 Highlights & Features

- **Original Mascot Artwork**: Inline hand-crafted SVG cartoon puppy (apricot body, big expressive eyes, pink blush cheeks, leather collar) with 3 animated poses: `<Mascot pose="idle|walk|peek" />`.
- **Interactive Nursery Doors (`Meet the pups`)**:
  - Horizontal strip of 15 arched wooden doors, each in an artisanal wood tone with knocker, knob, and rotated status sticker.
  - Doors open in 3D (`rotateY`) on hover or touch to reveal the puppy and pricing.
  - Scroll-driven walking mascot that strides along the wooden parquet floor beneath the doors using `useScroll` and `useTransform`.
  - Responsive snap-scroll carousel on touch devices with zero page-level horizontal overflow.
- **Hero Section**:
  - Display headline with staggered word animation.
  - Whimsical handwritten tagline with an SVG underline drawn on load (`pathLength`).
  - Bottom-aligned row of arched doorway photo frames peeking over a scalloped divider with the mascot peeking in the center.
- **WhatsApp Concierge Experience**:
  - Interactive WhatsApp conversation widget simulating live typing, sequential message arrival, and quick breed filters.
  - Deep-linked prefilled WhatsApp messages for every single puppy profile (`wa.me/{{PHONE_DIGITS}}?text=...`).
  - Mobile bottom floating quick-action bar (WhatsApp + Direct Call).
- **Comprehensive Puppy Directory (`/puppies`)**:
  - Filterable by Breed, Origin (Showroom Ready vs. Imported Pedigree), and Sex (Boy/Girl).
  - Search bar and active filter counts with instant URL search-params synchronization.
  - Skeleton loading states and clean empty-state fallbacks.
- **Individual Companion Showcase (`/puppies/[slug]`)**:
  - Static site generation (`generateStaticParams`) for all 15 companions.
  - Multi-photo gallery with thumbnail switcher.
  - Simulated 4K nursery play video modal.
  - Official health passport certifications, microchip IDs, and parent DNA details.
  - Related companions recommendation row.
- **Trust & Process Pages**:
  - `/happy-families`: Alumni photo wall with verified quotes, star ratings, and infinite marquee.
  - `/how-it-works`: Three-step journey plus dedicated `#delivery` specifications (in-cabin flight nannies, 22°C fleet transit, UAE MOCCAE clearance).
  - `/faq`: Full accordion knowledge base with integrated Schema.org `FAQPage` JSON-LD.
  - `/contact`: Showroom address in Bay Square (Business Bay, Dubai), styled map preview, and client-side validated booking form with success states.
  - `/gone-home`: Muted alumni cards with corner ribbon stamps.
  - Custom `404` page featuring the lost puppy mascot.

---

## 🎨 Design Tokens & Aesthetics

| Token | Value | Purpose |
| :--- | :--- | :--- |
| `--bg` | `#fffdf8` | Warm organic paper background |
| `--cream` | `#fde8c4` | Warm cream accents & badges |
| `--peach` | `#f6d9a8` | Soft pastel secondary warmth |
| `--ink` | `#2a1a12` | Rich dark chocolate brown typography |
| `--caramel` | `#a14a1c` | Primary warm accent color |
| `--caramel-dark` | `#6f2f10` | Chunky button 3D bottom shadow |
| `--whatsapp` | `#1f7a4d` | Official green brand color |
| `--whatsapp-dark`| `#124d30` | Chunky WhatsApp button shadow |

- **Typography**:
  - Display: **Fraunces** (800–900 weight, tight tracking)
  - Body: **Figtree** (friendly, clean, readable sans-serif)
  - Accent: **Caveat** (handwritten, craft-feel notes & stamps)
- **Buttons**: 56px tall pill buttons with 5–7px offset bottom shadows that compress on click.
- **Section Dividers**: SVG scalloped cloud edges with dashed craft inner strokes and argyle diamond patterned ribbons.

---

## 📂 Project Structure

```text
├── app/
│   ├── contact/page.tsx             # Showroom address, map embed & validated form
│   ├── faq/page.tsx                 # Full FAQ with JSON-LD schema
│   ├── gone-home/page.tsx           # Alumni puppies with corner ribbon styling
│   ├── happy-families/page.tsx      # Customer reviews & photo wall
│   ├── how-it-works/page.tsx        # 3-step guide + #delivery anchor section
│   ├── puppies/
│   │   ├── page.tsx                 # Puppy grid with searchParams filters
│   │   └── [slug]/
│   │       ├── page.tsx             # SSG puppy details & deep WhatsApp link
│   │       └── PuppyDetailClient.tsx# Gallery & 4K video preview modal
│   ├── globals.css                  # Design tokens, chunky buttons, reduced motion
│   ├── layout.tsx                   # Font configurations, SEO metadata, skip link
│   ├── not-found.tsx                # Custom 404 with mascot
│   ├── page.tsx                     # 10 home sections assembled in exact order
│   ├── robots.ts                    # Dynamic robots.txt
│   └── sitemap.ts                   # Dynamic sitemap.xml
├── components/
│   ├── contact/
│   │   └── ContactForm.tsx          # Client-side validated booking form
│   ├── home/
│   │   ├── Hero.tsx                 # Word reveal, underline draw, arched frames
│   │   ├── DoorsSection.tsx         # 3D wooden doors with scroll mascot walk
│   │   ├── TwoWaysSection.tsx       # Showroom vs. Imported pedigree cards
│   │   ├── JourneySection.tsx       # 3 numbered steps with scroll-drawn path
│   │   ├── ChatSection.tsx          # Interactive WhatsApp simulator & collage
│   │   ├── PassportTrustSection.tsx # 4 stamp-style trust guarantee cards
│   │   ├── HappyFamiliesSection.tsx # Featured quote & infinite photo marquee
│   │   ├── FaqSection.tsx           # 3 accordion items for homepage
│   │   └── FinalCtaSection.tsx      # Peeking puppy & welcome home sticker
│   ├── layout/
│   │   ├── Header.tsx               # Sticky header with sliding paw indicator
│   │   └── Footer.tsx               # Brand blurb, links, mobile floating bar
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx # Lenis smooth scroll with reduced motion check
│   ├── puppies/
│   │   ├── PuppyCard.tsx            # Reusable card with status badges & ribbon
│   │   └── PuppyGalleryClient.tsx   # Filterable gallery & skeleton states
│   └── ui/
│       ├── Accordion.tsx            # Accessible accordion with animated height
│       ├── ArchFrame.tsx            # Arched doorway photo frame
│       ├── Button.tsx               # Chunky pill button component
│       ├── Mascot.tsx               # Flat cartoon mascot (idle, walk, peek)
│       ├── PawIcon.tsx              # Reusable paw vector icon
│       └── Scallop.tsx              # Scalloped cloud edge SVG divider
├── data/
│   ├── faq.ts                       # 9 detailed questions & JSON-LD schema
│   ├── puppies.ts                   # 15 sample puppies with health passports
│   ├── steps.ts                     # Journey steps data
│   └── testimonials.ts              # Customer quotes & locations
├── lib/
│   └── site-config.ts               # Brand, phone, address, and WhatsApp generator
├── public/
│   └── media/                       # Stock puppy photos downloaded locally
├── scripts/
│   └── download-media.mjs           # Local media acquisition script
└── tailwind.config.ts               # Custom palette, animations & shadows
```

---

## 🚀 Setup & Local Development

1. **Clone & Install Dependencies**:
   ```bash
   git clone <repo-url>
   cd petite-paws-boutique
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

4. **Linting Check**:
   ```bash
   npm run lint
   ```

---

## ♿ Accessibility & Motion

- **Skip Navigation**: Accessible hidden skip link (`#main-content`) available to keyboard and screen-reader users.
- **Focus Rings**: High-contrast, custom offset focus rings on all interactive elements.
- **Reduced Motion**: Automatically detects `prefers-reduced-motion: reduce`. Disables Lenis smooth scrolling, reduces Framer Motion transitions, and halts decorative CSS animations.
- **ARIA Standards**: Proper `aria-expanded`, `aria-controls`, and `role="region"` attributes across accordions and mobile overlays.
- **SEO & Structured Data**: Built-in Open Graph images, Twitter Cards, canonical links, and Schema.org `FAQPage` microdata.

---

## 📦 Deployment to Vercel

This repository is optimized for one-click deployment on [Vercel](https://vercel.com):
1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the project into your Vercel Dashboard.
3. Framework Preset: **Next.js** (detected automatically).
4. Build Command: `next build`
5. Output Directory: `.next`
6. Deploy!

