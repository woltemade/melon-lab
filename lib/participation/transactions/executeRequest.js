import contract from "truffle-contract";
import BigNumber from "bignumber.js";
import VaultJson from "@melonproject/protocol/build/contracts/Fund.json";

import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";
import toReadable from "../../assets/utils/toReadable";

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

  const request = await vaultContract.requests(requestId);
  let executeRequestLogEntry;
  let receipt;

  if (request[2].eq(new BigNumber(0))) {
    receipt = await vaultContract.executeRequest(requestId, { from });

    executeRequestLogEntry = findEventInLog("Subscribed", receipt);
  } else if (request[2].eq(new BigNumber(1))) {
    receipt = await vaultContract.executeRequest(requestId, { from });
    executeRequestLogEntry = findEventInLog("Redeemed", receipt);
  }

  return toReadable(executeRequestLogEntry.args.numShares);
};

export default executeRequest;
