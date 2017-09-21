import getLastOrderId from "../../../../lib/exchange/calls/getLastOrderId";

fit("sync orders", async () => {
  const lastOrderId = await getLastOrderId();
  console.log(lastOrderId);
});
