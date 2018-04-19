// @flow
import getStakingPriceFeedContract from '../../contracts/getStakingPriceFeedContract';
import sendTransaction from '../../../utils/parity/sendTransaction';

/**
 * Update prices with `newPrices` array for the `assets` array.
 * This function can be called by the owner of the pricefeed.
 */
const update = async (environment, { assets, newPrices }): Promise<any> => {
  const stakingPriceFeedContract = await getStakingPriceFeedContract(
    environment,
  );

  const receipt = await sendTransaction(
    stakingPriceFeedContract,
    'update',
    [assets, newPrices],
    environment,
  );

  return receipt;
};

export default update;
