module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'sonarjs',
    '@typescript-eslint',
    'no-secrets',
    'simple-import-sort',
    'import',
    'unicorn',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-secrets/no-secrets': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    '@typescript-eslint/ban-ts-comment': 0,
    'react/react-in-jsx-scope': 'off',
  },
};
