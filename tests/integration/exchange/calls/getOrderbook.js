import getOrderbook from "../../../../lib/exchange/calls/getOrderbook";

it("getOrderbook", async () => {
  const assetPairArray = ["MLN-T", "ETH-T"];
  const orderbook = await getOrderbook(...assetPairArray);
  console.log(orderbook);
});
