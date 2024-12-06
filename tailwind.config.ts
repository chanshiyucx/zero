import type { Config } from 'tailwindcss'
import type { PluginUtils } from 'tailwindcss/types/config'
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
        sans: ['var(--font-merriweather)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-fira)', ...defaultTheme.fontFamily.mono],
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
        'spinner-scale':
          'spinner-scale var(--duration, 30s) var(--delay, 30s) cubic-bezier(0.2, 0.68, 0.18, 1.08) infinite',
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
        'spinner-scale': {
          '0%': { transform: 'scaley(1.0)' },
          '50%': { transform: 'scaley(0.4)' },
          '100%': { transform: 'scaley(1.0)' },
        },
      },
      typography: ({ theme }: PluginUtils) => ({
        rosepine: {
          css: {
            '--tw-prose-body': theme('colors.text / 1'),
            '--tw-prose-headings': theme('colors.text / 1'),
            '--tw-prose-lead': theme('colors.text / 1'),
            '--tw-prose-links': theme('colors.iris / 1'),
            '--tw-prose-bold': theme('colors.text / 1'),
            '--tw-prose-counters': theme('colors.subtle / 1'),
            '--tw-prose-bullets': theme('colors.subtle / 1'),
            '--tw-prose-hr': theme('colors.muted / 1'),
            '--tw-prose-quotes': theme('colors.text / 1'),
            '--tw-prose-quote-borders': theme('colors.muted / 0.2'),
            '--tw-prose-captions': theme('colors.text / 1'),
            '--tw-prose-code': theme('colors.rose / 1'),
            '--tw-prose-pre-code': theme('colors.muted / 1'),
            '--tw-prose-pre-bg': theme('colors.surface / 1'),
            '--tw-prose-th-borders': theme('colors.muted / 0.2'),
            '--tw-prose-td-borders': theme('colors.muted / 0.2'),

            // invert mode
            '--tw-prose-invert-body': theme('colors.text / 1'),
            '--tw-prose-invert-headings': theme('colors.text / 1'),
            '--tw-prose-invert-lead': theme('colors.text / 1'),
            '--tw-prose-invert-links': theme('colors.iris / 1'),
            '--tw-prose-invert-bold': theme('colors.text / 1'),
            '--tw-prose-invert-counters': theme('colors.subtle / 1'),
            '--tw-prose-invert-bullets': theme('colors.subtle / 1'),
            '--tw-prose-invert-hr': theme('colors.muted / 1'),
            '--tw-prose-invert-quotes': theme('colors.text / 1'),
            '--tw-prose-invert-quote-borders': theme('colors.muted / 0.2'),
            '--tw-prose-invert-captions': theme('colors.text / 1'),
            '--tw-prose-invert-code': theme('colors.rose / 1'),
            '--tw-prose-invert-pre-code': theme('colors.muted / 1'),
            '--tw-prose-invert-pre-bg': theme('colors.surface / 1'),
            '--tw-prose-invert-th-borders': theme('colors.muted / 0.2'),
            '--tw-prose-invert-td-borders': theme('colors.muted / 0.2'),
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
