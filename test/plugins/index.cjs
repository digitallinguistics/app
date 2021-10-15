const { build }         = require(`esbuild`);
const esbuildPluginLESS = require(`../../build/esbuildPluginLESS.cjs`);

module.exports = (on, config) => {
  on(`file:preprocessor`, async ({ filePath, outputPath }) => {

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
