#!/usr/bin/env zx

const { $, fs, argv } = require("zx");
// import newGithubReleaseUrl from "new-github-release-url";

const isDryRun = !!argv["dry-run"];

const newVersion = argv._[1];
if (!newVersion) {
  console.error("ERR: Give new version as a parameter:");
  console.error("ERR: npm run prerelease <major|minor|patch>");
  process.exit(2);
}

console.log("Verifying...");
const isCleanCmdOutput = await $`git status --porcelain`;
if (isCleanCmdOutput.stdout !== "") {
  console.error("ERR: Working tree is not clean");
  process.exit(2);
}

console.log("Cleaning...");
await $`npm run clean`;

console.log("Running tests...");
await $`npm run test`;

console.log("Bumping package versions...");
await $`npm version -w ./packages/ui-components -w ./packages/ui-components-angular ${newVersion}`;

const mainPkgJson = JSON.parse(fs.readFileSync("./packages/ui-components/package.json"));
const newVersionGitTag = `v${mainPkgJson.version}`;

const doesTagExist = await $`git tag -l ${newVersionGitTag}`;
if (doesTagExist.stdout !== "") {
  console.error(`ERR: Tag ${newVersionGitTag} already exists`);
  process.exit(2);
}

const toUpdate = ["ui-components-angular", "ui-components-react"];
for (const pkgToUpdate of toUpdate) {
  console.log(
    `Updating ${pkgToUpdate} dependency to @oncarbon/ui-components@${mainPkgJson.version}`,
  );
  const file = path.join("packages", pkgToUpdate, "package.json");
  const pkgJson = JSON.parse(fs.readFileSync(file, "utf8"));
  pkgJson["dependencies"]["@oncarbon/ui-components"] = mainPkgJson.version;
  fs.writeFileSync(file, JSON.stringify(pkgJson, null, 2) + "\n");
}

// This needs to run AFTER the package versions have been bumped,
// because the build for the angular package copies its package.json
// into the build directory
console.log("Building packages");
await $`npm run build`;

console.log("Updating changelog");
await $`npm run changelog`;

// Get the changelog
// Diff with 0 lines surrounding the diff, skip first 6 lines and remove first character on each line
const getChangelogCmdOutput =
  await $`git diff --unified=0 --no-color  CHANGELOG.md | tail -n +6 | cut -c 2-`;

const changelog = getChangelogCmdOutput.stdout;

if (!isDryRun) {
  console.log(`Commiting new version ${newVersionGitTag}`);
  await $`git add .`;
  await $`git commit -m ${newVersionGitTag}`;

  console.log(`Tagging new version ${newVersionGitTag}`);
  await $`git tag ${newVersionGitTag} -m ${changelog}`;
} else {
  console.log("Dry run, not committing or tagging");
}

// TODO: Create GH release
// const url = newGithubReleaseUrl({
//   user: "oncarbon",
//   repo: "ui-components",
//   body: changelog,
// });

// await $`open ${url}`;

console.log(`Prerelease DONE!`);
