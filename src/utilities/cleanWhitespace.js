export default function cleanWhitespace(str) {
  return str
  .trim()
  .replace(/\s{2,}/gu, ` `)
  .replace(/\s/gu, ` `);
}
