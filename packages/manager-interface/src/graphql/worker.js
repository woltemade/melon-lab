import { createWorker, handleSubscriptions } from 'apollo-link-webworker';
import { context, pubsub } from '@melonproject/graphql-schema';
import schema from './schema';

createWorker({
  schema,
  context
});

self.onmessage = message => handleSubscriptions({
  self,
  message,
  schema,
  context,
  pubsub,
});
