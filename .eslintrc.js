module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
}
