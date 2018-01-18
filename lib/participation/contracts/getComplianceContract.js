// @flow
import Api from '@parity/api';

import ComplianceInterfaceAbi from '@melonproject/protocol/out/compliance/ComplianceInterface.abi.json';
import setup from '../../utils/setup';

/**
 * Get deployed participation contract instance
 */
const getComplianceContract = async fundContract => {
  const api = new Api(setup.provider);

  const [
    ,
    ,
    participationContractAddress,
  ] = await fundContract.instance.getModules.call();

  return api.newContract(ComplianceInterfaceAbi, participationContractAddress);
};

export default getComplianceContract;
