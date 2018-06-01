import { reducer as form } from 'redux-form';

import app from './app';
import ethereum from './ethereum';
import fund from './fund';
import holdings from './holdings';
import modal from './modal';
import openOrders from './openOrders';
import orderbook from './orderbook';
import ranking from './ranking';
import recentTrades from './recentTrades';
import tradeHistory from './tradeHistory';
import wallet from './wallet';

const reducerMap = {
  app,
  ethereum,
  form,
  fund,
  holdings,
  modal,
  openOrders,
  orderbook,
  ranking,
  recentTrades,
  tradeHistory,
  wallet,
};

export default reducerMap;
