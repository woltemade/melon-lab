import BigNumber from "bignumber.js";

/*
  @param offer: an offer returned by the database (with howMuch as string with precision)
  @returns: howMuch as BigNumber with precision (to use in code)
*/
const deserializeOffer = offer => {
  const result = offer;
  result.buy.howMuch = new BigNumber(offer.buy.howMuch);
  result.sell.howMuch = new BigNumber(offer.sell.howMuch);
  return result;
};

export default deserializeOffer;
