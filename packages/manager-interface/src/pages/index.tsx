import dynamic from 'next/dynamic';
import withApollo from '~/shared/graphql';

const App = dynamic(import('../legacy/index'), {
  ssr: false,
});

export default withApollo(App);
