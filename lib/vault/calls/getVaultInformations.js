import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";
import setup from "../../utils/setup";
import ensure from "../../utils/ensure";

/*
  @pre: vault address retrieved from getVaultForManager function.
  @returns: object with all basic relevant information on said vault.
*/

const getVaultInformations = async vaultAddress => {
  const Vault = contract(VaultJson);
  Vault.setProvider(setup.currentProvider);
  const vaultContract = Vault.at(vaultAddress);

  const informations = await vaultContract.info();

  return {
    vaultAddress,
    managerAddress: informations[0],
    name: informations[1],
    decimals: informations[3],
    creationDate: new Date(informations[4].times(1000).toNumber()),
    vaultStatus: informations[5],
  };
};

export default getVaultInformations;
