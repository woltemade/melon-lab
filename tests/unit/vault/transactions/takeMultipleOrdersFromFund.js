import BigNumber from "bignumber.js";

import matchedOrders from "../../../fixtures/matchedOrders";

import takeMultipleOrdersFromFund from "../../../../lib/fund/transactions/takeMultipleOrdersFromFund";

/* eslint-disable global-require */
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));
/* eslint-enable */

test("buy 1.5 MLN from two orders: one full and one partial", async () => {
  const result = await takeMultipleOrdersFromFund(
    matchedOrders,
    "0xMANAGER",
    "0xVAULT",
    new BigNumber(1.5),
  );

  expect(result).toBeTruthy();
  expect(result.remainingQuantity.eq(0)).toBeTruthy();
  expect(result.transactions).toHaveLength(2);
});
