// @flow
import type { Environment } from '../../utils/environment/Environment';
import getFundContract from '../contracts/getFundContract';
import ensure from '../../utils/generic/ensure';
/**
 * Gets the index of an exchange on a specific fund
 * @throws If this exchange address is unknown to the fund
 */
const getExchangeIndex = async (
  environment: Environment,
  exchangeAddress: String,
  fundAddress: String,
) => {
  const fundContract = await getFundContract(environment, fundAddress);
  const fundExchanges = await fundContract.instance.exchanges.call();

  const index = fundExchanges.findIndex(e => e.exchange === exchangeAddress);
  ensure(
    index !== -1,
    `Fund with address ${fundAddress} does not authorize exchange with address ${exchangeAddress}`,
  );

  return index;
};

export default getExchangeIndex;
