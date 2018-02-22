import resolvePromiseObject from '../generic/resolvePromiseObject';
import getBalance from '../../assets/calls/getBalance';
import toReadable from '../../assets/utils/toReadable';
import getAccountAddress from '../environment/getAccountAddress';
import hasRecentPrice from '../../pricefeeds/calls/hasRecentPrice';

const onBlock = async environment => {
  const isDataValid = await hasRecentPrice(environment);
  const accountAddress = getAccountAddress(environment);

  const info = await resolvePromiseObject({
    syncing: environment.api.eth
      .syncing()
      .then(syncing => (syncing ? !!syncing.result : syncing)),
    isDataValid,
  });

  const accountInfo = accountAddress
    ? await resolvePromiseObject({
        ethBalance: environment.api.eth
          .getBalance(accountAddress)
          .then(balance => toReadable(balance)),
        mlnBalance: getBalance(environment, {
          tokenSymbol: 'MLN-T',
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
