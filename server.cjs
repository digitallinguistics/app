const handler            = require(`serve-handler`);
const http               = require(`http`);
const { join: joinPath } = require(`path`);

const distDir = joinPath(__dirname, `./dist`);

module.exports = function startServer() {

  const port   = 3000 || process.env.PORT;
  const server = http.createServer((req, res) => handler(req, res, { public: distDir }));

  server.listen(port, () => console.info(`Server started on port ${ port }. Press Ctrl+C to terminate.`));
  server.on(`error`, console.error);

  return server;

}
