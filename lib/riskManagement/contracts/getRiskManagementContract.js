// @flow
import Api from '@parity/api';

import RiskMgmtinterface from '@melonproject/protocol/out/riskmgmt/RMMakeOrders.abi.json';
import setup from '../../utils/setup';

/**
 * Get deployed risk management contract instance
 */
const getRiskManagementContract = async fundContract => {
  const api = new Api(setup.provider);
  const [
    ,
    ,
    ,
    ,
    RiskMgmtContractAddress,
  ] = await fundContract.instance.module.call();

  return api.newContract(RiskMgmtinterface, RiskMgmtContractAddress);
};

export default getRiskManagementContract;
