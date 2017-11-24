const isBigNumber = candidate =>
  candidate.c !== undefined &&
  candidate !== undefined &&
  candidate.s !== undefined;

const serialize = obj =>
  Object.entries(obj)
    .map(([key, value]) => [key, isBigNumber(value) ? value.toString() : value])
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {},
    );

export default serialize;
