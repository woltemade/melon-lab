import R from 'ramda';
import BigNumber from 'bignumber.js';
import {
  getParityProvider,
  getConfig,
  getAddress,
  getPriceFeedContract,
} from '@melonproject/melon.js';

import { Vault } from './connectors';

const resolvers = {
  Query: {
    async getVaults(root, { ids }) {
      const lastId = await Vault.getLastId();
      const queryIds = ids || R.range(1, lastId.toNumber());

      if (queryIds.length > 5)
        throw new Error('Query limited to 5 items at the moment');

      const result = await Promise.all(
        queryIds.map(async id => ({
          id,
          ...(await Vault.getById(id)),
        })),
      );

      return result;
    },
    async getAssets() {
      const environment = await getParityProvider();
      const config = await getConfig(environment);
      return config.assets;
    },
    async getBlockNumber() {
      const environment = await getParityProvider();
      return environment.api.eth.blockNumber();
    },
    async getPrice(root, { symbol, address, blockNumber }) {
      const environment = await getParityProvider();
      const config = await getConfig(environment);
      const pricefeed = await getPriceFeedContract(environment);
      blockNumber = blockNumber || (await environment.api.eth.blockNumber());

      if (blockNumber < 0) {
        blockNumber = (await environment.api.eth.blockNumber()) - blockNumber;
      }

      address = address || getAddress(config, symbol);

      const data = `0x${
        pricefeed.instance.getPrice.signature
      }000000000000000000000000${address.slice(2)}`;

      const a = await environment.api.eth.call(
        {
          to: pricefeed.address,
          data,
        },
        blockNumber,
      );

      const valid = a.slice(2, 2 + 64);
      const price = a.slice(2 + 64, 2 + 64 + 64);
      return BigNumber(price, 16).toString();
    },
  },
};

export default resolvers;
