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
  let n = 0;

  return new Promise((resolve, reject) => {
    dataFeedUpdate.watch(error => {
      n += 1;
      if (n >= 2) {
        dataFeedUpdate.stopWatching();
        if (error) reject(error);
        resolve(true);
      }
    });
  });
};

export default awaitDataFeedUpdates;
