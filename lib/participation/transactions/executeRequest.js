import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";

import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";
import toReadable from "../../assets/utils/toReadable";
import getDataFeedContract from "../../datafeeds/contracts/getDataFeedContract";

/*
  @param id
*/

const executeRequest = async (requestId, vaultAddress) => {
  const Vault = contract(VaultJson);
  Vault.setProvider(setup.currentProvider);
  const vaultContract = Vault.at(vaultAddress);
  const dataFeedContract = await getDataFeedContract();
  const dataFeedUpdate = dataFeedContract.DataUpdated(
    {},
    {
      fromBlock: setup.web3.eth.blockNumber,
      toBlock: "latest",
    },
  );

  dataFeedUpdate((error, result) => {
    if (!error) {
      vaultContract.executeRequest(requestId).then(receipt => {
        const executeRequestLogEntry = findEventInLog("Subscribed", receipt);
        return {
          numShares: toReadable(executeRequestLogEntry.args.numShares),
        };
      });
    }
  });
};

export default executeRequest;
