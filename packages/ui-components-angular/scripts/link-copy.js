/**
 * Script adopted from https://github.com/ionic-team/ionic-framework/
 * MIT License (c) Copyright 2015-present Drifty Co.
 */
const fs = require("fs-extra");
const path = require("path");

let prjDir = process.argv[2];
if (!prjDir) {
  throw new Error('local path required as last argument to "npm run build.link" command');
}
prjDir = path.join(__dirname, "../../../", prjDir);

copyPackage(prjDir, "ui-components-angular");
copyPackage(prjDir, "ui-components");

function copyPackage(prjDir, pkgName) {
  const prjDest = path.join(prjDir, "node_modules", "@oncarbon", pkgName);

  const pkgSrcDir = path.join(__dirname, "..", "..", pkgName);
  const pkgSrcDist = path.join(pkgSrcDir, "dist");
  const pkgJsonPath = path.join(pkgSrcDir, "package.json");
  const pkgJson = require(pkgJsonPath);

  // make sure this local project exists
  fs.emptyDirSync(prjDest);

  let srcDir;
  if (!pkgJson.files) {
    srcDir = pkgSrcDist;
    pkgJson.files = fs.readdirSync(pkgSrcDist);
  } else {
    srcDir = pkgSrcDir;
    pkgJson.files.push("package.json");
  }

  pkgJson.files.forEach((f) => {
    const src = path.join(srcDir, f);
    const dest = path.join(prjDest, f);

    console.log("copying:", src, "to", dest);
    fs.copySync(src, dest);
  });

  const prjReadme = path.join(prjDest, "README.md");
  console.log("readme:", prjReadme);

  fs.writeFileSync(
    prjReadme,
    "@oncarbon/" + pkgName + " copied from " + pkgSrcDir + ", " + new Date(),
  );
}
