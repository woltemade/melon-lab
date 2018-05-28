import dynamic from 'next/dynamic';
import withApollo from '~/shared/withApollo';

import legacy from '../legacy';

// console.log(legacy);

const App = dynamic(import('../legacy/index'), {
  ssr: false,
});

export default withApollo(App);
