import { Config } from "@stencil/core";

export const config: Config = {
  namespace: "Oncarbon",
  preamble: "(C) Oncarbon https://oncarbon.app - MIT",
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    {
      type: "dist-custom-elements-bundle",
    },
    {
      type: "docs-readme",
    },
    {
      type: "stats",
      file: "stats.json",
    },
    {
      type: "docs-readme",
      strict: true,
    },
    // {
    //   type: "docs-json",
    //   file: "../docs/core.json",
    // },
  ],
  testing: {
    // Fix to prevent jest from transpiling certain node_modules:
    // https://github.com/ionic-team/stencil/issues/2129
    transform: {
      "^.+\\.(ts|tsx|js|jsx|css)$": "@stencil/core/testing/jest-preprocessor",
    },
    transformIgnorePatterns: ["node_modules/(?!(@popperjs)/)"],
  },
};
