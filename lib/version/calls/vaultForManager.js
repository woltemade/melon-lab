import getVersionContract from "../contracts/getVersionContract";

const vaultForManager = async managerAddress => {
  const versionContract = await getVersionContract();
  return versionContract.vaultForManager(managerAddress);
};

export default vaultForManager;
