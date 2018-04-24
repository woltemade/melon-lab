// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';
import sendTransaction from '../../utils/parity/sendTransaction';

const getOperators = async (environment): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.getOperators.call({}, []);
};

export default getOperators;
