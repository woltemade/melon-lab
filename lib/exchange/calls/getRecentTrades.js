import BigNumber from "bignumber.js";
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
  const recentTrades = [];
  const baseTokenAddress = getAddress(baseTokenSymbol);
  const quoteTokenAddress = getAddress(quoteTokenSymbol);
  const numberOfDays = inlastXdays;

  setup.web3.eth.getBlockNumber((error, result) => {
    if (!error) {
      const blockNumber = result;
      exchangeContract.Trade(
        {},
        {
          fromBlock: blockNumber - blocksPerDay * numberOfDays,
          toBlock: "latest",
        },
        (error, event) => {
          const trade = {};
          if (!error) {
            if (
              event.args.buy_which_token.toLowerCase() === baseTokenAddress &&
              event.args.sell_which_token.toLowerCase() === quoteTokenAddress
            ) {
              trade.type = "buy";
              trade.price = new BigNumber(event.args.sell_how_much).div(
                event.args.buy_how_much,
              );
              trade.quantity = toReadable(
                event.args.buy_how_much,
                baseTokenSymbol,
              );
              recentTrades.push(trade);
            } else if (
              event.args.buy_which_token.toLowerCase() === quoteTokenAddress &&
              event.args.sell_which_token.toLowerCase() === baseTokenAddress
            ) {
              trade.type = "sell";
              trade.price = new BigNumber(event.args.buy_how_much).div(
                event.args.sell_how_much,
              );
              trade.quantity = toReadable(
                event.args.sell_how_much,
                quoteTokenSymbol,
              );
              recentTrades.push(trade);
            }
          }
        },
      );
    }
  });
  return recentTrades;
};
export default getRecentTrades;
