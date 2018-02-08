import Api from '@parity/api';
import setup from '../../utils/setup';
import resolvePromiseObject from '../generic/resolvePromiseObject';
import getBalance from '../../assets/calls/getBalance';
import toReadable from '../../assets/utils/toReadable';
import getAddress from '../../assets/utils/getAddress';

import getPriceFeedContract from '../../pricefeeds/contracts/getPriceFeedContract';

const onBlock = async environment => {
  const api = new Api(setup.provider);

  const melonAddress = getAddress('MLN-T');
  const dataFeedContract = await getPriceFeedContract(environment);
  const isDataValid = await dataFeedContract.instance.hasRecentPrice.call({}, [
    melonAddress,
  ]);

  const info = await resolvePromiseObject({
    syncing: api.eth.syncing().then(syncing => !!syncing),
    isDataValid,
  });

  const accountInfo = setup.defaultAccount
    ? await resolvePromiseObject({
        ethBalance: api.eth
          .getBalance(setup.defaultAccount)
          .then(balance => toReadable(balance)),
        mlnBalance: getBalance('MLN-T', setup.defaultAccount),
      })
    : {};

  return {
    ...info,
    ...accountInfo,
  };
};

export default onBlock;
