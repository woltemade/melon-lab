import IPFS from 'ipfs';
import OrbitDB from 'orbit-db';

import React from 'react';
import ReactDOM from 'react-dom';
// import {
//   getParityProvider,
//   getConfig,
//   getPriceFeedContract,
//   getAddress,
// } from '@melonproject/melon.js';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true,
  },
};

// const mlnAddress = '0xa27af8713623fcc239d49108b1a7b187c133e88b';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

const ipfs = new IPFS(ipfsOptions);
ipfs.on('error', console.error);
ipfs.on('ready', async () => {
  const orbitDB = new OrbitDB(ipfs);
  console.log('Getting db ...', orbitDB);
  const db = await orbitDB.open(
    // '/orbitdb/QmRRrFf1H3Su4HPEWhmeN5HEKwVpeh4JdhKwp99JNAc3jz/melon:PriceFeed:0xa27af8713623fcc239d49108b1a7b187c133e88b',
    '/orbitdb/QmXhCEYKY3xT24J3JGBz92HFPKMvNeCnLbygQ9pGT5XhWv/test',
    { sync: true },
  );
  console.log(db.address.toString());
  db.events.on('replicated', () => {
    const res = db
      .iterator({ limit: -2 })
      .collect()
      .map(e => e.payload.value);
    console.log('REPLICATED \n', res.join('\n'));
  });
});
