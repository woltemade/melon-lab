import { mergeAll } from "ramda";

const resolvePromiseObject = async obj => {
  const promises = Object.keys(obj).map(
    key =>
      obj[key] instanceof Promise
        ? obj[key].then(resolved => ({ [key]: resolved }))
        : new Promise(resolve => resolve({ [key]: obj[key] }))
  );

  const resolved = await Promise.all(promises);
  return mergeAll(resolved);
};

export default resolvePromiseObject;
