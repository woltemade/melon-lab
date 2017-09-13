import getVersionContract from "../contracts/getVersionContract";
import ensure from "../../utils/ensure";

const getVaultForManager = async managerAddress => {
  const versionContract = await getVersionContract();
  const vaultAddress = await versionContract.vaultForManager(managerAddress);

  if (vaultAddress === "0x0000000000000000000000000000000000000000")
    return false;
  return vaultAddress;
};

export default getVaultForManager;
