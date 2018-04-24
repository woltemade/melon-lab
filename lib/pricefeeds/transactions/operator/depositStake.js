// @flow
import getStakingPriceFeedContract from '../../contracts/getStakingPriceFeedContract';
import ensure from '../../../utils/generic/ensure';
import sendTransaction from '../../../utils/parity/sendTransaction';
import getSymbol from '../../../assets/utils/getSymbol';
import approve from '../../../assets/transactions/approve';
import getConfig from '../../../version/calls/getConfig';
import toProcessable from '../../../assets/utils/toProcessable';

/**
 * Stake `quantity` on staking pricefeed contract
 */
const depositStake = async (
  environment,
  { address, quantity },
): Promise<any> => {
  const stakingPricefeedContract = await getStakingPriceFeedContract(
    environment,
    address,
  );

  const config = await getConfig(environment);

  const stakingTokenAddress = await stakingPricefeedContract.instance.stakingToken.call();
  const stakingTokenSymbol = getSymbol(config, stakingTokenAddress);

  quantity = toProcessable(config, quantity, stakingTokenSymbol);

  const opts = {
    symbol: stakingTokenSymbol,
    spender: address,
    quantity,
  };

  const x = await approve(environment, opts);

  const receipt = await sendTransaction(
    stakingPricefeedContract,
    'depositStake',
    [quantity, ''],
    environment,
  );

  return receipt;
};

export default depositStake;
