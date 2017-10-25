// @flow
import getPrices from "../utils/getPrices";
import type { BuyOrSell } from "../schemas/BuyOrSell";

/**
 * Get sorting function to sort list of orders by price
 * @example orders.sort(sortByPrice('sell'));
 */
const sortByPrice = (orderType: BuyOrSell): Function => {
  if (orderType === "sell")
    return (a, b) => (getPrices(a).sell.gt(getPrices(b).sell) ? 1 : -1);
  else if (orderType === "buy")
    return (a, b) => (getPrices(a).buy.gt(getPrices(b).buy) ? -1 : 1);
  throw new Error('You need to specify orderType to be either "sell" or "buy"');
};

export default sortByPrice;
