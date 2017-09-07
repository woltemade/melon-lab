import BigNumber from "bignumber.js";

import getPrice from "../../../../lib/datafeeds/calls/getPrice";

it("getPrice", async () => {
  const price = await getPrice("MLN-T");
  expect(price instanceof BigNumber).toBeTruthy();
  expect(price.gt(0)).toBeTruthy();
});
