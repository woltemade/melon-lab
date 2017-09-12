import contract from "truffle-contract";

import getOffer from "../../../../lib/exchange/calls/getOffer";

/* eslint-disable global-require */
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));

/* eslint-enable */

test("getOffer", async () => {
  const order = await getOffer(6870);
  expect(order.sell.howMuch.eq("8.55505176")).toBeTruthy();
  expect(contract).toHaveBeenCalledTimes(1);
  expect(contract().setProvider).toHaveBeenCalledTimes(1);
  expect(contract.mockInspect.instance.offers).toHaveBeenCalledWith(777);
});
