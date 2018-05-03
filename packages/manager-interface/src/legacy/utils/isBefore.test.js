import isBefore from "./isBefore";

const path = {
  P01: "p01",
  P02: "p02",
  P03: "p03",
  P04: "p04",
};

it("Same entry isnt before", () => {
  expect(isBefore(Object.values(path), path.P01, path.P01)).toEqual(false);
  expect(isBefore(Object.values(path), path.P02, path.P02)).toEqual(false);
  expect(isBefore(Object.values(path), path.P04, path.P04)).toEqual(false);
});

it("Happy path", () => {
  expect(isBefore(Object.values(path), path.P01, path.P02)).toEqual(true);
  expect(isBefore(Object.values(path), path.P02, path.P04)).toEqual(true);
  expect(isBefore(Object.values(path), path.P01, path.P03)).toEqual(true);
});

it("Isnt Before", () => {
  expect(isBefore(Object.values(path), path.P02, path.P01)).toEqual(false);
  expect(isBefore(Object.values(path), path.P04, path.P02)).toEqual(false);
  expect(isBefore(Object.values(path), path.P03, path.P01)).toEqual(false);
});

it("Wrong args", () => {
  expect(isBefore(Object.values(path), undefined, path.P01)).toEqual(undefined);
  expect(isBefore(Object.values(path), path.P04, null)).toEqual(undefined);
  expect(isBefore(Object.values(path), path.P03, "BLUB")).toEqual(undefined);
});
