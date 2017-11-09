// @flow
import BigNumber from "bignumber.js";
import pify from "pify";
import setup from "../../utils/setup";
import getSimpleMarketContract from "../contracts/getSimpleMarketContract";
import getAddress from "../../assets/utils/getAddress";
import toReadable from "../../assets/utils/toReadable";
import getDecimals from "../../assets/utils/getDecimals";

import type { Trade } from "../schemas/Trade";
import type { TokenSymbol } from "../../assets/schemas/TokenSymbol";

/**
 * get all recent trades for a given asset pair `baseTokenSymbol`/
 * `quoteTokenSymbol` in the `inlastXdays`
 */
const getRecentTrades = async (
  baseTokenSymbol: TokenSymbol,
  quoteTokenSymbol: TokenSymbol,
  inlastXdays: number = 1,
): Promise<[Trade]> => {
  const simpleMarketContract = await getSimpleMarketContract();
  const blocksPerDay = 21600;
  const baseTokenAddress = getAddress(baseTokenSymbol);
  const quoteTokenAddress = getAddress(quoteTokenSymbol);
  const numberOfDays = inlastXdays;

  const blockNumber: number = await pify(setup.web3.eth.getBlockNumber)();

  const tradeEvent = simpleMarketContract.LogTake(
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

  const decimalDifference =
    getDecimals(quoteTokenSymbol) - getDecimals(baseTokenSymbol);
  const recentTrades = await tradeEventsPromise;
  return recentTrades
    .map(event => {
      const trade = {
        maker: event.args.maker,
        taker: event.args.taker,
        timeStamp: new Date(event.args.timestamp.times(1000).toNumber()),
      };
      if (
        event.args.buy_gem.toLowerCase() === quoteTokenAddress &&
        event.args.pay_gem.toLowerCase() === baseTokenAddress
      ) {
        if (getDecimals(baseTokenSymbol) !== 18) {
          trade.price = new BigNumber(event.args.give_amt)
            .div(event.args.take_amt)
            .div(10 ** decimalDifference);
        } else {
          trade.price = new BigNumber(event.args.give_amt).div(
            event.args.take_amt,
          );
        }
        trade.type = "buy";
        trade.quantity = toReadable(event.args.take_amt, baseTokenSymbol);
      } else if (
        event.args.buy_gem.toLowerCase() === baseTokenAddress &&
        event.args.pay_gem.toLowerCase() === quoteTokenAddress
      ) {
        if (getDecimals(baseTokenSymbol) !== 18) {
          trade.price = new BigNumber(event.args.take_amt)
            .div(event.args.give_amt)
            .div(10 ** decimalDifference);
        } else {
          trade.price = new BigNumber(event.args.take_amt).div(
            event.args.give_amt,
          );
        }
        trade.type = "sell";
        trade.quantity = toReadable(event.args.give_amt, baseTokenSymbol);
      } else {
        return null;
      }
      return trade;
    })
    .filter(o => !!o);
};

export default getRecentTrades;
