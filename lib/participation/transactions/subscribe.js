import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";

import setup from "../../utils/setup";
import findEventInLog from "../../utils/findEventInLog";
import depositAndApproveEther from "./depositAndApproveEther";
import toProcessable from "../../assets/utils/toProcessable";

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

  findEventInLog("Transfer", receipt);
  findEventInLog("Subscribed", receipt);
  return true;
};

export default subscribe;
