import R from 'ramda';

import { Vault } from './connectors';

const resolvers = {
  Query: {
    async getVaults(root, { ids }) {
      const lastId = await Vault.getLastId();
      const queryIds = ids || Array(lastId.toNumber()).fill().map((item, index) => index + 1);
      const result = await Promise.all(
        queryIds.map(async id => ({
          id,
          ...R.pick(['address', 'owner', 'name', 'symbol'], await Vault.getById(id)),
        }))
      );

      return result;
    },
  },
};

export default resolvers;
