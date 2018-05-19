import {
  getFundInformations,
  getHoldingsAndPrices,
  getParityProvider,
  getPrice,
  getRanking,
  performCalculations,
} from '@melonproject/melon.js';

import * as graphqlFields from 'graphql-fields';
import { Context } from '../index';

const fundInfomationFields = [
  'fundAddress',
  'name',
  'owner',
  'decimals',
  'inception',
  'modules',
];

const calculationFields = [
  'holdings',
  'gav',
  'managementReward',
  'performanceReward',
  'unclaimedRewards',
  'rewardsShareQuantity',
  'nav',
  'sharePrice',
  'totalSupply',
];

const containsField = (fields, query) =>
  fields.find(field => query.includes(field));

const price = async (parent, args, context: Context) => {
  const environment = await getParityProvider();
  return getPrice(environment, args.symbol);
};

const funds = async (parent, args, context: Context, info) => {
  const environment = await getParityProvider();

  const ranking = await getRanking(environment);
  const fields = Object.keys(graphqlFields(info));

  const addresses = args.addresses || ranking.map(fund => fund.address);

  const promises = addresses.map(async fundAddress => {
    const rankingInfo =
      ranking.find(rank => rank.address === fundAddress) || {};

    const calculations = containsField(fields, calculationFields)
      ? await performCalculations(environment, {
          fundAddress,
        })
      : {};

    const informations = containsField(fields, fundInfomationFields)
      ? await getFundInformations(environment, {
          fundAddress,
        })
      : {};

    const holdings = fields.includes('holdings')
      ? await getHoldingsAndPrices(environment, {
          fundAddress,
        }).then(h =>
          h.map(holding => ({
            symbol: holding.name,
            price: holding.price,
            balance: holding.balance,
            fraction: holding.balance.eq(0)
              ? 0
              : calculations.nav.div(holding.balance.times(holding.price)),
          })),
        )
      : [];

    return {
      address: fundAddress,
      ...rankingInfo,
      ...calculations,
      ...informations,
      holdings,
    };
  });

  const result = await Promise.all(promises);

  return result;
};

export default {
  price,
  funds,
};
