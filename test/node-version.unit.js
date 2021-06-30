import { expect }        from 'chai';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';
import semver            from 'semver';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const { readFile } = fs;
const currentDir   = getDirname(fileURLToPath(import.meta.url));
const packageJSON  = JSON.parse( await readFile(joinPath(currentDir, '../package.json'), 'utf8'));
const packageVer   = semver.minVersion(packageJSON.engines.node);

describe('active Node version', function() {

  it('matches Node version in package.json', function() {

    const localVer = process.version;

    expect(semver.gte(localVer, packageVer)).to.equal(true);

  });

});
