import toReadable from "../../assets/utils/toReadable";
import getSymbol from "../../assets/utils/getSymbol";

import getExchangeContract from "../contracts/getExchangeContract";

/*
  @ returns the offer with volume as a big number with precision
*/
const getOffer = async id => {
  const exchangeContract = await getExchangeContract();
  const isActive = await exchangeContract.isActive(id);
  const owner = await exchangeContract.getOwner(id);
  const order = await exchangeContract.offers(id);
  const [sellHowMuch, sellWhichToken, buyHowMuch, buyWhichToken] = order;

  const enhancedOrder = {
    id,
    owner,
    isActive,
  };

  // inactive offers have token set to 0x0000... so only enhance active offers
  if (isActive) {
    const sellSymbol = getSymbol(sellWhichToken);
    const buySymbol = getSymbol(buyWhichToken);

    enhancedOrder.sell = {
      symbol: sellSymbol,
      howMuch: toReadable(sellHowMuch, sellSymbol),
    };

    enhancedOrder.buy = {
      symbol: buySymbol,
      howMuch: toReadable(buyHowMuch, buySymbol),
    };
  }

  return enhancedOrder;
};

export default getOffer;
