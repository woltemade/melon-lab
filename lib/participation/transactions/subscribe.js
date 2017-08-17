import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";

import setup from "../../utils/setup";
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
  const txHash = await vaultContract.subscribeWithReferenceAsset(
    toProcessable(quantityAsked),
    toProcessable(quantityOffered),
    {
      from: investor,
    },
  );
  return txHash;
};

export default subscribe;
