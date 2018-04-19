// @flow
import getMethodNameSignature from '../../exchange/utils/getMethodNameSignature';
import ensure from '../../utils/generic/ensure';
import getAddress from '../../assets/utils/getAddress';
import getBalance from '../../assets/calls/getBalance';
import getConfig from '../../version/calls/getConfig';
import getFundContract from '../contracts/getFundContract';
import getCanonicalPriceFeedContract from '../../pricefeeds/contracts/getCanonicalPriceFeedContract';
import getMatchingMarketContract from '../../exchange/contracts/getMatchingMarketContract';
import isMakePermitted from '../../riskManagement/calls/isMakePermitted';
import toProcessable from '../../assets/utils/toProcessable';

import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const preflightMakeOrder = async (
  environment: Environment,
  {
    fundContract,
    exchangeAddress,
    sellWhichToken,
    buyWhichToken,
    sellHowMuch,
    buyHowMuch,
  },
): Promise<Order> => {
  const config = await getConfig(environment);

  const sellTokenBalance = await getBalance(environment, {
    tokenSymbol: sellWhichToken,
    ofAddress: fundContract.address,
  });
  ensure(
    sellTokenBalance.gte(sellHowMuch),
    `Insufficient balance of ${sellWhichToken}`,
  );

  const owner = await fundContract.instance.owner.call();
  ensure(
    owner.toLowerCase() === environment.account.address.toLowerCase(),
    'Not owner of fund',
  );

  const isShutDown = await fundContract.instance.isShutDown.call();
  ensure(isShutDown === false, 'Fund is shut down');

  const method = await getMethodNameSignature(environment, 'makeOrder');
  const canonicalPriceFeedContract = await getCanonicalPriceFeedContract(
    environment,
  );
  const isExchangeMethodAllowed = await canonicalPriceFeedContract.instance.exchangeMethodIsAllowed.call(
    {},
    [exchangeAddress, method],
  );
  ensure(isExchangeMethodAllowed, 'This exchange method is not allowed');

  const ExistsPriceOnAssetPair = await canonicalPriceFeedContract.instance.existsPriceOnAssetPair.call(
    {},
    [getAddress(config, sellWhichToken), getAddress(config, buyWhichToken)],
  );
  ensure(
    ExistsPriceOnAssetPair,
    'Price not provided on this asset pair by your datafeed.',
  );

  const [
    isRecent,
    referencePrice,
  ] = await canonicalPriceFeedContract.instance.getReferencePrice.call({}, [
    getAddress(config, sellWhichToken),
    getAddress(config, buyWhichToken),
  ]);

  const isAllowed = await isMakePermitted(environment, {
    referencePrice,
    sellWhichToken,
    buyWhichToken,
    sellHowMuch,
    buyHowMuch,
    fundContract,
  });

  ensure(isAllowed, "Risk Management module doesn't allow this trade");

  ensure(isRecent, 'Pricefeed data is outdated :( Please try again.');

  if (exchangeAddress === config.matchingMarketAddress) {
    // pre conditions if OasisDex
    const exchangeContract = await getMatchingMarketContract(environment);

    // eslint-disable-next-line no-underscore-dangle
    const dust = await exchangeContract.instance._dust.call({}, [
      getAddress(config, sellWhichToken),
    ]);
    /* eslint-enable */
    ensure(
      toProcessable(config, sellHowMuch, sellWhichToken).gte(dust),
      'Selling quantity too low.',
    );
  } else if (exchangeAddress === config.zeroExV1Address) {
    // pre conditions if ZeroExV1
    // TODO: implement when ZeroExv2 is live
  }

  return true;
};

export default preflightMakeOrder;
