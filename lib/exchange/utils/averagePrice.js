import BigNumber from "bignumber.js";

/*
  @pre: offers are retrieved from the matchOffers (sorted, and filtered)
        and BigNumberified
*/

const averagePrice = (offerType, offers) => {
  const cumulatedVolumes = offers.reduce(
    (accumulator, current) => ({
      buy: accumulator.buy.add(current.buy.howMuch),
      sell: accumulator.sell.add(current.sell.howMuch),
    }),
    {
      buy: new BigNumber(0),
      sell: new BigNumber(0),
    },
  );

  if (offerType === "buy") {
    return cumulatedVolumes.sell.div(cumulatedVolumes.buy);
  } else if (offerType === "sell") {
    return cumulatedVolumes.buy.div(cumulatedVolumes.sell);
  }

  throw new Error('You need to specify offerType to be either "sell" or "buy"');
};

export default averagePrice;
