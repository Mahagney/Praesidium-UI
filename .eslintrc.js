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
    'no-param-reassign': [2, { props: false }],
    'spaced-comment': 'off',
    'dot-notation': 'off',
    'no-debugger': 'off',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    'react/prop-types': 'warn',
    'react/display-name': 'off',
    'prefer-template': 'off',
    'no-debugger': 'off',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'react/prop-types': 'warn',
    'react/display-name': 'off',
    eqeqeq: 'off',
  },
};
