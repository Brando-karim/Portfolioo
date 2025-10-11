import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // This object contains rule overrides or new rule definitions
    rules: {
      // Enforces a consistent indentation style
      indent: ["error", 2],
      
      // Enforces the use of `const` for variables that are never reassigned
      "prefer-const": "error",
      
      // Disallows unused variables
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      
      // Overrides the inherited Next.js behavior for `next/no-img-element` to be a warning
      "next/no-img-element": "warn",
      
      // Disallows the use of explicit `any` types (common when adding custom TypeScript rules)
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Disallows console statements in production builds
      "no-console": "warn",
    },
  },
  {
    // Ignores specific files and directories
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
