import { SubscriptionServer } from 'subscriptions-transport-electron';
import { makeContext, makeSchema } from '@melonproject/graphql-schema';
import { PubSub } from 'graphql-subscriptions';
import { ipcMain } from 'electron';

export default () =>
  new SubscriptionServer(
    {
      channel: 'graphql',
      messager: ipcMain,
    },
    {
      schema: makeSchema(),
      context: makeContext(new PubSub()),
    },
  );
