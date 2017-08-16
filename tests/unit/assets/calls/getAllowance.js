import contract from "truffle-contract";

import getAllowance from "../../../../lib/assets/calls/getAllowance";

// eslint-disable-next-line global-require
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));

test("getAllowance", async () => {
  const result = await getAllowance("ETH-T", "0x1", "0x2");

  expect(result.toNumber()).toBe(6);
  expect(contract).toHaveBeenCalledTimes(1);
  expect(contract().setProvider).toHaveBeenCalledTimes(1);
  // Token Symbol to address resolution transparently handled
  expect(contract().at).toHaveBeenCalledWith(
    "0x1a825E9bF3BdC8ef8B975F97c78b5208a947d0EC".toLowerCase(),
  );
  expect(contract.mockInspect.instance.allowance).toHaveBeenCalledWith(
    "0x1",
    "0x2",
  );
});
