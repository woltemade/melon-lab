import contract from "truffle-contract";

import getOrder from "../../../../lib/exchange/calls/getOrder";

/* eslint-disable global-require */
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));

/* eslint-enable */

test("getOrder", async () => {
  const order = await getOrder(6870);
  expect(order.sell.howMuch.eq("8.55505176")).toBeTruthy();
  expect(contract).toHaveBeenCalledTimes(4);
  expect(contract().setProvider).toHaveBeenCalledTimes(4);
  expect(contract.mockInspect.instance.getOrder).toHaveBeenCalledWith(
    "0xSIMPLEMARKET",
    6870,
  );
});
