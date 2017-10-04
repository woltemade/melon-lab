import getVersionContract from "../contracts/getVersionContract";

/*
@pre: take a manager address ie. an ethereum regular address.
@returns: false if manager doesn't have a fund || the address of the manager's fund.
*/

const getFundForManager = async managerAddress => {
  const versionContract = await getVersionContract();
  const vaultAddress = await versionContract.getFund(managerAddress);

  if (vaultAddress === "0x0000000000000000000000000000000000000000")
    return false;
  return vaultAddress;
};

export default getFundForManager;
