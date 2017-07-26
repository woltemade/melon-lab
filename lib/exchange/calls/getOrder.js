import contract from "truffle-contract";
import ExchangeJson from "@melonproject/protocol/build/contracts/Exchange.json";

import { currentProvider } from "../../utils/setup";
import addressList from "../../assets/utils/addressList";
import {
  getTokenPrecisionByAddress,
  getTokenSymbolByAddress,
} from "../../utils/specs";

/*
  @ returns the order with volume as a big number with precision
*/
const getOrder = id => {
  const Exchange = contract(ExchangeJson);
  Exchange.setProvider(currentProvider);
  const exchangeContract = Exchange.at(addressList.exchange); // Initialize contract instance

  return exchangeContract.orders(id).then(order => {
    const [
      sellHowMuch,
      sellWhichToken,
      buyHowMuch,
      buyWhichToken,
      timestamp,
      owner,
      isActive,
    ] = order;
    const buyPrecision = getTokenPrecisionByAddress(buyWhichToken);
    const sellPrecision = getTokenPrecisionByAddress(sellWhichToken);
    const buySymbol = getTokenSymbolByAddress(buyWhichToken);
    const sellSymbol = getTokenSymbolByAddress(sellWhichToken);

    return {
      id,
      owner,
      isActive,
      buy: {
        symbol: buySymbol,
        howMuch: buyHowMuch.div(10 ** buyPrecision),
      },
      sell: {
        symbol: sellSymbol,
        howMuch: sellHowMuch.div(10 ** sellPrecision),
      },
      timestamp,
    };
  });
};

export default getOrder;
