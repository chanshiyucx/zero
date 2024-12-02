import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import scrollbar from 'tailwind-scrollbar'
import animate from 'tailwindcss-animate'
import animated from 'tailwindcss-animated'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        // lg: '1024px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Pier Sans', ...defaultTheme.fontFamily.sans],
      },
      listStyleType: {
        square: 'square',
      },
      colors: {
        base: 'hsl(var(--color-base) / <alpha-value>)',
        surface: 'hsl(var(--color-surface) / <alpha-value>)',
        overlay: 'hsl(var(--color-overlay) / <alpha-value>)',
        muted: 'hsl(var(--color-muted) / <alpha-value>)',
        subtle: 'hsl(var(--color-subtle) / <alpha-value>)',
        text: 'hsl(var(--color-text) / <alpha-value>)',
        love: 'hsl(var(--color-love) / <alpha-value>)',
        gold: 'hsl(var(--color-gold) / <alpha-value>)',
        rose: 'hsl(var(--color-rose) / <alpha-value>)',
        pine: 'hsl(var(--color-pine) / <alpha-value>)',
        foam: 'hsl(var(--color-foam) / <alpha-value>)',
        iris: 'hsl(var(--color-iris) / <alpha-value>)',
      },
      borderColor: {
        DEFAULT: 'hsl(var(--color-muted) / 0.2)',
      },
      ringColor: {
        DEFAULT: 'hsl(var(--color-foam) / 0.2)',
      },
      animation: {
        'marquee-left': 'marquee-left var(--duration, 30s) linear infinite',
        'marquee-up': 'marquee-up var(--duration, 30s) linear infinite',
      },
      keyframes: {
        'marquee-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-up': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
      typography: () => ({
        rosepine: {
          css: {
            '--tw-prose-body': 'var(--color-text)',
            '--tw-prose-headings': 'var(--color-text)',
            '--tw-prose-lead': 'var(--color-text)',
            '--tw-prose-links': 'var(--color-text)',
            '--tw-prose-bold': 'var(--color-text)',
            '--tw-prose-counters': 'var(--color-subtle)',
            '--tw-prose-bullets': 'var(--color-subtle)',
            '--tw-prose-hr': 'var(--color-muted)',
            '--tw-prose-quotes': 'var(--color-text)',
            '--tw-prose-quote-borders': 'hsl(var(--color-muted) / 0.2)',
            '--tw-prose-captions': 'var(--color-text)',
            '--tw-prose-code': 'var(--color-text)',
            '--tw-prose-pre-code': 'var(--color-muted)',
            '--tw-prose-pre-bg': 'var(--color-text)',
            '--tw-prose-th-borders': 'hsl(var(--color-muted) / 0.2)',
            '--tw-prose-td-borders': 'hsl(var(--color-muted) / 0.2)',
            '--tw-prose-invert-body': 'var(--color-muted)',
            '--tw-prose-invert-headings': 'var(--color-base)',
            '--tw-prose-invert-lead': 'var(--color-muted)',
            '--tw-prose-invert-links': 'var(--color-base)',
            '--tw-prose-invert-bold': 'var(--color-base)',
            '--tw-prose-invert-counters': 'var(--color-subtle)',
            '--tw-prose-invert-bullets': 'var(--color-subtle)',
            '--tw-prose-invert-hr': 'var(--color-text)',
            '--tw-prose-invert-quotes': 'var(--color-muted)',
            '--tw-prose-invert-quote-borders': 'var(--color-text)',
            '--tw-prose-invert-captions': 'var(--color-subtle)',
            '--tw-prose-invert-code': 'var(--color-base)',
            '--tw-prose-invert-pre-code': 'var(--color-muted)',
            '--tw-prose-invert-pre-bg': 'var(--color-text)',
            '--tw-prose-invert-th-borders': 'hsl(var(--color-muted) / 0.2)',
            '--tw-prose-invert-td-borders': 'hsl(var(--color-muted) / 0.2)',
          },
        },
      }),
    },
  },
  plugins: [
    scrollbar({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
    animate,
    animated,
    typography,
  ],
} satisfies Config
