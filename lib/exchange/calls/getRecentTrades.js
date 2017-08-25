import BigNumber from "bignumber.js";
import pify from "pify";
import setup from "../../utils/setup";
import getExchangeContract from "../contracts/getExchangeContract";
import getAddress from "../../assets/utils/getAddress";
import toReadable from "../../assets/utils/toReadable";
/*
  @ returns an array of recent trades for a given asset pair (trades executed in the last number of days specified); each trade has a type, price and quantity field.
*/
const getRecentTrades = async (
  baseTokenSymbol,
  quoteTokenSymbol,
  inlastXdays = 1,
) => {
  const exchangeContract = await getExchangeContract();
  const blocksPerDay = 21600;
  const baseTokenAddress = getAddress(baseTokenSymbol);
  const quoteTokenAddress = getAddress(quoteTokenSymbol);
  const numberOfDays = inlastXdays;

  const blockNumber = await pify(setup.web3.eth.getBlockNumber)();

  const tradeEvent = exchangeContract.Trade(
    {},
    {
      fromBlock: blockNumber - blocksPerDay * numberOfDays,
      toBlock: "latest",
    },
  );

  const tradeEventsPromise = new Promise((resolve, reject) => {
    tradeEvent.get((error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });

  const recentTrades = await tradeEventsPromise;

  return recentTrades
    .map(event => {
      const trade = {};
      if (
        event.args.buy_which_token.toLowerCase() === baseTokenAddress &&
        event.args.sell_which_token.toLowerCase() === quoteTokenAddress
      ) {
        trade.type = "buy";
        trade.price = new BigNumber(event.args.sell_how_much).div(
          event.args.buy_how_much,
        );
        trade.quantity = toReadable(event.args.buy_how_much, baseTokenSymbol);
      } else if (
        event.args.buy_which_token.toLowerCase() === quoteTokenAddress &&
        event.args.sell_which_token.toLowerCase() === baseTokenAddress
      ) {
        trade.type = "sell";
        trade.price = new BigNumber(event.args.buy_how_much).div(
          event.args.sell_how_much,
        );
        trade.quantity = toReadable(event.args.sell_how_much, quoteTokenSymbol);
      } else {
        return null;
      }
      return trade;
    })
    .filter(o => !!o);
};
export default getRecentTrades;
