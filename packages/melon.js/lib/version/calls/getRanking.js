import * as R from 'ramda';
import getConfig from '../../version/calls/getConfig';
import getFundContract from '../../fund/contracts/getFundContract';
import getRankingContract from '../contracts/getRankingContract';
import toReadable from '../../assets/utils/toReadable';
import toDate from '../../utils/generic/toDate';
import { getVersionContract } from '@melonproject/melon.js';
import Utils from 'ethers-utils';

/**
 * Returns an array of all existing funds on current Version, sorted by share price in descending order, with informations such as address, name, share price, and inception date.
 */
const getRanking = async environment => {
  const config = await getConfig(environment);
  const rankingContract = await getRankingContract(environment);
  const { versionAddress } = config;
  const [
    fundAddresses,
    fundSharePrices,
    fundInceptions,
    fundNames,
  ] = await rankingContract.instance.getFundDetails.call({}, [versionAddress]);

  const fundAddressesFinal = fundAddresses.map(fund => fund._value);
  const fundInceptionsFinal = fundInceptions.map(fund => toDate(fund._value));
  const fundSharePricesFinal = fundSharePrices.map(fund =>
    toReadable(config, fund._value, config.quoteAssetSymbol),
  );

  const fundNamesFinal = fundNames.map(fund =>
    Utils.toUtf8String(Utils.stripZeros(fund._value.reverse()).reverse()),
  );

  const unsortedFunds = fundNamesFinal.map((name, index) => ({
    name,
    address: fundAddressesFinal[index],
    inception: fundInceptionsFinal[index],
    sharePrice: fundSharePricesFinal[index],
  }));

  return R.addIndex(R.map)((val, idx) => ({ ...val, rank: idx + 1 }))(
    unsortedFunds.sort((a, b) => (a.sharePrice > b.sharePrice ? -1 : 1)),
  );
};

export default getRanking;
