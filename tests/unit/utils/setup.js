import setup from "../../../lib/utils/setup";

test("setup", () => {
  expect(setup.daemonAddress).toBe("0xDAEMON");
});
