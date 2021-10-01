module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'react-app',
    'react-app/jest',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
  ],
  rules: {
    'react/prop-types': 'off',
    'no-console': [2],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx'],
    }],
    'object-curly-newline': ['error', {
      ObjectExpression: 'always',
      ObjectPattern: {
        multiline: true,
      },
      ImportDeclaration: 'never',
      ExportDeclaration: {
        multiline: true, minProperties: 3,
      },
    }],
    'import/prefer-default-export': 'off',
  },
};
