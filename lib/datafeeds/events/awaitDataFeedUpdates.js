import Api from "@parity/api";
import getPriceFeedContract from "../contracts/getPriceFeedContract";
import setup from "../../utils/setup";

/**
 * @deprecated
 */
const awaitDataFeedUpdates = async (howMany = 1) => {
  // console.warn("awaitDataFeedUpdates is deprecated. Use melonTracker instead.");

  const dataFeedContract = await getPriceFeedContract();
  const api = new Api(setup.provider);
  const entryTime = new Date();
  let n = 0;
  let blockDifference;
  let lastBlockTime;
  return new Promise((resolve, reject) => {
    const dataFeedUpdate = dataFeedContract.instance.DataUpdated.subscribe(
      {},
      (error, result) => {
        n += 1;
        api.eth.getBlockByNumber(result[0].blockNumber).then(lastBlock => {
          lastBlockTime = lastBlock.timestamp;
          blockDifference =
            (lastBlockTime.getTime() - entryTime.getTime()) / 1000;
          if (n >= howMany && blockDifference > 120) {
            if (error) reject(error);
            resolve(true);
          }
        });
      },
    );
  });
};

export default awaitDataFeedUpdates;
