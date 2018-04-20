import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { createWebWorkerLink } from 'apollo-link-webworker';
import { getOperationAST } from 'graphql';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import schema from './schema';
import Worker from './worker';

// Checks if the given graphql operation is a subscription.
const isSubscription = operation => {
  const operationAST = getOperationAST(
    operation.query,
    operation.operationName,
  );
  return !!operationAST && operationAST.operation === 'subscription';
};

// Apollo link for subscriptions.
const webWorkerLink = createWebWorkerLink({
  worker: new Worker(),
});

// Apollo link for normal queries/mutations.
const schemaLink = new SchemaLink({ schema });

// Merged link that uses the correct underlying link based
// on the given graphql operation type.
const link = ApolloLink.split(isSubscription, webWorkerLink, schemaLink);

// Static cache bin for graphql query results.
const cache = new InMemoryCache();

// Apollo client that runs queries locally, within the browser,
// against our own graphql schema.
const client = new ApolloClient({
  link,
  cache,
});

export default client;
