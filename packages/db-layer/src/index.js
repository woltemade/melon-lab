import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
  getParityProvider,
  getConfig,
  getPriceFeedContract,
  getAddress,
} from '@melonproject/melon.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

(async () => {
  const environment = await getParityProvider();
  const api = environment.api;
  const config = await getConfig(environment);
  const mlnAddress = getAddress(config, 'ETH-T-M');
  const pricefeedInceptions = 6047346;

  console.log(config, mlnAddress);
  window.api = environment.api;
  const pricefeed = (window.pricefeed = await getPriceFeedContract(
    environment,
  ));
  pricefeed.instance.PriceUpdated.subscribe({}, async (err, res) => {
    const price = await pricefeed.instance.getPrice.call({}, [mlnAddress]);
    console.log(err, res, price);
  });

  const beforeGetAllLogs = new Date();
  // pricefeed.instance.PriceUpdated.getAllLogs();
  const logs = await api.eth.getLogs({
    address: pricefeed.address,
    topics: [pricefeed.instance.PriceUpdated.signature],
    fromBlock: 6520000, // 6047346, // 6522000
  });

  // console.log(new Date() - beforeGetAllLogs, logs);

  const pricesP = logs.map(async ({ blockNumber }) => {
    /* const [, price] = await pricefeed.instance.getPrice.call({ blockNumber }, [
      mlnAddress,
    ]);
    */
    const data = `0x${
      pricefeed.instance.getPrice.signature
    }000000000000000000000000${mlnAddress.slice(2)}`;

    const a = await api.eth.call(
      {
        to: pricefeed.address,
        data,
      },
      blockNumber,
    );

    const valid = a.slice(2, 2 + 64);
    const price = a.slice(2 + 64, 2 + 64 + 64);
    return parseInt(price, 16);
  });

  /*
  0000000000000000000000000000000000000000000000000000000000000045
  000000000000000000000000288A9fB92921472D29ab0b3C3e420a8E4Bd4f452
  */

  const prices = await Promise.all(pricesP);
  console.log(new Date() - beforeGetAllLogs, prices);
})();
