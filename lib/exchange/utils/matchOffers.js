// @flow
import BigNumber from "bignumber.js";

import getPrices from "./getPrices";

type OfferTypes = "buy" | "sell";

/*
  @pre: offers are only from the selected asset pair
  @pre: the offers are from getOffer (howMuch as BigNumber)
  @returns: filtered and sorted set of offers
*/
const matchOffers = (
  offerType: OfferTypes,
  priceThreshold: BigNumber,
  offers: Array<mixed>,
) => {
  if (offerType === "sell") {
    return offers
      .filter(offer => getPrices(offer).sell.lte(priceThreshold))
      .sort((a, b) => (getPrices(a).sell.gt(getPrices(b).sell) ? -1 : 1));
  } else if (offerType === "buy") {
    return offers
      .filter(offer => getPrices(offer).buy.gte(priceThreshold))
      .sort((a, b) => (getPrices(a).buy.gt(getPrices(b).buy) ? -1 : 1));
  }

  throw new Error('You need to specify offerType to be either "sell" or "buy"');
};

export default matchOffers;
