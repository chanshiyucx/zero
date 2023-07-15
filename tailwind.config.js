import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
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
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
