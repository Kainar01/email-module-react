module.exports = {
  env: {
    // node: true, -- not needed, airbnb has covered
    // es6: true, -- not needed, airbnb has covered
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  // parser: "@typescript-eslint/parser", -- not needed, "plugin:@typescript-eslint/recommended" has added
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'import', 'unused-imports'],
  rules: {
    // https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined/64024916#64024916
    'no-use-before-define': 'off',
    // https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
    'no-shadow': 'off',
    'no-param-reassign': ['error', { props: false }],
    'max-len': ['error', { code: 100, ignoreComments: true }],
    'no-unused-vars': 'off',

    '@typescript-eslint/no-use-before-define': ['error'],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.tsx'],
      },
    ],
    // https://stackoverflow.com/questions/63696724/eslint-problem-with-default-props-in-functional-component-typescript-react
    'react/prop-types': 'off',
    'react/require-default-props': 'off',

    // https://github.com/benmosher/eslint-plugin-import/issues/1453
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '~/**',
            group: 'external',
            position: 'after',
          },
        ],
        groups: ['builtin', 'external', 'internal', 'unknown'],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['~/features/*/*'],
      },
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  // overrides: [
  //   {
  //     files: [
  //       '**/*.test.js',
  //       '**/*.test.jsx',
  //       '**/*.test.tsx',
  //       '**/*.spec.js',
  //       '**/*.spec.jsx',
  //       '**/*.spec.tsx',
  //     ],
  //     env: {
  //       jest: true,
  //     },
  //   },
  // ],
};
