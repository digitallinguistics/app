import { readFile } from 'fs/promises';
import recurse      from 'readdirp';

import {
  basename as getBasename,
  extname  as getExt,
} from 'path';

export default async function registerPartials(hbs, dir) {

  const files = recurse(dir, { fileFilter: `*.hbs` });

  for await (const entry of files) {

    const ext           = getExt(entry.basename);
    const componentName = getBasename(entry.basename, ext);
    const template      = await readFile(entry.fullPath, `utf8`);

    hbs.registerPartial(componentName, template);

  }

}
