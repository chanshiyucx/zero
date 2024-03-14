import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-serif)', ...defaultTheme.fontFamily.sans],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            '--tw-prose-headings': 'var(--font-color)',
            '--tw-prose-links': 'var(--theme-color)',
            '--tw-prose-code': 'var(--theme-color)',
            '--tw-prose-quote-borders': 'var(--theme-color)',
            '--tw-prose-pre-bg': 'rgba(0, 0, 0, 0.04)',
          },
        },
      }),
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
