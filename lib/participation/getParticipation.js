import contract from "truffle-contract";
import VaultJson from "@melonproject/protocol/build/contracts/Vault.json";
import web3 from "./helpers/web3";

const getParticipation = async (
  vaultAddress,
  managerAddress,
  precision = 18,
) => {
  const Vault = contract(VaultJson);
  Vault.setProvider(web3.currentProvider);
  const vaultContract = Vault.at(vaultAddress);

  const personalStake = await vaultContract.balanceOf(managerAddress);
  const totalSupply = await vaultContract.totalSupply();

  return {
    personalStake: personalStake.div(10 ** precision),
    totalSupply: totalSupply.div(10 ** precision),
  };
};

export default getParticipation;
