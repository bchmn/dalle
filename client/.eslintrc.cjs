module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'solid',
  ],
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:solid/typescript'
  ],
  rules: {
    "prettier/prettier": ["error"],
    "@typescript-eslint/no-unsafe-return": "off"
  },
  env: {
    node: true
  },
};
