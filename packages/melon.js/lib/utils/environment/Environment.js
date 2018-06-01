// @flow
import typeof Api from '@parity/api';
import typeof providers from '../constants/providers';

export type Environment = {
  // A function which returns a promise that resolves to true if the user
  // confirms the transaction or false if not. (Shouldnt reject)
  confirmer: Function,
  api: Api,
  providerType: $Values<providers>,
  account: any,
};
