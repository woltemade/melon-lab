const resolvers = {
  Query: {
    vault(root, args) {
      console.log(root, args);
      return { id: 1, address: '0xADDR', owner: 'OxOWNER', name: 'GraphQL Capital', symbol: 'GQC' };
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
