import contract from "truffle-contract";

import getTotalSupply from "../../../../lib/assets/calls/getTotalSupply";

// eslint-disable-next-line global-require
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));

test("getTotalSupply", async () => {
  const result = await getTotalSupply("ETH-T");

  expect(result).toBeTruthy();
  expect(result.toNumber()).toBe(1000);
  expect(contract).toHaveBeenCalledTimes(1);
  expect(contract().setProvider).toHaveBeenCalledTimes(1);
  expect(contract().at).toHaveBeenCalledWith(
    "0x1a825E9bF3BdC8ef8B975F97c78b5208a947d0EC".toLowerCase(),
  );
  expect(contract.mockInspect.instance.totalSupply).toHaveBeenCalledWith();
});
