const { build }         = require(`esbuild`);
const esbuildPluginLESS = require(`../../build/esbuildPluginLESS.cjs`);
const { watch } = require(`fs`);

module.exports = (on, config) => {
  on(`file:preprocessor`, async file => {

    const { filePath, outputPath, shouldWatch } = file;

    if (shouldWatch) {
      const watcher = watch(filePath, () => file.emit(`rerun`));
      file.on(`close`, () => watcher.close());
    }

    await build({
      bundle:      true,
      entryPoints: [filePath],
      format:      `cjs`,
      outfile:     outputPath,
      plugins:     [esbuildPluginLESS],
    });

    return outputPath;

  });
};
