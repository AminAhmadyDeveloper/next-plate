import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const baseConfig = [
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
];

const config = tslint.config(
  eslint.configs.recommended,
  ...pluginQuery.configs['flat/recommended'],
  ...tslint.configs.recommended,
  ...baseConfig,
);

export default config;
