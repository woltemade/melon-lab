// @flow
import { toString } from 'ramda';

/**
 * Create an in-memory cache for the execution of an async function for
 * each set of parameters. Cache hit/index defined by `toString(args)`
 */
const cacheAwait = (asyncFunction: Function): Function => {
  const cache = new Map();

  return async (...args: any) => {
    const key = toString(args);

    if (cache.has(key)) return cache.get(key);
    const result = await asyncFunction(...args);
    cache.set(key, result);
    return result;
  };
};

export default cacheAwait;
