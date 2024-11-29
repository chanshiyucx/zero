import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import scrollbar from 'tailwind-scrollbar'
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
    },
  },
  plugins: [
    scrollbar({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
    animated,
    typography,
  ],
} satisfies Config
