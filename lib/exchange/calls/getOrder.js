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
  const buyPrecision = getDecimalsByAddress(buyWhichToken);
  const sellPrecision = getDecimalsByAddress(sellWhichToken);

  return {
    id,
    owner,
    isActive,
    buy: {
      symbol: getSymbol(buyWhichToken),
      howMuch: buyHowMuch.div(10 ** buyPrecision),
    },
    sell: {
      symbol: getSymbol(sellWhichToken),
      howMuch: sellHowMuch.div(10 ** sellPrecision),
    },
    timestamp,
  };
};

export default getOrder;
