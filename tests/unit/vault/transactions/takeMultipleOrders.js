import BigNumber from "bignumber.js";

import matchedOffers from "../../../fixtures/matchedOffers";

import takeMultipleOffers from "../../../../lib/vault/transactions/takeMultipleOffers";

/* eslint-disable global-require */
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));
jest.mock("../../../../lib/universe/calls/getConfig", () =>
  require("../../../mocks/truffle-contract"),
);
/* eslint-enable */

test("buy 1.5 MLN from two orders: one full and one partial", async () => {
  const result = await takeMultipleOffers(
    matchedOffers,
    "0xMANAGER",
    "0xVAULT",
    new BigNumber(1.5),
  );

  expect(result).toBeTruthy();
  expect(result.remainingQuantity.eq(0)).toBeTruthy();
  expect(result.transactions).toHaveLength(2);
});
