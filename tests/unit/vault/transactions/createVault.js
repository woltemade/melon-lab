import createVault from "../../../../lib/vault/transactions/createVault";

/* eslint-disable global-require */
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));
jest.mock("web3", () => require("../../../mocks/web3"));

jest.mock("../../../../lib/universe/calls/getConfig", () =>
  require("../../../mocks/truffle-contract"),
);
/* eslint-enable */

test("it creates a vault", async () => {
  const result = await createVault("TESTVAULT");
  expect(result).toBeTruthy();
  expect(result.address).toBe("0xVAULT");
  expect(result.owner).toBe("0xUSER");
  expect(result.name).toBe("TESTFUND");
  expect(result.symbol).toBe("MLN-T");
  expect(result.decimals).toBe(18);
  expect(result.active).toBe(true);
  expect(result.timestamp).toBe(123);
});
