// @flow
import Utils from 'ethers-utils';
import addressBook from '@melonproject/protocol/addressBook.json';
import ensure from '../../utils/generic/ensure';
import sendTransaction from '../../utils/parity/sendTransaction';
import getVersionContract from '../contracts/getVersionContract';
import getFundInformations from '../../fund/calls/getFundInformations';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import type { Address } from '../../assets/schemas/Address';

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
const setupFund = async (environment, { name, signature }): Promise<Fund> => {
  const referenceAsset = '0xDC5fC5DaB642f688Bc5BB58bEF6E0d452D7ae123'; // TODO: get address from datafeed contract
  const compliance = addressBook.kovan.OnlyManager;
  const riskManagement = addressBook.kovan.RMMakeOrders;
  const pricefeed = addressBook.kovan.PriceFeed;
  const simpleMarket = addressBook.kovan.MatchingMarket;
  const simpleAdapter = addressBook.kovan.SimpleAdapter;
  const managementReward = 0;
  const performanceReward = 0;

  const versionContract = await getVersionContract(environment);

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

  const nameHash = Utils.solidityKeccak256(['string'], [name]);

  const nameToOwner = await versionContract.instance.fundNamesToOwners.call(
    {},
    [nameHash],
  );

  ensure(
    nameToOwner === '0x0000000000000000000000000000000000000000' ||
      nameToOwner.toLowerCase() === environment.account.address.toLowerCase(),
    'Name owned by another user.',
  );
  const managerToFunds = await versionContract.instance.managerToFunds.call(
    {},
    [environment.account.address],
  );

  // Only for integration purposes
  {
    /* if (managerToFunds !== '0x0000000000000000000000000000000000000000') {
    console.log('Existing fund need to be shut down: ', managerToFunds);
    await shutDownFund(wallet, managerToFunds);
    console.log('Shutting down existing fund');
    managerToFunds = await versionContract.instance.managerToFunds.call({}, [
      wallet.address,
    ]);
  } */
  }
  ensure(
    managerToFunds === '0x0000000000000000000000000000000000000000',
    'Already have a fund',
  );

  const params = [
    name,
    referenceAsset,
    managementReward,
    performanceReward,
    compliance,
    riskManagement,
    pricefeed,
    [simpleMarket],
    [simpleAdapter],
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
