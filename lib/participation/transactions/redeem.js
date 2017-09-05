import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";

import setup from "../../utils/setup";
import toProcessable from "../../assets/utils/toProcessable";
import findEventInLog from "../../utils/findEventInLog";
import ensure from "../../utils/ensure";

const redeem = async (
  vaultAddress,
  quantity,
  investor = setup.defaultAccount,
) => {
  const Vault = contract(VaultJson);
  Vault.setProvider(setup.currentProvider);
  const vaultContract = Vault.at(vaultAddress);
  const receipt = await vaultContract.redeem(toProcessable(quantity), {
    from: investor,
  });
  const redeemLogEntry = findEventInLog("Redeemed", receipt);

  ensure(
    redeemLogEntry.args.numShares.eq(toProcessable(quantity)),
    "requested quantity is not equal to retrieved quantity",
    redeemLogEntry,
  );

  return true;
};

export default redeem;
