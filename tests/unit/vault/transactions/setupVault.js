import setupVault from "../../../../lib/vault/transactions/setupVault";

/* eslint-disable global-require */
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));
jest.mock("../../../../lib/universe/calls/getConfig", () =>
  require("../../../mocks/getConfig"),
);
/* eslint-enable */

test("it creates a vault", async () => {
  const result = await setupVault("TESTVAULT");
  expect(result).toBeTruthy();
  expect(result.id).toBe(1);
  expect(result.address).toBe("0xVAULT");
  expect(result.owner).toBe("0xUSER");
  expect(result.name).toBe("TESTFUND");
  expect(result.timestamp.toISOString()).toBe("1992-12-02T15:28:18.000Z");
});
