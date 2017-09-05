import getVersionContract from "../contracts/getVersionContract";

const getVaultsOfManager = async managerAddress => {
  const versionContract = await getVersionContract();
  const vaultIdsOfManager = versionContract.managers[managerAddress];
  const hasVault = await versionContract.hasVault(managerAddress);
  console.log(managerAddress, vaultIdsOfManager, hasVault);
};

export default getVaultsOfManager;
