module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    // fixable rules
    curly: [2, 'all'],
    semi: [2, 'never'],
    quotes: [2, 'single', { avoidEscape: true }],
    'sort-imports': 0,
    'import/order': 0,
    'simple-import-sort/imports': 0,
    'simple-import-sort/exports': 0,
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
    'import/no-extraneous-dependencies': 2,
    // compatible with other tools like prettier and so on
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
      },
    ],
    // to use requires in tests
    '@typescript-eslint/no-var-requires': 'off',
  },
}
