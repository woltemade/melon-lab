import cacheAwait from "../../../lib/utils/cacheAwait";

const wait = async arg =>
  new Promise(resolve => global.setTimeout(() => resolve(arg), 100));

it("caches await", async () => {
  const start = new Date();
  const cachedWait = cacheAwait(wait);

  const firstResult = await cachedWait("a");
  const afterFirstExectution = new Date();
  expect(firstResult).toEqual("a");
  expect(afterFirstExectution - start).toBeGreaterThanOrEqual(100);

  const secondResult = await cachedWait("a");
  const afterSecondExectution = new Date();
  expect(secondResult).toEqual("a");
  expect(afterSecondExectution - afterFirstExectution).toBeLessThan(100);

  const withoutAwait = cachedWait("a");
  expect(withoutAwait instanceof Promise).toBeTruthy();

  const withOtherArgs = await cachedWait("b");
  const afterOtherArgs = new Date();
  expect(withOtherArgs).toEqual("b");
  expect(afterOtherArgs - afterSecondExectution).toBeGreaterThanOrEqual(100);
});
