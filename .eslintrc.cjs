const { defineConfig } = require('eslint-define-config');
module.exports = defineConfig({
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'react-app',
    'prettier',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx'],
      },
    },
  },
  plugins: ['react-refresh', 'react', 'jsx-a11y', 'react-hooks', 'import', 'prettier'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/function-component-definition': [1, { namedComponents: 'arrow-function' }],
    'no-param-reassign': 'off',
    'spaced-comment': 'off',
    'import/no-anonymous-default-export': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'object-curly-newline': 'off',
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    indent: 'off',
    'prettier/prettier': 'off',
    'onsistent-return': 'off',
    'default-case': 'off',
    'import/no-named-as-default': 'off',
    'consistent-return': 'off',
    'react/prop-types': 'off',
    'no-lonely-if': 'off',
    'function-paren-newline': 'off',
    'operator-linebreak': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-plusplus': 'off',
    'no-return-assign': 'off',
    'import/order': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-curly-newline': 'off',
    'react-refresh/only-export-components': 'off',
    'import/extensions': 'off',
  },
});
