// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';
import sendTransaction from '../../utils/parity/sendTransaction';

const getRegisteredAssets = async (environment): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.getRegisteredAssets.call({}, []);
};

export default getRegisteredAssets;
