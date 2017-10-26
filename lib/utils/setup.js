// @flow
import type { Address } from "../assets/schemas/Address";

/**
 * Setup object
 */
export type Setup = {
  web3: any,
  currentProvider: any,
  networkId: number,
  defaultAccount: Address,
  daemonAddress: Address,
  tracer: Function,
  init: Function,
};

/**
 * Globally setup melon.js
 * @param setup
 * @param setup.web3 connected web3 instance
 * @param setup.daemonAddress the address of the liquidity provider
 * @param setup.defaultAccount the default from address
 * @param tracer helper function to trace internals of melon.js
 */
const setup: Setup = {
  init({ web3, daemonAddress, defaultAccount, tracer = () => {} }: Setup) {
    this.web3 = web3;
    this.currentProvider = web3.currentProvider;
    this.networkId = web3.version.network;
    this.defaultAccount =
      defaultAccount || web3.eth.defaultAccount || web3.eth.accounts[0];
    this.daemonAddress = daemonAddress;
    this.tracer = tracer || console.log;
  },
};

export default setup;
