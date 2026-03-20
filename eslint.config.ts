import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import reactPlugin from 'eslint-plugin-react'
import reactCompilerPlugin from 'eslint-plugin-react-compiler'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: [
      '**/.next/**',
      '**/out/**',
      '**/dist/**',
      '**/node_modules/**',
      '**/.content-collections/**',
      'next-env.d.ts',
    ],
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },

  {
    ...js.configs.recommended,
    files: ['**/*.{ts,tsx}'],
  },
  ...tseslint.configs.recommendedTypeChecked.map((conf) => ({
    ...conf,
    files: ['**/*.{ts,tsx}'],
  })),

  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-compiler': reactCompilerPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.flat?.recommended?.rules,
      ...reactPlugin.configs.flat?.['jsx-runtime']?.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'react-compiler/react-compiler': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['**/*.config.{js,ts,mjs}', 'eslint.config.ts'],
    ...tseslint.configs.disableTypeChecked,
  },
]
