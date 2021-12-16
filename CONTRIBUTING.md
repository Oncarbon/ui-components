# Contribution guide

## Publishing a new release

1. Run the prerelease script

The new version is given as a parameter. It can be e.g. major, minor or patch.

```bash
npm run prerelease <new-version>
```

2. Review the changes and push to remote

```bash
git log
git push
git push --tags
```

3. Publish workflow in Github will create new releases for each package
