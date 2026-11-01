import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        bg: '#fffdf8',
        cream: {
          DEFAULT: '#fdeccd',
          50: '#fffcf7',
          100: '#fdf3e2',
          200: '#fdeccd',
          300: '#f9d59a',
          400: '#f5be70',
        },
        peach: {
          DEFAULT: '#f6d9a8',
          100: '#faecd4',
          200: '#f6d9a8',
          300: '#f0c67e',
        },
        ink: {
          DEFAULT: '#2a1a12',
          light: '#4d372b',
          muted: '#735848',
        },
        caramel: {
          DEFAULT: '#a14a1c',
          dark: '#6f2f10',
          hover: '#b55522',
          light: '#c86f3c',
        },
        whatsapp: {
          DEFAULT: '#1f7a4d',
          dark: '#124d30',
          hover: '#26915c',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-figtree)', 'sans-serif'],
        accent: ['var(--font-caveat)', 'cursive'],
      },
      boxShadow: {
        'chunky-caramel': '0 5px 0 0 #6f2f10',
        'chunky-caramel-hover': '0 7px 0 0 #6f2f10',
        'chunky-caramel-active': '0 2px 0 0 #6f2f10',
        'chunky-whatsapp': '0 5px 0 0 #124d30',
        'chunky-whatsapp-hover': '0 7px 0 0 #124d30',
        'chunky-whatsapp-active': '0 2px 0 0 #124d30',
        'chunky-ink': '0 5px 0 0 #2a1a12',
        'chunky-ink-hover': '0 7px 0 0 #2a1a12',
        'chunky-ink-active': '0 2px 0 0 #2a1a12',
        'card': '0 10px 30px -5px rgba(42, 26, 18, 0.08)',
        'card-hover': '0 20px 40px -10px rgba(42, 26, 18, 0.14)',
      },
      keyframes: {
        'wiggle-tail': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(18deg)' },
        },
        'mascot-bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'wiggle-tail': 'wiggle-tail 0.8s ease-in-out infinite',
        'mascot-bob': 'mascot-bob 2.4s ease-in-out infinite',
        'marquee': 'marquee 35s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

