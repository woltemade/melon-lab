/*
  @param offer: an offer returned by getOffer.js (with howMuch as BigNumber with precision)
  @returns: howMuch serialized as string (to save into database)
*/
const serializeOffer = offer => {
  const result = offer;
  result.buy.howMuch = offer.buy.howMuch.toString();
  result.sell.howMuch = offer.sell.howMuch.toString();
  result.timestamp = new Date(offer.timestamp.times(1000).toNumber());
  return result;
};

export default serializeOffer;
