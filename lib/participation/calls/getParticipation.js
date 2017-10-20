// @flow
import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Fund.json";
import setup from "../../utils/setup";

/**
 * Get the personalStake and totalSupply of a manager in a vault
 *
 * @param vaultAddress
 * @param managerAddress
 */
const getParticipation = async (
  vaultAddress: string,
  managerAddress: string,
) => {
  const Vault = contract(VaultJson);
  Vault.setProvider(setup.currentProvider);
  const vaultContract = Vault.at(vaultAddress);

  const personalStake = await vaultContract.balanceOf(managerAddress);
  const totalSupply = await vaultContract.totalSupply();

  return {
    personalStake: personalStake.div(10 ** 18),
    totalSupply: totalSupply.div(10 ** 18),
  };
};

export default getParticipation;
