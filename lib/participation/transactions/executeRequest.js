import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";

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

  const receipt = await vaultContract.executeRequest(requestId, { from });

  const executeRequestLogEntry = findEventInLog("Subscribed", receipt);

  return toReadable(executeRequestLogEntry.args.numShares);
};

export default executeRequest;
