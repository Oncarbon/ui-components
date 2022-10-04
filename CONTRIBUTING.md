# Contribution guide

## Development workflow

`npm run dev` runs concurrently the following tasks:

- Watch and build the ui components
- Watch, build and start a dev server for the plain JS usage test (see `INFO: Accepting connections at` line in the command output)
- Watch, build and start a dev server for the React usage test

## Committing changes

This repository follows [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). `npm run commit` can be used to generate a valid commit message.

## Publishing a new release

1. Run the publish workflow manually in Github https://github.com/Oncarbon/ui-components/actions/workflows/publish.yml
