import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";

import { currentProvider } from "../../utils/setup";
import depositAndApproveEther from "./depositAndApproveEther";

/*
  @param quantityAsked: BigNumber quantity of Shares wanted to receive
  @param quantityOffered: BigNumber quantitiy of Ether willing to offer
*/
const subscribe = async (
  investor,
  vaultAddress,
  quantityAsked,
  quantityOffered,
) => {
  await depositAndApproveEther(investor, vaultAddress, quantityOffered);
  const Vault = contract(VaultJson);
  Vault.setProvider(setup.currentProvider);
  const vaultContract = Vault.at(vaultAddress);
  const txHash = await vaultContract.subscribeWithReferenceAsset(
    quantityAsked,
    quantityOffered,
    {
      from: investor,
    },
  );
  return txHash;
};

export default subscribe;
