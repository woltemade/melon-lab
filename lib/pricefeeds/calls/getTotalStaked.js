// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';
import sendTransaction from '../../utils/parity/sendTransaction';

const getTotalStaked = async (environment, { OperatorAddr }): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.totalStakedFor.call({}, [
    OperatorAddr,
  ]);
};

export default getTotalStaked;
