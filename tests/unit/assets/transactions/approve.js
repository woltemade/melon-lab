import BigNumber from "bignumber.js";
import contract from "truffle-contract";

import approve from "../../../../lib/assets/transactions/approve";

// eslint-disable-next-line global-require
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));

test("approve", async () => {
  const result = await approve("ETH-T", "0xEXCHANGE", new BigNumber(4));

  expect(result).toBeTruthy();
  expect(contract).toHaveBeenCalledTimes(1);
  expect(contract().setProvider).toHaveBeenCalledTimes(1);
  expect(contract().at).toHaveBeenCalledWith(
    "0x1a825E9bF3BdC8ef8B975F97c78b5208a947d0EC".toLowerCase(),
  );
  expect(contract.mockInspect.instance.approve).toHaveBeenCalledTimes(1);

  const mockCallArgs = contract.mockInspect.instance.approve.mock.calls[0];
  expect(mockCallArgs[0]).toBe("0xEXCHANGE");
  expect(mockCallArgs[1].toString()).toBe("4e-18");
  expect(mockCallArgs[2].from).toBe("0xUSER");
});
