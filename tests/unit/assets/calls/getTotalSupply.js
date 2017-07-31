import contract from "truffle-contract";

import getTotalSupply from "../../../../lib/assets/calls/getTotalSupply";

// eslint-disable-next-line global-require
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));

test("getTotalSupply", async () => {
  const result = await getTotalSupply("0x");

  expect(result).toBeTruthy();
  expect(result.tokenAddress === "0x").toBeTruthy();
  expect(result.totalSupply.eq("1000")).toBeTruthy();
  expect(contract).toHaveBeenCalledTimes(1);
  expect(contract().setProvider).toHaveBeenCalledTimes(1);
  expect(contract().at).toHaveBeenCalledWith("0x");
  expect(contract.mockInspect.instance.totalSupply).toHaveBeenCalledWith();
});
