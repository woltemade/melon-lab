import setup from "../../../lib/utils/setup";

test("setup", () => {
  expect(setup.daemonAddress).toBe("0xDAEMON");
  expect(setup.defaultAccount).toBe("0xMANAGER");
});
