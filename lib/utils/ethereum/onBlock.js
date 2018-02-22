import resolvePromiseObject from '../generic/resolvePromiseObject';
import getBalance from '../../assets/calls/getBalance';
import toReadable from '../../assets/utils/toReadable';
import getAddress from '../../assets/utils/getAddress';
import getAccountAddress from '../environment/getAccountAddress';
import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';

const onBlock = async environment => {
  const melonAddress = getAddress('MLN-T-M');
  const dataFeedContract = await getPriceFeedContract(environment);
  const isDataValid = await dataFeedContract.instance.hasRecentPrice.call({}, [
    melonAddress,
  ]);
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
