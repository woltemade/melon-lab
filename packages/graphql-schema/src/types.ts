const types = `
  type Query {
    price(symbol: Symbol!): String!
  }

  scalar Symbol

  type Subscription {
    price(symbol: Symbol!): String!
  }
`;

export default types;
