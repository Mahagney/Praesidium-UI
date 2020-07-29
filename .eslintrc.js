module.exports = {
  extends: [
    'plugin:react/recommended',
    'airbnb-base',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'spaced-comment': 'off',
    'no-debugger': 'off',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'react/prop-types': 'warn',
    'react/display-name': 'off',
  },
};
