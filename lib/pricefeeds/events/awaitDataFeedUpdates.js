import getPriceFeedContract from '../contracts/getPriceFeedContract';

/**
 * @deprecated
 */
const awaitDataFeedUpdates = async (environment, howMany = 1) => {
  // console.warn("awaitDataFeedUpdates is deprecated. Use melonTracker instead.");

  const priceFeedContract = await getPriceFeedContract(environment);
  const entryTime = new Date();
  let n = 0;
  let blockDifference;
  let lastBlockTime;
  return new Promise((resolve, reject) => {
    const pricefeedUpdate = priceFeedContract.instance.PriceUpdated.subscribe(
      {},
      (error, result) => {
        n += 1;
        environment.api.eth
          .getBlockByNumber(result[0].blockNumber)
          .then(lastBlock => {
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
