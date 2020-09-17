import { List } from 'immutable';

const isMergeable = a =>
  a &&
  typeof a === 'object' &&
  typeof a.mergeWith === 'function' &&
  !List.isList(a);

/**
 * In our version of immutable.js When mergingDeep Lists are
 * concatenated instead of replacing the list.
 * This problematic because we end up with duplicate values.
 * When we fetch new data, we want it to take precedence.
 *
 * Implementation copied from https://github.com/immutable-js/immutable-js/issues/1452#issuecomment-386162309
 *
 * @param a the existing object
 * @param b the new object to merge with that will take precedence
 * @return {*}
 */
export const mergeDeepOverwriteLists = (a, b) => {
  // If b is null, it would overwrite a, even if a is mergeable
  if (b === null) return b;

  if (isMergeable(a) && !List.isList(a)) {
    return a.mergeWith(mergeDeepOverwriteLists, b);
  }

  return b;
};
