import { createWorker, handleSubscriptions } from 'apollo-link-webworker';
import schema from './schema';
import context from './context';
import pubsub from './pubsub';

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
