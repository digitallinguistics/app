import { fileURLToPath } from 'url';
import handler           from 'serve-handler';
import http              from 'http';

import {
  dirname as getDirname,
  join    as joinPath,
} from 'path';

const currentDir = getDirname(fileURLToPath(import.meta.url));
const distDir    = joinPath(currentDir, `./dist`);

export default function startServer() {

  const port   = 3000 || process.env.PORT;
  const server = http.createServer((req, res) => handler(req, res, { public: distDir }));

  server.listen(port, () => console.info(`Server started on port ${ port }. Press Ctrl+C to terminate.`));
  server.on(`error`, console.error);

}
