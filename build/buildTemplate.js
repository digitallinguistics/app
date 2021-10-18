import { readFile } from 'fs/promises';

/**
 * Compiles a single Handlebars template file.
 * @param   {Object} hbs      The Handlebars instance.
 * @param   {String} filePath The path to the Handlebars template to compile.
 * @returns {Promise<String>} Resolves to an HTML String.
 */
export default async function buildTemplate(hbs, filePath) {
  const template  = await readFile(filePath, `utf8`);
  const buildHTML = hbs.compile(template);
  return buildHTML();
}
