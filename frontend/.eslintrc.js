module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  parserOptions: {
    project: 'tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'react', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/unbound-method': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-shadow': 1,
    '@typescript-eslint/naming-convention': 0,
    'import/no-anonymous-default-export': 0,
    'import/no-unresolved': 0,
    'react/destructuring-assignment': 1,
    'react/require-default-props': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/no-unescaped-entities': 0,
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    'class-methods-use-this': 0,
    'multiline-ternary': 0,
    'react/no-array-index-key': 0,
    // Sort imports
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    camelcase: 2,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/space-before-function-paren': 0,
    'no-nested-ternary': 1,
    'no-param-reassign': 2,
    'no-empty-pattern': 1,
    'no-shadow': 0,
    'prettier/prettier': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true
        }
      }
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      { allowExpressions: true, allowTypedFunctionExpressions: true }
    ]
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // Packages `react` related packages come first.
              ['^react', '^@?\\w'],
              // Internal packages.
              ['^(@|components)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$']
            ]
          }
        ]
      }
    }
  ]
}
