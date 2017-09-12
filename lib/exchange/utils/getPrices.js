import BigNumber from "bignumber.js";

const getPrices = offer => ({
  buy: new BigNumber(offer.sell.howMuch).div(offer.buy.howMuch),
  sell: new BigNumber(offer.buy.howMuch).div(offer.sell.howMuch),
});

export default getPrices;
