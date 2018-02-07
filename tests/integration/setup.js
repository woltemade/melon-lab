require('dotenv').config();

/* eslint-disable import/first */
// import Web3 from "web3";
import Api from '@parity/api';
import setup from '../../lib/utils/setup';
/* eslint-enable */

const provider = new Api.Provider.Http('http://localhost:8545');
const api = new Api(provider);

try {
  setup.init({
    provider,
    tracer: ({ timestamp, message, category, data }) => {
      const args = [timestamp.toISOString(), `[${category}]`, message];
      if (category === 'ensureFailed') {
        args.push(JSON.stringify(data, null, 4));
      }
      console.log(...args);
    },
  });
} catch (e) {
  console.error(
    'Cannot setup melon.js. Are you running a local ethereum node at http://localhost:8545 ?',
  );
}
