import BigNumber from "bignumber.js";

import orders from "../../../fixtures/orderBook";

import matchOffers from "../../../../lib/exchange/utils/matchOffers";

test("matchOffers", () => {
  const sellMelonOrders = orders.filter(o => o.sell.symbol === "MLN-T");
  const matchedOrders = matchOffers(
    "sell",
    new BigNumber(0.4),
    sellMelonOrders,
  );

  expect(matchedOrders.length).toBe(2);
  expect(matchedOrders.map(o => o.id)).toEqual([2, 1]);
});
