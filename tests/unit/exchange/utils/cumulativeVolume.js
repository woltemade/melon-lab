import BigNumber from "bignumber.js";

import matchedOrders from "../../../fixtures/matchedOrders";

// MUT (Module under test)
import cumulativeVolume from "../../../../lib/exchange/utils/cumulativeVolume";

test("cumulativeVolume", () => {
  expect(cumulativeVolume("buy", matchedOrders)).toBeInstanceOf(BigNumber);
  expect(cumulativeVolume("buy", matchedOrders).toNumber()).toEqual(0.7);

  expect(cumulativeVolume("sell", matchedOrders).toNumber()).toEqual(2);
  expect(
    cumulativeVolume("sell", matchedOrders.slice(0, 1)).toNumber(),
  ).toEqual(1);
});
