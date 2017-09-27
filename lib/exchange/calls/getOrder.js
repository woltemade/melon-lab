import setup from "../../utils/setup";
import toReadable from "../../assets/utils/toReadable";
import getSymbol from "../../assets/utils/getSymbol";
import getConfig from "../../version/calls/getConfig";
import getExchangeAdapterContract from "../contracts/getExchangeAdapterContract";

/*
  @ returns the order with volume as a big number with precision
*/
const getOrder = async id => {
  const exchangeAdapterContract = await getExchangeAdapterContract();

  const config = await getConfig();

  const isActive = await exchangeAdapterContract.isActive(
    config.exchangeAddress,
    id,
  );
  const owner = await exchangeAdapterContract.getOwner(
    config.exchangeAddress,
    id,
  );
  const order = await exchangeAdapterContract.getOrder(
    config.exchangeAddress,
    id,
  );

  const [sellWhichToken, buyWhichToken, sellHowMuch, buyHowMuch] = order;

  const enhancedOrder = {
    id: id instanceof setup.web3.BigNumber ? id.toNumber() : id,
    owner,
    isActive,
  };

  // inactive orders have token set to 0x0000... so only enhance active orders
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

export default getOrder;
