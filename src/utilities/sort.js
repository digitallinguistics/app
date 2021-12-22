/**
 * A comparator function (to be used with `sort()`) which sorts strings case-insensitively.
 * @param {String}
 * @param {String}
 * @returns Integer
 */
export default function sort(a, b) {
  return a.localeCompare(b, undefined, { sensitivity: `base` });
}
