#!/usr/bin/env zx

const { $, fs } = require("zx");
import newGithubReleaseUrl from "new-github-release-url";

$.verbose = false;

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

console.log("Bumping package versions");
await $`npm version -w ./packages/ui-components -w ./packages/ui-components-angular ${newVersion}`;

const toUpdate = ["ui-components-angular"];
const mainPkgJson = JSON.parse(fs.readFileSync("./packages/ui-components/package.json"));

for (const pkgToUpdate of toUpdate) {
  console.log(
    `Updating ${pkgToUpdate} dependency to @oncarbon/ui-components@${mainPkgJson.version}`,
  );
  const file = path.join("packages", pkgToUpdate, "package.json");
  const pkgJson = JSON.parse(fs.readFileSync(file, "utf8"));
  pkgJson["dependencies"]["@oncarbon/ui-components"] = mainPkgJson.version;
  fs.writeFileSync(file, JSON.stringify(pkgJson, null, 2) + "\n");
}

console.log("Updating changelog");
await $`npm run changelog`;

// Get the changelog
// Diff with 0 lines surrounding the diff, skip first 6 lines and remove first character on each line
const getChangelogCmdOutput =
  await $`git diff --unified=0 --no-color  CHANGELOG.md | tail -n +6 | cut -c 2-`;

const newVersioNumber = `v${mainPkgJson.version}`;
const changelog = getChangelogCmdOutput.stdout;

console.log(`Commiting new version ${newVersioNumber}`);
await $`git add .`;
await $`git commit -m ${newVersioNumber}`;

console.log(`Tagging new version ${newVersioNumber}`);
await $`git tag ${newVersioNumber} -m ${changelog}`;

const url = newGithubReleaseUrl({
  user: "oncarbon",
  repo: "ui-components",
  body: changelog,
});

await $`open ${url}`;

console.log(`Prerelease DONE. Review the changes with 'git log' and push to remote:`);
console.log(`git push`);
console.log(`git push --tags`);
