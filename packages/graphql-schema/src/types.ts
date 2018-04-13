const types = `
  type Query {
    price(symbol: Symbol!): String!
  }

  scalar Symbol

  type Order {
    id: String!
    owner: String!
    isActive: Boolean!
    type: String!
  }

  type Subscription {
    price(symbol: Symbol!): String!
    aggregatedOrderbook(baseTokenAddress: String!, quoteTokenAddress: String!): [Order]
  }
`;

export default types;
