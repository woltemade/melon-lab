import React from 'react';
import ReactDOM from 'react-dom';
import {
  getParityProvider,
  getConfig,
  getPriceFeedContract,
  getAddress,
} from '@melonproject/melon.js';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

console.log(window.ethereumProvider);

(async () => {})();
