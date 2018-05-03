import { makeContext, makeSchema } from '@melonproject/graphql-schema';
import * as fs from 'fs';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLServer } from 'graphql-yoga';

async function start(port: number) {
  const pubsub = new PubSub();
  const server = new GraphQLServer({
    schema: makeSchema(),
    context: () => makeContext(pubsub),
  });

  await server.start({
    port,
    https: JSON.parse(process.env.USE_HTTPS as string)
      ? {
          cert: fs.readFileSync(process.env.SSL_CERT as string),
          key: fs.readFileSync(process.env.SSL_KEY as string),
        }
      : undefined,
  });

  // tslint:disable-next-line:no-console
  console.log(`Server is running on http://localhost:${port}`);
}

start(parseInt(process.env.PORT as string, 10));
