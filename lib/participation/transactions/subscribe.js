import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";

import setup from "../../utils/setup";
import depositAndApproveEther from "./depositAndApproveEther";

/*
  @param quantityAsked: BigNumber quantity of Shares wanted to receive with decimals
  @param quantityOffered: BigNumber quantitiy of Ether willing to offer with decimals
*/
const subscribe = async (
  vaultAddress,
  quantityOffered,
  quantityAsked,
  investor = setup.web3.eth.accounts[0],
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
