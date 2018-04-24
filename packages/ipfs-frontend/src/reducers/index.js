import { reducer as form } from 'redux-form';

import account from './account';
import app from './app';
import ethereum from './ethereum';
import fund from './fund';
import holdings from './holdings';
import modal from './modal';
import orderbook from './orderbook';
import ranking from './ranking';
import recentTrades from './recentTrades';
import tradeHistory from './tradeHistory';
import openOrders from './openOrders';
import olympiadPlaceholder from './olympiadPlaceholder';

const reducerMap = {
  account,
  app,
  ethereum,
  form,
  fund,
  holdings,
  modal,
  orderbook,
  ranking,
  recentTrades,
  tradeHistory,
  openOrders,
  olympiadPlaceholder,
};

export default reducerMap;
