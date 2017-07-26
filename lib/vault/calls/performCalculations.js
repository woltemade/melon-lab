import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";
import { currentProvider } from "../../utils/setup";

const performCalculations = async (vaultAddress, precision = 18) => {
  const Vault = contract(VaultJson);
  Vault.setProvider(currentProvider);
  const vaultContract = Vault.at(vaultAddress);

  const calculations = await vaultContract.performCalculations();

  return {
    gav: calculations[0].div(10 ** precision),
    managementReward: calculations[1].div(10 ** precision),
    performanceReward: calculations[2].div(10 ** precision),
    unclaimedRewards: calculations[3].div(10 ** precision),
    nav: calculations[4].div(10 ** precision),
    sharePrice: calculations[5].div(10 ** precision),
  };
};

export default performCalculations;
