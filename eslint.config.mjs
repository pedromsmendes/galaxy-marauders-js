import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import perfectionist from 'eslint-plugin-perfectionist'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // importPlugin.flatConfigs.recommended,
  {
    ignores: ["webpack.config.js"],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      perfectionist,
    },
    rules: {
      "no-console": ["warn", { allow: ["info", "error"] }],
      "@typescript-eslint/no-unsafe-function-type": 0,
      "perfectionist/sort-imports": [
        "error",
        {
          order: 'asc',
          type: 'line-length'
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error", {
          "vars": "all",
          "args": "after-used",
          "ignoreRestSiblings": false,
          "varsIgnorePattern": "^_", // Ignore variables starting with '_'
          "argsIgnorePattern": "^_"  // Ignore function arguments starting with '_'
        }
      ],
    },
  },
];