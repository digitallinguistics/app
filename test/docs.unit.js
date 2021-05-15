import { expect }        from 'chai';
import { fileURLToPath } from 'url';
import fs                from 'fs-extra';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const { readFile } = fs;

const currentDir  = getDirname(fileURLToPath(import.meta.url));
const currentYear = new Date().getFullYear();

describe('license', function() {

  it('has the correct year', async function() {

    const license     = await readFile(joinPath(currentDir, '../LICENSE'), 'utf8');
    const { year }    = license.match(/\(c\) (?<year>\d{4})/u).groups;

    expect(Number(year)).to.equal(currentYear);

  });

});

describe('readme', function() {

  it('has the correct year', async function() {

    const readme   = await readFile(joinPath(currentDir, '../README.md'), 'utf8');
    const { year } = readme.match(/W. (?<year>\d{4})\./u).groups;

    expect(Number(year)).to.equal(currentYear);

  });

});
