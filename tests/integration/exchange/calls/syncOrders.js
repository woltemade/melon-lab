import getLastOrderId from "../../../../lib/exchange/calls/getLastOrderId";

it("sync orders", async () => {
  const lastOrderId = await getLastOrderId();
  expect(lastOrderId).toBeGreaterThan(0);
});
