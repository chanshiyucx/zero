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
            '--tw-prose-pre-bg': 'rgba(0, 0, 0, .04)',
            img: {
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '1rem',
            },
            'code::before': {
              display: 'none',
            },
            'code::after': {
              display: 'none',
            },
            'p, li': {
              textAlign: 'justify',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
