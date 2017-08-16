import getDecimalsByAddress from "../../assets/utils/getDecimalsByAddress";
import getSymbol from "../../assets/utils/getSymbol";

import getExchangeContract from "../contracts/getExchangeContract";

/*
  @ returns the order with volume as a big number with precision
*/
const getOrder = async id => {
  const exchangeContract = await getExchangeContract();
  const order = await exchangeContract.orders(id);

  const [
    sellHowMuch,
    sellWhichToken,
    buyHowMuch,
    buyWhichToken,
    timestamp,
    owner,
    isActive,
  ] = order;

  const enhancedOrder = {
    id,
    owner,
    isActive,
    timestamp,
  };

  // inactive orders have token set to 0x0000... so only enhance active orders
  if (isActive) {
    const sellPrecision = getDecimalsByAddress(sellWhichToken);
    const buyPrecision = getDecimalsByAddress(buyWhichToken);

    enhancedOrder.sell = {
      symbol: getSymbol(sellWhichToken),
      howMuch: sellHowMuch.div(10 ** sellPrecision),
    };

    enhancedOrder.buy = {
      symbol: getSymbol(buyWhichToken),
      howMuch: buyHowMuch.div(10 ** buyPrecision),
    };
  }

  return enhancedOrder;
};

export default getOrder;
