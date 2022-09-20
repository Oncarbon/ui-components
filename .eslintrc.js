module.exports = {
  ignorePatterns: [
    // The eslint config itself. Needed for vscode-eslint extension
    ".eslintrc.js",
  ],
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  env: {
    node: true,
  },
  rules: {
    "import/no-unresolved": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          ["builtin", "external"],
          "internal",
          ["parent", "index", "sibling"],
          "object",
          "type",
        ],
        "newlines-between": "always",
      },
    ],
  },
};
