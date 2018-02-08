// @flow
import Api from '@parity/api';

import FundAbi from '@melonproject/protocol/out/version/Fund.abi.json';
import setup from '../../utils/setup';

import type { Address } from '../../assets/schemas/Address';

/**
 * Get the contract instance of fund at `fundAddress`
 */
const getFundContract = (environment, fundAddress: Address) =>
  environment.api.newContract(FundAbi, fundAddress);
export default getFundContract;
