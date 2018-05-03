import { createWorker, handleSubscriptions } from 'apollo-link-webworker';
import context from './context';
import pubsub from './pubsub';
import schema from './schema';

createWorker({
  schema,
  context,
});

self.onmessage = message =>
  handleSubscriptions({
    self,
    message,
    schema,
    context,
    pubsub,
  });
