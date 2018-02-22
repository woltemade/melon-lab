import resolvePromiseObject from '../generic/resolvePromiseObject';
import getBalance from '../../assets/calls/getBalance';
import toReadable from '../../assets/utils/toReadable';
import getAccountAddress from '../environment/getAccountAddress';
import hasRecentPrice from '../../pricefeeds/calls/hasRecentPrice';
import getQuoteAssetSymbol from '../../pricefeeds/calls/getQuoteAssetSymbol';

const onBlock = async environment => {
  const isDataValid = await hasRecentPrice(environment);
  const accountAddress = getAccountAddress(environment);
  const quoteAssetSymbol = getQuoteAssetSymbol(environment);

  const info = await resolvePromiseObject({
    syncing: environment.api.eth
      .syncing()
      .then(syncing => (syncing ? !!syncing.result : syncing)),
    isDataValid,
  });

  const accountInfo = accountAddress
    ? await resolvePromiseObject({
        nativeBalance: environment.api.eth
          .getBalance(accountAddress)
          .then(balance => toReadable(balance)),
        quoteBalance: getBalance(environment, {
          tokenSymbol: quoteAssetSymbol,
          ofAddress: accountAddress,
        }),
      })
    : {};

  return {
    ...info,
    ...accountInfo,
  };
};

export default onBlock;
