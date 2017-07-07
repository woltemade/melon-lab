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
  vault(id: Int): Vault
  getFortuneCookie: String # we'll use this later
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;

const typeDefs2 = `
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}
type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}
type Query {
  author(firstName: String, lastName: String): Author
  getFortuneCookie: String
}
`;
