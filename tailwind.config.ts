import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
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
        lg: '1024px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-serif)', ...defaultTheme.fontFamily.sans],
        courier: 'var(--font-courier)',
        anton: 'var(--font-anton)',
      },
      backgroundImage: {
        light: "url('../assets/images/bg-light.svg')",
        dark: "url('../assets/images/bg-dark.svg')",
      },
      listStyleType: {
        square: 'square',
      },
    },
  },
  plugins: [typography],
} satisfies Config
