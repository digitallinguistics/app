import createSpriteCollection from 'svgstore';
import { fileURLToPath }      from 'url';
import fs                     from 'fs-extra';
import recurse                from 'readdirp';

const {
  readFile,
  writeFile,
} = fs;

import {
  basename as getBasename,
  dirname  as getDirname,
  extname  as getExt,
  join     as joinPath,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));
const imagesPath = joinPath(currentDir, `../src/images`);
const spritePath = joinPath(currentDir, `../dist/sprites.svg`);

const disallowList = [`favicon`];

const spriteOptions = {
  svgAttrs: {
    'aria-hidden': true,
    style:         `display: none;`,
  },
};

/* eslint-disable max-statements */
export default async function buildSVG() {

  const sprites        = createSpriteCollection(spriteOptions);
  const svgFilesStream = await recurse(imagesPath);

  for await (const entry of svgFilesStream) {

    const ext      = getExt(entry.basename);
    const filename = getBasename(entry.basename, ext);

    if (ext !== `.svg`) continue;
    if (disallowList.includes(filename)) continue;

    const filePath = joinPath(imagesPath, entry.path);
    const svg      = await readFile(filePath, `utf8`);

    sprites.add(filename, svg);

  }

  await writeFile(spritePath, sprites.toString({ inline: true }));

}
