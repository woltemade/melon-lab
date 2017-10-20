import { toString } from "ramda";

const cacheAwait = asyncFunction => {
  const cache = new Map();

  return async (...args) => {
    const key = toString(args);

    if (cache.has(key)) return cache.get(key);
    const result = await asyncFunction(...args);
    cache.set(key, result);
    return result;
  };
};

export default cacheAwait;
