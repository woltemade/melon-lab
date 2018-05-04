import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { createWebWorkerLink } from 'apollo-link-webworker';
import withApollo from 'next-with-apollo';
import schema from './schema';
import WebWorker from './worker';

export default withApollo({
  link: {
    http: () => new SchemaLink({ schema }),
    ws: () => createWebWorkerLink({ worker: new WebWorker() }),
  },
  client: options => ({
    link: options.link,
    cache: new InMemoryCache(),
  }),
});
