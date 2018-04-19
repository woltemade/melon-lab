// @flow
import getStakingPriceFeedContract from '../contracts/getStakingPriceFeedContract';
import ensure from '../../utils/generic/ensure';
import sendTransaction from '../../utils/parity/sendTransaction';
import getSymbol from '../../assets/utils/getSymbol';
import approve from '../../assets/transactions/approve';
import getConfig from '../../version/calls/getConfig';

/**
 * Stake `quantity` on staking pricefeed contract
 */
const depositStake = async (environment, { quantity }): Promise<any> => {
  const stakingPricefeedContract = await getStakingPriceFeedContract(
    environment,
  );

  const config = await getConfig(environment);

  const stakingTokenAddress = stakingPricefeedContract.instance.stakingToken.call();
  const stakingTokenSymbol = getSymbol(config, stakingTokenAddress);
  await approve(environment, {
    symbol: stakingTokenSymbol,
    spender: config.stakingPriceFeedAddress,
    quantity,
  });

  const receipt = await sendTransaction(
    stakingPricefeedContract,
    'depositStake',
    [quantity],
    environment,
  );

  return receipt;
};

export default depositStake;
