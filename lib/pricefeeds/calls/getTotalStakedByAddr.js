// @flow
import getCanonicalPriceFeedContract from '../contracts/getCanonicalPriceFeedContract';
import sendTransaction from '../../utils/parity/sendTransaction';

const getTotalStakedByAddr = async (environment, { addr }): Promise<any> => {
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );

  return canonicalPriceFeedContract.instance.totalStakedFor.call({}, [addr]);
};

export default getTotalStakedByAddr;
