// This config is cascaded automatically with the base config in the repo root:
// https://eslint.org/docs/user-guide/configuring/configuration-files#cascading-and-hierarchy
module.exports = {
  ignorePatterns: [
    // The eslint config itself. Needed for vscode-eslint extension
    ".eslintrc.js",
    "src/components/stencil-generated/**/*",
  ],
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
};
