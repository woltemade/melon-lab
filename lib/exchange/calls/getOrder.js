import contract from "truffle-contract";
import ExchangeJson from "@melonproject/protocol/build/contracts/Exchange.json";

import { currentProvider } from "../../utils/setup";
import getDecimalsByAddress from "../../assets/utils/getDecimalsByAddress";
import getSymbol from "../../assets/utils/getSymbol";

/*
  @ returns the order with volume as a big number with precision
*/
const getOrder = async id => {
  const Exchange = contract(ExchangeJson);
  Exchange.setProvider(currentProvider);
  const exchangeContract = await Exchange.deployed();
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
