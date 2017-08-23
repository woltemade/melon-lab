import getOrderbook from "../../../../lib/exchange/calls/getOrderbook";

/* eslint-disable global-require */
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));
jest.mock("../../../../lib/universe/calls/getConfig", () =>
  require("../../../mocks/truffle-contract"),
);
/* eslint-enable */

test("getOrderbook", async () => {
  const assetPairArray = ["MLN-T", "ETH-T"];
  const orderbook = await getOrderbook("MLN-T", "ETH-T");
  expect(orderbook).toHaveLength(6);
  orderbook.reduce((previous, current) => {
    expect(assetPairArray).toContain(current.buy.symbol);
    expect(assetPairArray).toContain(current.sell.symbol);
    if (previous) expect(current.price.lt(previous.price)).toBeTruthy();
    if (previous && previous.type !== current.type)
      expect(previous.type).toBe("sell");

    if (previous && current.type === "sell")
      expect(
        previous.cumulativeVolume.minus(current.cumulativeVolume).toNumber(),
      ).toBe(previous.sell.howMuch.toNumber());

    if (previous.type === current.type === "buy")
      expect(
        current.cumulativeVolume.minus(previous.cumulativeVolume).toNumber(),
      ).toBe(current.buy.howMuch.toNumber());
    return current;
  });
});
