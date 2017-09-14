import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Fund.json";

import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";
import toReadable from "../../assets/utils/toReadable";
import getDataFeedContract from "../../datafeeds/contracts/getDataFeedContract";

/*
  @param id
*/

const executeRequest = async (
  requestId,
  vaultAddress,
  from = setup.defaultAccount,
) => {
  const Vault = contract(VaultJson);
  Vault.setProvider(setup.currentProvider);
  const vaultContract = Vault.at(vaultAddress);

  const dataFeedContract = await getDataFeedContract();

  const requestTimeStamp = await vaultContract.requests[requestId].timestamp;
  const datafeedInterval = await dataFeedContract.getInterval();

  console.log("Request timestamp ", requestTimeStamp);

  console.log("dataFeedInterval ", datafeedInterval);

  const receipt = await vaultContract.executeRequest(requestId, { from });

  const executeRequestLogEntry = findEventInLog("Subscribed", receipt);

  return toReadable(executeRequestLogEntry.args.numShares);
};

export default executeRequest;
