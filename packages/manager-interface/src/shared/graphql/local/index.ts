import { InMemoryCache } from 'apollo-cache-inmemory';
import { createWebWorkerLink } from 'apollo-link-webworker';
import withApollo from 'next-with-apollo';
import WebWorker from './worker';

const link = createWebWorkerLink({ worker: new WebWorker() });

export default withApollo({
  link: {
    http: () => link,
    ws: () => link,
  },
  client: options => ({
    link: options.link,
    cache: new InMemoryCache(),
  }),
});
