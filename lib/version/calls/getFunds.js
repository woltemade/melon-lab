import getVersionContract from "../contracts/getVersionContract";

const getFunds = async (startId = 0) => {
  const versionContract = await getVersionContract();

  const allFunds = await versionContract.getFunds(startId);

  return allFunds;
};

export default getFunds;
