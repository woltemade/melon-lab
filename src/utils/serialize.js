const isBigNumber = candidate =>
  candidate.c !== undefined &&
  candidate !== undefined &&
  candidate.s !== undefined;

const serialize = obj =>
  Object.keys(obj)
    .map(key => [key, isBigNumber(obj[key]) ? obj[key].toString() : obj[key]])
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: obj[key],
      }),
      {},
    );

export default serialize;
