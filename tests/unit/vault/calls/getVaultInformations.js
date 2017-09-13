import getVaultInformations from "../../../../lib/vault/calls/getVaultInformations";

/* eslint-disable global-require */
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));

/* eslint-enable */

test("get vault informations", async () => {
  const result = await getVaultInformations("0xVAULT");

  expect(result).toBeTruthy();
  expect(result.managerAddress).toBe("0xUSER");
  expect(result.vaultAddress).toBe("0xVAULT");
  expect(result.name).toBe("Test Fund");
  expect(result.creationDate.toISOString()).toBe("2017-09-13T08:46:12.000Z");
});
