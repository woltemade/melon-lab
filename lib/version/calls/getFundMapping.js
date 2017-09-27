import getVersionContract from "../contracts/getVersionContract";

/*
Returns a mapping of manager addresses linked to a fundId list.
*/

const getFundsMapping = async () => {
  const versionContract = await getVersionContract();

  const fundsMapping = await versionContract.funds();

  return fundsMapping;
};

export default getFundsMapping;
