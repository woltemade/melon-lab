import setupFund from "../../../../lib/version/transactions/setupFund";

/* eslint-disable global-require */
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));

/* eslint-enable */

test("it creates a fund", async () => {
  const result = await setupFund("TESTVAULT");
  expect(result).toBeTruthy();
  expect(result.id).toBe(1);
  expect(result.address).toBe("0xVAULT");
  expect(result.name).toBe("TESTFUND");
  expect(result.timestamp.toISOString()).toBe("1992-12-02T15:28:18.000Z");
});
