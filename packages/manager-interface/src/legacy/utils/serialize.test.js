import BigNumber from "bignumber.js";
import serialize from "./serialize";

it("happy path", () => {
  const toSerialize = {
    asdf: 123,
    qwer: "aqwer",
    b: new BigNumber("0.234"),
    q: new BigNumber(2222),
  };

  const serialized = serialize(toSerialize);

  const expected = {
    asdf: 123,
    qwer: "aqwer",
    b: "0.234",
    q: "2222",
  };

  expect(serialized).toMatchObject(expected);
});
