import { createWorker, handleSubscriptions } from 'apollo-link-webworker';
import { PubSub } from 'graphql-subscriptions';
import { makeContext } from '@melonproject/graphql-schema';
import schema from './schema';

const pubsub = new PubSub();
const context = makeContext(pubsub);

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
