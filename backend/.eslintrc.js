module.exports = {
    env: {
      es2021: true,
      node: true,
      jest: true,
    },
    extends: [
      'plugin:sonarjs/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 11,
      sourceType: 'module',
    },
    plugins: [
      '@typescript-eslint',
      'sonarjs',
    ],
    rules: {
      'complexity': ['error', 7]
    }
};