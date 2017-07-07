import R from 'ramda';

import { Vault } from './connectors';

const resolvers = {
  Query: {
    async getVaults(root, { ids }) {
      const lastId = await Vault.getLastId();
      const queryIds = ids || R.range(1, lastId.toNumber());

      if (queryIds.length > 5) throw new Error('Query limited to 5 items at the moment');

      const result = await Promise.all(
        queryIds.map(async id => ({
          id,
          ...(await Vault.getById(id)),
        }))
      );

      return result;
    },
  },
};

export default resolvers;
