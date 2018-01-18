// @flow
import type { Address } from '../assets/schemas/Address';

/**
 * Setup object
 */
export type Setup = {
  provider: any,
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
 * @param setup.provider connected provider instance
 * @param setup.defaultAccount the default from address
 * @param tracer helper function to trace internals of melon.js
 */
const setup: Setup = {
  init({ provider, defaultAccount, tracer = () => {} }: Setup) {
    this.provider = provider;
    this.networkId = provider.networkId;
    this.defaultAccount = defaultAccount;
    this.tracer = tracer || console.log;
  },
};

export default setup;
