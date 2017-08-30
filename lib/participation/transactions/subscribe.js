import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";

import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";
import depositAndApproveEther from "./depositAndApproveEther";
import toProcessable from "../../assets/utils/toProcessable";
import toReadable from "../../assets/utils/toReadable";

/*
  @param quantityAsked: BigNumber quantity of Shares wanted to receive with decimals
  @param quantityOffered: BigNumber quantitiy of Ether willing to offer with decimals
*/
const subscribe = async (
  vaultAddress,
  quantityOffered,
  quantityAsked,
  investor = setup.defaultAccount,
) => {
  await depositAndApproveEther(investor, vaultAddress, quantityOffered);
  const Vault = contract(VaultJson);
  Vault.setProvider(setup.currentProvider);
  const vaultContract = Vault.at(vaultAddress);
  const receipt = await vaultContract.subscribeWithReferenceAsset(
    toProcessable(quantityAsked),
    toProcessable(quantityOffered),
    {
      from: investor,
    },
  );

  const transferLogEntry = findEventInLog("Transfer", receipt);
  const subscribedLogEntry = findEventInLog("Subscribed", receipt);
  /* eslint-disable no-underscore-dangle */
  return {
    invested: toReadable(transferLogEntry.args._value),
    received: toReadable(subscribedLogEntry.args.numShares),
    price: transferLogEntry.args._value.div(subscribedLogEntry.args.numShares),
  };
  /* eslint-enable */
};

export default subscribe;
