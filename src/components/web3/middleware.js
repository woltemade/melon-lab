import pify from "pify";
import { mergeAll } from "ramda";

import { setup } from "@melonproject/melon.js";
import { creators, types, connectionModes } from "./duck";

let filter;

const resolvePromiseObject = async obj => {
  const promises = Object.keys(obj).map(
    key =>
      obj[key] instanceof Promise
        ? obj[key].then(resolved => ({ [key]: resolved }))
        : new Promise(resolve => resolve({ [key]: obj[key] })),
  );

  const resolved = await Promise.all(promises);
  return mergeAll(resolved);
};

const onBlock = async (store, web3) => {
  const state = store.getState().web3;

  const info = await resolvePromiseObject({
    blockNumber: pify(web3.eth.getBlockNumber)(),
    syncing: pify(web3.eth.getSyncing)(),
    account: web3.eth.accounts[0],
  });

  store.dispatch(creators.update(info));
};

const middlewares = {
  [types.SET_CONNECTION](store, state, params, web3) {
    if (state.connectionMode !== params.connectionMode) {
      if (params.connectionMode === connectionModes.NOT_CONNECTED) {
        if (filter) filter.stopWatching();
      } else if (web3) {
        filter = web3.eth.filter("latest", () => {
          onBlock(store, web3);
        });
      } else {
        console.warn("No web3 found!");
      }
    }
  },
};

const web3Middleware = store => next => action => {
  const { type, ...params } = action;
  const state = store.getState().web3;

  if (middlewares[type])
    middlewares[type](store, state, params, setup.web3 || global.web3);

  return next(action);
};

export default web3Middleware;
