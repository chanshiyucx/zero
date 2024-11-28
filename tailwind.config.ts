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
  plugins: [
    scrollbar({
      nocompatible: true,
      preferredStrategy: 'pseudoelements',
    }),
    animated,
    typography,
  ],
} satisfies Config
