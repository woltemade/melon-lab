import Web3 from "web3";

import setup from "../../../lib/utils/setup";

test("setup", () => {
  expect(setup.web3).toBeInstanceOf(Web3);
  expect(setup.currentProvider).toBeInstanceOf(Web3.providers.HttpProvider);
  expect(setup.daemonAddress).toBe("0xDAEMON");
});
