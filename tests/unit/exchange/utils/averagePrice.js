import BigNumber from "bignumber.js";

import matchedOffers from "../../../fixtures/matchedOffers";

// MUT (Module under test)
import averagePrice from "../../../../lib/exchange/utils/averagePrice";

test("average price", () => {
  expect(averagePrice("buy", matchedOffers)).toBeInstanceOf(BigNumber);
  expect(averagePrice("buy", matchedOffers.slice(0, 1)).toNumber()).toEqual(
    10 / 3,
  );
  expect(averagePrice("sell", matchedOffers.slice(0, 1)).toNumber()).toEqual(
    0.3,
  );

  expect(averagePrice("buy", matchedOffers).toNumber()).toEqual(
    2.857142857142857,
  );
  expect(averagePrice("sell", matchedOffers).toNumber()).toEqual(0.35);
});
