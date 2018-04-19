const types = `
  type Query {
    price(symbol: Symbol!): String!
  }

  scalar Symbol

  type HowMuchOfAsset {
    symbol: Symbol!
    howMuch: String!
  }

  type Order {
    id: String!
    owner: String!
    isActive: Boolean!
    type: String!
    buy: HowMuchOfAsset!
    sell: HowMuchOfAsset!
    price: String!
    exchangeContractAddress: String!
    exchange: String!
  }

  type Subscription {
    price(symbol: Symbol!): String!
    aggregatedOrderbook(baseTokenAddress: String!, quoteTokenAddress: String!): [Order]
  }
`;

export default types;
