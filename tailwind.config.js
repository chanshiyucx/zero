import typography from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      screens: {
        lg: '1024px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-serif)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        light: "url('../assets/images/bg-light.svg')",
        dark: "url('../assets/images/bg-dark.svg')",
      },
      colors: {
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [typography],
}
