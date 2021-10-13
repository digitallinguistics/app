import convertLESS  from './convertLESS.js';
import { readFile } from 'fs/promises';

export default {
  name: `less-file`,
  setup(build) {

    build.onLoad({ filter: /\.less$/u }, async args => {

      const less = await readFile(args.path, `utf8`);
      const css  = await convertLESS(less);

      return {
        contents: css,
        loader:   `text`,
      };

    });

  },
};
