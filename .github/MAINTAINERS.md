# Maintainer Guidelines

This document provides guidelines specific to maintainers.

## Workflow

1. Develop on an issue branch.
2. Open a PR for the changes.
3. GitHub Actions automatically deploys PRs to staging environments for testing.
   - GH Actions posts a link to the staging URL on the PR.
4. Maintainer reviews PR and changes are made as necessary.
5. PR is merged directly into `main` branch.
6. `main` is occasionally tagged for release.
7. GitHub Actions deploys to production.

## Versioning

* `major`: pages are added or undergo drastic changes
* `minor`: new features are added/removed
* `patch`: fixes / documentation

## Release Checklist

- [ ] Bump version number.
- [ ] Publish a GitHub release.
- [ ] Test the new changes on production.

## Supported Browsers

Lotus should support desktop versions of the following browsers. The app is not intended for mobile use.

* Chrome
* Edge
* Firefox
* Safari
