import getDataFeedContract from "../contracts/getDataFeedContract";
import setup from "../../utils/setup";

const awaitDataFeedUpdates = async (howMany = 1) => {
  const dataFeedContract = await getDataFeedContract();

  const dataFeedUpdate = dataFeedContract.DataUpdated(
    {},
    {
      fromBlock: setup.web3.eth.blockNumber,
      toBlock: "latest",
    },
  );

  const entryTime = new Date();
  let n = 0;
  let blockDifference;
  let lastBlockTime;

  return new Promise((resolve, reject) => {
    dataFeedUpdate.watch((error, result) => {
      n += 1;
      lastBlockTime = new Date(
        setup.web3.eth.getBlock(result.blockNumber).timestamp * 1000,
      );
      blockDifference = (lastBlockTime.getTime() - entryTime.getTime()) / 1000;
      if (n >= howMany && blockDifference > 120) {
        dataFeedUpdate.stopWatching();
        if (error) reject(error);
        resolve(true);
      }
    });
  });
};

export default awaitDataFeedUpdates;
