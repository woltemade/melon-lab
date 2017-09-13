import getVersionContract from "../contracts/getVersionContract";

const getVaultForManager = async managerAddress => {
  const versionContract = await getVersionContract();
  return versionContract.vaultForManager(managerAddress);
};

export default getVaultForManager;
