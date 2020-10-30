/* eslint-disable no-undef */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true }, // Allows for the parsing of JSX
  },
  extends: [
    'eslint:recommended', // eslint default rules
    'plugin:@typescript-eslint/eslint-recommended', // eslint TypeScript rules (github.com/typescript-eslint/typescript-eslint)
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended', // eslint react rules (github.com/yannickcr/eslint-plugin-react)
    'plugin:jsx-a11y/recommended', // accessibility plugin

    // Prettier plugin and recommended rules
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off', // We turn off prop-types rule, as we will use TypeScript's types instead.

    // Include .prettierrc.js rules
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
  globals: {
    React: 'writable',
  },
};
