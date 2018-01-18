import getVersionContract from '../contracts/getVersionContract';

/**
 * Returns a mapping of manager addresses linked to a fundId list.
 */
const getManagersMapping = async () => {
  const versionContract = await getVersionContract();

  const managersMapping = await versionContract.instance.managers.call();

  return managersMapping;
};

export default getManagersMapping;
