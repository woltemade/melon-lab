import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

// TODO: add address (may with own scalar type)
const typeDefs = `
type Vault {
  id: Int,
  address: String,
  owner: String,
  name: String,
  symbol: String,
}

type Order {
  id: Int,
  buySymbol: String,
  buyHowMuch: String,
  sellSymbol: String,
  sellHowMuch: String,
}

type Query {
  getVaults(ids: [Int]): [Vault]
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
