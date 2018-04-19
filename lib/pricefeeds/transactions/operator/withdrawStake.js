// @flow
import getStakingPriceFeedContract from '../../contracts/getStakingPriceFeedContract';
import sendTransaction from '../../../utils/parity/sendTransaction';

/**
 * Unstake `amount` on staking pricefeed contract
 */
const withdrawStake = async (environment, { amount }): Promise<any> => {
  const stakingPricefeedContract = await getStakingPriceFeedContract(
    environment,
  );

  const receipt = await sendTransaction(
    stakingPricefeedContract,
    'withdrawStake',
    [amount],
    environment,
  );

  return receipt;
};

export default withdrawStake;
