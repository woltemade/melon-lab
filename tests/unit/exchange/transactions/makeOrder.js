import BigNumber from "bignumber.js";
import makeOffer from "../../../../lib/exchange/transactions/makeOffer";

/* eslint-disable global-require */
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));
jest.mock("../../../../lib/universe/calls/getConfig", () =>
  require("../../../mocks/getConfig"),
);
/* eslint-enable */

test("make an order", async () => {
  const result = await makeOffer(
    new BigNumber(1),
    "MLN-T",
    new BigNumber(0.3),
    "ETH-T",
  );

  expect(result).toBeTruthy();
  expect(result.id).toBe(1);
  expect(result.isActive).toBe(true);
  expect(result.timestamp).toBe(123);
  expect(result.sell.howMuch).toBeInstanceOf(BigNumber);
  expect(result.sell.howMuch.toNumber()).toBe(1);
  expect(result.sell.symbol).toBe("MLN-T");
  expect(result.buy.howMuch).toBeInstanceOf(BigNumber);
  expect(result.buy.howMuch.toNumber()).toBe(0.3);
  expect(result.buy.symbol).toBe("ETH-T");
});
