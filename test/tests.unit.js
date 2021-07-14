/**
 * General unit tests not relevant to any specific component or the app shell. Tests focused on the development environment or documentation should go here.
 */

import { expect }        from 'chai';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import semver            from 'semver';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const { readFile } = fs;

const currentDir = getDirname(fileURLToPath(import.meta.url));

describe(`docs`, function() {

  const currentYear = new Date().getFullYear();

  it(`license has the correct year`, async function() {

    const license     = await readFile(joinPath(currentDir, `../LICENSE`), `utf8`);
    const { year }    = license.match(/\(c\) (?<year>\d{4})/u).groups;

    expect(Number(year)).to.equal(currentYear);

  });

  it(`README has the correct year`, async function() {

    const readme   = await readFile(joinPath(currentDir, `../README.md`), `utf8`);
    const { year } = readme.match(/W. (?<year>\d{4})\./u).groups;

    expect(Number(year)).to.equal(currentYear);

  });

});

describe(`Node version`, function() {

  it(`matches Node version in package.json`, async function() {

    const { version: localVersion } = process;
    const packageJSONPath           = joinPath(currentDir, `../package.json`);
    const packageJSON               = JSON.parse(await readFile(packageJSONPath, `utf8`));
    const packageVersion            = semver.minVersion(packageJSON.engines.node);

    expect(semver.gte(localVersion, packageVersion)).to.equal(true);

  });

});
