import { GraphQLScalarType, Kind } from 'graphql';

export default new GraphQLScalarType({
  name: 'Quanity',
  parseValue: value => value,
  serialize: value => value.toString(),
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING) {
      return ast.value.toString();
    }

    return null;
  },
});
