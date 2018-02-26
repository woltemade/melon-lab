// @flow
import ensure from '../../utils/generic/ensure';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import getFundInformations from '../../fund/calls/getFundInformations';
import getVersionContract from '../contracts/getVersionContract';
import sendTransaction from '../../utils/parity/sendTransaction';

import type { Address } from '../../assets/schemas/Address';
import type { Environment } from '../../utils/environment/Environment';

/**
 * Basic fund information
 */
type Fund = {
  id: number,
  address: Address,
  name: string,
  inception: number,
};

/**
 * Setup a new fund with `name`
 */
const setupFund = async (
  environment: Environment,
  { name, signature },
): Promise<Fund> => {
  const config = await getConfig(environment);
  const {
    quoteAssetSymbol,
    complianceAddress,
    riskManagementAddress,
    priceFeedAddress,
    exchangeAddress,
    exchangeAdapterAddress,
  } = config;

  const referenceAsset = getAddress(config, quoteAssetSymbol);

  const managementReward = 0;
  const performanceReward = 0;

  const versionContract = await getVersionContract(environment, config);

  const isVersionShutDown = await versionContract.instance.isShutDown.call();
  ensure(!isVersionShutDown, 'Version is shut down.');

  const termsAndConditionsAreSigned = await versionContract.instance.termsAndConditionsAreSigned.call(
    { from: environment.account.address },
    [signature.v, signature.r, signature.s],
  );
  ensure(
    termsAndConditionsAreSigned,
    'Invalid signature of terms and conditions on contract level',
  );

  const managerToFunds = await versionContract.instance.managerToFunds.call(
    {},
    [environment.account.address],
  );

  ensure(
    managerToFunds === '0x0000000000000000000000000000000000000000',
    'Already have a fund',
  );

  const params = [
    name,
    referenceAsset,
    managementReward,
    performanceReward,
    complianceAddress,
    riskManagementAddress,
    priceFeedAddress,
    [exchangeAddress],
    [exchangeAdapterAddress],
    signature.v,
    signature.r,
    signature.s,
  ];

  const receipt = await sendTransaction(
    versionContract,
    'setupFund',
    params,
    environment,
  );
  const fundAddedMessage = findEventInLog(
    'FundUpdated',
    receipt,
    'Error during fund creation',
  );
  const logArgs = fundAddedMessage.params;
  const fundAddress = logArgs.ofFund.value;

  const fundInformations = await getFundInformations(environment, {
    fundAddress,
  });

  return {
    address: fundAddress,
    name: fundInformations.name,
    inception: fundInformations.inception,
    modules: fundInformations.modules,
    owner: fundInformations.owner,
  };
};

export default setupFund;
