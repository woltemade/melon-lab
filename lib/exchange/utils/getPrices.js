import BigNumber from "bignumber.js";

const getPrices = order => ({
  buy: new BigNumber(order.sell.howMuch).div(order.buy.howMuch),
  sell: new BigNumber(order.buy.howMuch).div(order.sell.howMuch),
});

export default getPrices;
