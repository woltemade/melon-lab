import R from 'ramda';

import { Vault } from './connectors';

const resolvers = {
  Query: {
    async getVaults(root, { ids }) {
      // const vault = await Vault.getById(id);
      const result = await Promise.all(ids.map(async id => await Vault.getById(id)));
      return result;

      // { id: 1, ...R.pick(['address', 'owner', 'name', 'symbol'], vault) };
    },
  },
  /* Author: {
    posts(author) {
      return [
        { id: 1, title: 'A post', text: 'Some text', views: 2 },
        { id: 2, title: 'Another post', text: 'Some other text', views: 200 },
      ];
    },
  },
  Post: {
    author(post) {
      return { id: 1, firstName: 'Hello', lastName: 'World' };
    },
  },
  */
};

export default resolvers;
