import getOrderbook from "../../../../lib/exchange/calls/getOrderbook";

test("getOrderbook", async () => {
  const assetPairArray = ["MLN-T", "ETH-T"];
  const orderbook = await getOrderbook(...assetPairArray);
  console.log(orderbook);
});
