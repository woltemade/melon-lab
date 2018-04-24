// @flow
import getStakingPriceFeedContract from '../../contracts/getStakingPriceFeedContract';
import sendTransaction from '../../../utils/parity/sendTransaction';
import toProcessable from '../../../assets/utils/toProcessable';
import getConfig from '../../../version/calls/getConfig';
import getSymbol from '../../../assets/utils/getSymbol';

/**
 * Unstake `amount` on staking pricefeed contract
 */
const withdrawStake = async (
  environment,
  { address, quantity },
): Promise<any> => {
  const stakingPriceFeedContract = await getStakingPriceFeedContract(
    environment,
    address,
  );

  const config = await getConfig(environment);

  const stakingTokenAddress = await stakingPriceFeedContract.instance.stakingToken.call();
  const stakingTokenSymbol = getSymbol(config, stakingTokenAddress);

  quantity = toProcessable(config, quantity, stakingTokenSymbol);

  const receipt = await sendTransaction(
    stakingPriceFeedContract,
    'withdrawStake',
    [quantity, ''],
    environment,
  );

  return receipt;
};

export default withdrawStake;
